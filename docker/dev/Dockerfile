FROM php:8.2-fpm

WORKDIR /var/www/html

RUN apt-get update && apt-get install -y --no-install-recommends \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip \
    pkg-config \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install pdo pdo_mysql zip pcntl \
    && pecl install -o -f redis \
    && docker-php-ext-enable redis

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY ./php/custom.ini /usr/local/etc/php/conf.d/custom.ini

RUN groupadd --gid 1000 appuser \
    && useradd --uid 1000 --gid appuser --groups www-data,root \
    --shell /bin/bash --create-home appuser

USER appuser