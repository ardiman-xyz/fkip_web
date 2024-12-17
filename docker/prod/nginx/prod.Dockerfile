FROM nginx:alpine

# Terima build assets sebagai argument
ARG BUILD_ASSETS

# Buat struktur direktori yang diperlukan
RUN mkdir -p /var/www/html/public/build

# Copy nginx configs
COPY docker/prod/nginx/nginx.conf /etc/nginx/nginx.conf
COPY docker/prod/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

# Copy assets yang sudah di-build
COPY ${BUILD_ASSETS} /var/www/html/public/build

# Set permissions
RUN chown -R nginx:nginx /var/www/html

# Create logs directory
RUN mkdir -p /var/log/nginx && \
    chown -R nginx:nginx /var/log/nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]