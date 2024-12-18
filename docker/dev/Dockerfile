FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip \
    supervisor

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip
RUN docker-php-ext-install opcache && docker-php-ext-enable opcache
RUN pecl install redis && docker-php-ext-enable redis

# Setup supervisor
RUN mkdir -p /var/log/supervisor /var/run/supervisor
COPY supervisor/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
RUN chmod -R 777 /var/log/supervisor /var/run/supervisor

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy application
COPY ./ /var/www/html

# Create necessary directories and set permissions
RUN mkdir -p /var/www/html/storage/app/public \
    /var/www/html/storage/framework/{sessions,views,cache} \
    /var/www/html/storage/logs \
    /var/www/html/bootstrap/cache && \
    chown -R www-data:www-data /var/www/html && \
    chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 9000 9090

CMD ["/usr/bin/supervisord", "-n", "-c", "/etc/supervisor/conf.d/supervisord.conf"]