FROM composer:2.6 as composer-build
WORKDIR /var/www/html

# Install PHP extensions
RUN apk add --no-cache $PHPIZE_DEPS linux-headers \
    && docker-php-ext-install pcntl sockets

COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist


# Stage 2: NPM build
FROM node:22-alpine as npm-build

WORKDIR /var/www/html

ARG NODE_ENV=production
ARG APP_ENV=production


COPY package*.json ./
COPY postcss.config.js ./
COPY tailwind.config.js ./
COPY tsconfig.json ./
COPY vite.config.js ./
COPY resources/ ./resources/
COPY .env.staging ./.env

RUN npm ci && npm run build

# Stage 3: PHP Final
FROM php:8.2-fpm-alpine as php
WORKDIR /var/www/html

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install dependencies dan extensions sekaligus
RUN apk add --no-cache \
       $PHPIZE_DEPS \
       supervisor \
       libzip-dev \
       oniguruma-dev \
       libexif \        
       libexif-dev \    
   && docker-php-ext-install \
       pdo \
       pdo_mysql \
       zip \
       bcmath \
       opcache \
       pcntl \
       exif \          
   && pecl install redis \
   && docker-php-ext-enable redis \
   && apk del $PHPIZE_DEPS


COPY docker/prod/php/www.conf /usr/local/etc/php-fpm.d/www.conf
COPY docker/prod/php/custom.ini /usr/local/etc/php/conf.d/custom.ini

RUN mkdir -p /var/log/supervisor /var/run/supervisor
COPY docker/prod/supervisor/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
RUN chmod -R 777 /var/log/supervisor /var/run/supervisor

# Copy application
COPY . .
COPY --from=composer-build /var/www/html/vendor/ ./vendor/
COPY --from=npm-build /var/www/html/public/build /var/www/html/public/build

# Create directories and set permissions
RUN mkdir -p storage/framework && \
   mkdir -p storage/framework/sessions && \
   mkdir -p storage/framework/views && \
   mkdir -p storage/framework/cache && \
   mkdir -p storage/logs && \
   mkdir -p storage/app && \
   mkdir -p storage/app/public && \
   mkdir -p bootstrap/cache && \
   chown -R www-data:www-data . && \
   chmod -R 775 storage bootstrap/cache && \
   composer dump-autoload -o

# Tidak menggunakan USER www-data
EXPOSE 9000 8080
CMD ["/usr/bin/supervisord", "-n", "-c", "/etc/supervisor/conf.d/supervisord.conf"]

# Stage 4: Nginx
FROM nginx:alpine as nginx

RUN mkdir -p /var/www/html

COPY docker/prod/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

COPY public /var/www/html/public
COPY --from=npm-build /var/www/html/public/build /var/www/html/public/build

RUN chown -R nginx:nginx /var/www/html \
    && chmod -R 755 /var/www/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]