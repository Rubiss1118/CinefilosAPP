# 🚀 Checklist para Deployment de API Laravel

## 1. Configuración de Entorno (.env)
```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://tu-dominio.com

DB_CONNECTION=mysql
DB_HOST=tu-host-db
DB_PORT=3306
DB_DATABASE=tu_base_datos
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_password

CORS_ALLOWED_ORIGINS=https://tu-frontend.com,http://localhost:4200
```

## 2. Configurar CORS para producción
En `config/cors.php`:
```php
'allowed_origins' => [
    'https://tu-frontend.com',
    'http://localhost:4200', // Para desarrollo
],
```

## 3. Optimizar para producción
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
composer install --optimize-autoloader --no-dev
```

## 4. Archivos importantes a incluir
- .htaccess en public/
- composer.json y composer.lock
- Todas las migraciones
- Configuración de base de datos

## 5. Variables de entorno necesarias
- APP_KEY (generar con: php artisan key:generate)
- DB_* (configuración de base de datos)
- APP_URL (URL donde estará tu API)
- CORS_ALLOWED_ORIGINS

## 6. Comandos post-deployment
```bash
php artisan migrate --force
php artisan db:seed (si tienes seeders)
```
