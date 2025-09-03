# ---- PHP-FPM base
FROM php:8.3-fpm-alpine

# System & PHP Extensions
RUN apk add --no-cache \
      git curl zip unzip libpng libpng-dev icu-dev oniguruma-dev libzip-dev \
      bash shadow tzdata \
  && docker-php-ext-install pdo_mysql mbstring intl zip bcmath \
  && apk del libpng-dev

# Opcache (optional, dev freundlich mit revalidate_freq=0)
RUN docker-php-ext-enable opcache || true

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Workdir
WORKDIR /var/www/html

COPY ./src /var/www/html

# www-data UID/GID angleichen (optional für Mac/Host)
RUN usermod -u 1000 www-data || true && groupmod -g 1000 www-data || true

RUN composer install

# Permissions (Laravel storage/bootstrap)
RUN mkdir -p storage bootstrap/cache \
  && chown -R www-data:www-data storage bootstrap/cache


# RUN mkdir -p /var/www/html/node_modules

RUN apk add --no-cache nodejs npm \
    && npm install -g npm@9.3.1


USER www-data