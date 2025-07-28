# 🎬 CinefilosAPP

Una aplicación web completa para cinéfilos que permite explorar películas, escribir reseñas y gestionar contenido cinematográfico.

## 📋 Descripción del Proyecto

CinefilosAPP es una plataforma web que combina:
- **Frontend Angular**: Interfaz moderna y responsiva
- **Backend Laravel**: API REST robusta y segura
- **Base de datos MySQL**: Gestión eficiente de datos

## 🚀 Características

### Para Usuarios:
- 🎬 Galería de películas con búsqueda avanzada
- ⭐ Sistema de calificaciones y reseñas
- 👤 Perfiles de usuario personalizables
- 📱 Diseño responsivo

### Para Administradores:
- 📊 Panel de administración completo
- 🎭 Gestión de películas (CRUD)
- 👥 Gestión de usuarios
- 📝 Moderación de reseñas
- 🛡️ Sistema de censura automática

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Angular 18+**
- TypeScript
- HTML5/CSS3
- Bootstrap/CSS Grid

### Backend
- **Laravel 11**
- PHP 8.2+
- MySQL
- Sanctum (Autenticación)

## 📦 Estructura del Proyecto

```
CinefilosAPP/
├── frontend-angular/     # Aplicación Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   └── models/
│   │   └── assets/
│   └── package.json
├── backend-laravel/      # API Laravel
│   ├── app/
│   │   ├── Http/Controllers/
│   │   ├── Models/
│   │   └── Services/
│   ├── routes/
│   ├── database/
│   └── composer.json
└── README.md
```

## 🔧 Instalación y Configuración

### Prerrequisitos
- Node.js 18+
- PHP 8.2+
- Composer
- MySQL

### Backend (Laravel)

1. **Instalar dependencias:**
```bash
cd backend-laravel
composer install
```

2. **Configurar entorno:**
```bash
cp .env.example .env
php artisan key:generate
```

3. **Configurar base de datos en `.env`:**
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=cinefilos_app
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_password
```

4. **Ejecutar migraciones:**
```bash
php artisan migrate --seed
```

5. **Iniciar servidor:**
```bash
php artisan serve
```

### Frontend (Angular)

1. **Instalar dependencias:**
```bash
cd frontend-angular
npm install
```

2. **Configurar API URL en `environment.ts`:**
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api'
};
```

3. **Iniciar aplicación:**
```bash
ng serve
```

## 🌐 Acceso a la Aplicación

- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:8000/api
- **Admin Panel**: http://localhost:4200/admin

### Credenciales por defecto:
- **Admin**: admin@cinefilos.com / password
- **Usuario**: usuario@test.com / password

## 📱 Funcionalidades Principales

### Gestión de Películas
- Catálogo completo con información detallada
- Búsqueda por título, género y director
- Sistema de calificaciones promedio
- Subida de imágenes de portada

### Sistema de Reseñas
- Reseñas con calificación de 1-5 estrellas
- Comentarios de usuarios
- Moderación de contenido
- Censura automática de palabras inapropiadas

### Administración
- Dashboard con estadísticas
- CRUD completo de películas y usuarios
- Gestión de reseñas y moderación
- Sistema de roles y permisos

## 🔐 Seguridad

- Autenticación mediante Laravel Sanctum
- Validación de datos en frontend y backend
- Protección CORS configurada
- Sanitización de inputs
- Sistema de censura automática

## 🚀 Despliegue

### Backend (Opciones recomendadas)
- **Railway**: Deploy automático desde GitHub
- **Heroku**: Plataforma tradicional
- **DigitalOcean**: App Platform

### Frontend (Opciones recomendadas)
- **Vercel**: Deploy automático desde GitHub
- **Netlify**: CI/CD integrado
- **Firebase Hosting**: Escalable y rápido

## 📄 API Endpoints

### Autenticación
- `POST /api/register` - Registro de usuario
- `POST /api/login` - Inicio de sesión
- `POST /api/logout` - Cerrar sesión

### Películas
- `GET /api/peliculas` - Listar películas
- `GET /api/peliculas/{id}` - Obtener película
- `POST /api/peliculas` - Crear película (Admin)
- `PUT /api/peliculas/{id}` - Actualizar película (Admin)
- `DELETE /api/peliculas/{id}` - Eliminar película (Admin)

### Reseñas
- `GET /api/peliculas/{id}/resenas` - Reseñas de película
- `POST /api/resenas` - Crear reseña
- `PUT /api/resenas/{id}` - Actualizar reseña
- `DELETE /api/resenas/{id}` - Eliminar reseña

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👨‍💻 Autor

**Rubén** - [GitHub](https://github.com/Rubiss1118)

## 🙏 Agradecimientos

- Comunidad Angular y Laravel
- Iconos de películas y emojis
- Inspiración en plataformas cinematográficas populares

---

⭐ ¡No olvides darle una estrella al proyecto si te ha sido útil!
