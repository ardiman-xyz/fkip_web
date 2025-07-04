FROM composer:2.6 as composer-build

ARG WORKDIR=/var/www/html
WORKDIR $WORKDIR

COPY composer.json composer.lock $WORKDIR/

RUN mkdir -p $WORKDIR/database/{factories,seeders} \
    && composer install --no-dev --no-scripts --no-autoloader --prefer-dist --no-progress --ignore-platform-reqs

FROM node:22-alpine as npm-build

WORKDIR /var/www/html

COPY package*.json ./
COPY postcss.config.js ./
COPY tailwind.config.js ./
COPY tsconfig.json ./
COPY vite.config.js ./
COPY resources/ ./resources/

ENV VITE_REVERB_APP_KEY=xryckfivmpyxvl3qfzit \
    REVERB_APP_SECRET=jhfdpgblex6up6cemwp8 \
    VITE_REVERB_HOST=fkip.umkendari.ac.id \
    VITE_REVERB_PORT=443 \
    VITE_REVERB_SCHEME=https

RUN npm ci && npm run build && \
    npm cache clean --force

# Gunakan PHP-FPM standard Alpine instead of FrankenPHP
FROM php:8.2-fpm-alpine as app
WORKDIR /app

# Install dependencies dengan cara yang sudah terbukti work
RUN apk update && apk add --no-cache \
    supervisor \
    libzip-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    libwebp-dev \
    freetype-dev \
    libexif-dev \
    linux-headers \
    && docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install -j$(nproc) \
        gd \
        pdo \
        pdo_mysql \
        zip \
        bcmath \
        pcntl \
        exif \
        opcache \
        sockets \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && rm -rf /var/cache/apk/*

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY docker/prod/php/opcache.ini /usr/local/etc/php/conf.d/opcache.ini
COPY docker/prod/php/php.ini /usr/local/etc/php/conf.d/php.ini

RUN mkdir -p /var/log/supervisor /var/run/supervisor
COPY docker/prod/supervisor/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
RUN chmod -R 777 /var/log/supervisor /var/run/supervisor

# Copy application
COPY --chown=www-data . .
COPY --chown=www-data --from=composer-build /var/www/html/vendor/ ./vendor/
COPY --chown=www-data --from=npm-build /var/www/html/public/build ./public/build/

# Create directories and set permissions
RUN mkdir -p storage/framework/{sessions,views,cache,testing} \
    && mkdir -p storage/logs \
    && mkdir -p storage/app/public \
    && mkdir -p bootstrap/cache \
    && chown -R www-data:www-data /app \
    && chmod -R 775 storage bootstrap/cache

# Run Laravel commands
RUN composer dump-autoload -o \
    && php artisan storage:link || true \
    && rm -rf \
        .git \
        .github \
        .gitignore \
        .gitattributes \
        .env* \
        docker \
        tests \
        phpunit.xml \
        README.md \
        node_modules \
        package*.json \
        vite.config.js \
        tailwind.config.js \
        postcss.config.js \
        tsconfig.json \
        yarn.lock \
        *.log

# Jika ingin tetap support Octane, install via composer
RUN composer require laravel/octane --no-dev || true

EXPOSE 9000 8080
CMD ["/usr/bin/supervisord", "-n", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
