FROM nginx:alpine

ARG PUBLIC_FILES

# Create necessary directories
RUN mkdir -p /var/www/html/public

# Copy nginx configs
COPY docker/prod/nginx/nginx.conf /etc/nginx/nginx.conf
COPY docker/prod/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

# Copy semua isi public folder dari app container
COPY ${PUBLIC_FILES} /var/www/html/public/

# Set permissions
RUN chown -R nginx:nginx /var/www && \
    chmod -R 755 /var/www

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]