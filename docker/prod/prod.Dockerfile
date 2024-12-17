

FROM composer:2.6 as composer-build

ARG WORKDIR=/var/www/html

WORKDIR $WORKDIR


COPY composer.json composer.lock $WORKDIR

RUN mkdir -p $WORKDIR/database/{factories, seeders} \
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
    VITE_REVERB_HOST=web-stag.fkip.umkendari.ac.id \
    VITE_REVERB_PORT=443 \
    VITE_REVERB_SCHEME=https

RUN npm ci && npm run build && \
    npm cache clean --force


FROM php:8.2-fpm-alpine AS php

WORKDIR /var/www/html

RUN apk add --no-cache \
        supervisor \
        libzip-dev \
        libexif-dev \
        linux-headers \
    && apk add --no-cache --virtual .build-deps \
        $PHPIZE_DEPS \
    && docker-php-ext-install -j$(nproc) \
        pdo \
        pdo_mysql \
        zip \
        bcmath \
        pcntl \
        exif \
        opcache \
    && docker-php-ext-configure sockets \
    && docker-php-ext-install sockets \
    && pecl install redis \
    && docker-php-ext-enable \
        redis \
        opcache \
        sockets \
    && apk del .build-deps \
    && rm -rf /tmp/* /var/cache/apk/* \
    && docker-php-source delete


COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY docker/prod/php/opcache.ini /usr/local/etc/php/conf.d/opcache.ini
COPY docker/prod/php/php.ini /usr/local/etc/php/conf.d/php.ini

RUN mkdir -p /var/log/supervisor /var/run/supervisor
COPY docker/prod/supervisor/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
RUN chmod -R 777 /var/log/supervisor /var/run/supervisor

COPY --chown=www-data --from=composer-build /var/www/html/vendor/ /var/www/html/vendor/ 
COPY --chown=www-data --from=npm-build /var/www/html/public/ /var/www/html/public/ 

COPY --chown=www-data . /var/www/html/
RUN composer dump-autoload -o \
    && composer check-platform-reqs \
    && rm -f /usr/bin/composer


EXPOSE 9000 8080
CMD ["/usr/bin/supervisord", "-n", "-c", "/etc/supervisor/conf.d/supervisord.conf"]