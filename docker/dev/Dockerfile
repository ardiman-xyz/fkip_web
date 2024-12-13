FROM dunglas/frankenphp:latest-php8.2-alpine

WORKDIR /app

RUN apk add --no-cache \
    git \
    curl \
    libpng-dev \
    oniguruma-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip \
    supervisor \
    autoconf \
    gcc \
    g++ \
    make

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip opcache
RUN pecl install redis && docker-php-ext-enable redis

# Setup supervisor
RUN mkdir -p /var/log/supervisor /var/run/supervisor
COPY supervisor/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
RUN chmod -R 777 /var/log/supervisor /var/run/supervisor

# Get Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Create necessary directories with proper permissions
RUN mkdir -p /app/storage/framework/{sessions,views,cache} \
    /app/storage/logs \
    /app/bootstrap/cache && \
    chown -R www-data:www-data /app && \
    chmod -R 775 /app && \
    chmod -R 777 /app/storage && \
    chmod -R 777 /app/bootstrap/cache

RUN mkdir -p /var/log/supervisor /var/run/supervisor && \
chmod -R 777 /var/log/supervisor /var/run/supervisor && \
chown -R www-data:www-data /var/log/supervisor /var/run/supervisor


EXPOSE 8000 9091

CMD ["/usr/bin/supervisord", "-n", "-c", "/etc/supervisor/conf.d/supervisord.conf"]