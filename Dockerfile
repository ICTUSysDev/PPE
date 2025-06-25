FROM php:8.1.0-apache
COPY . /var/www/html
WORKDIR /var/www/html

RUN apt-get update
RUN apt-get upgrade -y

RUN apt-get install -y vim libwebp-dev libpng-dev zlib1g-dev libxml2-dev libzip-dev libonig-dev libgd-dev libjpeg-dev jpegoptim optipng pngquant gifsicle zip curl unzip git iputils-ping nano

RUN docker-php-ext-install pdo_mysql
RUN docker-php-ext-install mysqli
RUN docker-php-ext-install zip intl exif pcntl bcmath

COPY .app/vhost.conf /etc/apache2/sites-available/000-default.conf
COPY .app/uploads.ini /usr/local/etc/php/conf.d

RUN chown -R www-data:www-data /var/www/html && a2enmod rewrite
