
FROM node:22-alpine as npm-build

WORKDIR /var/www/html

COPY package*.json ./
COPY postcss.config.js ./
COPY tailwind.config.js ./
COPY tsconfig.json ./
COPY vite.config.js ./
COPY resources/ ./resources/

ENV VITE_REVERB_APP_KEY=xryckfivmpyxvl3qfzit \
    VITE_REVERB_HOST=localhost \
    VITE_REVERB_PORT=8080 \
    VITE_REVERB_SCHEME=http

RUN npm ci && npm run build && \
    npm cache clean --force


# nginx production
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

COPY docker/prod/nginx/nginx.conf /etc/nginx/nginx.conf
COPY docker/prod/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

# Copy static assets from node build
COPY --from=npm-build /var/www/html/public/build /usr/share/nginx/html/build
COPY public /usr/share/nginx/html

# Create storage for logs
RUN mkdir -p /var/log/nginx && \
   chown -R nginx:nginx /var/log/nginx && \
   chown -R nginx:nginx /usr/share/nginx/html


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]