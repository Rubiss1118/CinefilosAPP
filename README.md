
INSTITUTO TECNOLÓGICO DE OAXACA

Departamento de Ingeniería en Sistemas Computacionales

Materia:PROGRAMACION WEB

“API DE RESEÑAS DE PELICULAS ”
# 🎬 CinefilosAPP

Profesor: Martinez Nieto Adelina Equipo: 
MORALES OSORIO RUBI ESMERALDA ROL: FRONTEND
JIMENEZ CASTILLEJOS FABIAN DE JESUS ROL: BACKEND

Grupo: VSI Oaxaca de juarez a 28 de julio de 2025

Tipo de sistema: Sistema Web.

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

## 🏗️ Arquitectura Técnica

### 🎨 Frontend Angular - Componentes Principales

#### 📁 Estructura de Componentes
```
src/app/
├── components/
│   ├── admin/
│   │   ├── admin-dashboard/          # Dashboard principal admin
│   │   ├── admin-peliculas/          # Gestión de películas
│   │   ├── admin-usuarios/           # Gestión de usuarios
│   │   └── admin-resenas/            # Moderación de reseñas
│   ├── auth/
│   │   ├── login/                    # Componente de login
│   │   ├── register/                 # Componente de registro
│   │   └── profile/                  # Perfil de usuario
│   ├── peliculas/
│   │   ├── lista-peliculas/          # Catálogo público
│   │   ├── detalle-pelicula/         # Vista detallada
│   │   └── formulario-pelicula/      # Formulario de edición
│   └── resenas/
│       ├── lista-resenas/            # Lista de reseñas
│       ├── formulario-resena/        # Crear/editar reseña
│       └── resena-card/              # Tarjeta de reseña
├── services/
│   ├── auth.service.ts               # Autenticación
│   ├── pelicula.service.ts           # API de películas
│   ├── resena.service.ts             # API de reseñas
│   └── admin.service.ts              # API de administración
└── models/
    ├── user.model.ts                 # Modelo de usuario
    ├── pelicula.model.ts             # Modelo de película
    └── resena.model.ts               # Modelo de reseña
```

#### 🔧 Componentes Administrativos Detallados

**Admin Dashboard Component:**
- Widgets de estadísticas en tiempo real
- Gráficos de actividad con Chart.js
- Accesos rápidos a secciones principales
- Notificaciones y alertas del sistema
<img width="1919" height="1005" alt="image" src="https://github.com/user-attachments/assets/4a01a2e2-a563-4bf2-82ba-2a35be6274fc" />


**Admin Películas Component:**
- Tabla responsiva con paginación
- <img width="1919" height="871" alt="image" src="https://github.com/user-attachments/assets/2f8815ee-ce3d-4389-9b89-8e17d1dc7f80" />

- <img width="1919" height="1023" alt="image" src="https://github.com/user-attachments/assets/0ad60b14-a6d5-4439-bc2f-50f7c4cfe2a9" />

- Se implemento la gestion de peliculas para el administrador 
  <img width="1919" height="876" alt="image" src="https://github.com/user-attachments/assets/aa5f15cd-f1e4-4bc4-8768-c1ae98b37349" />
-Se puede editar o borrar las peliculas y se puede crear una nueva
<img width="1919" height="1005" alt="image" src="https://github.com/user-attachments/assets/3868abfd-115a-45e2-9f17-087cffc22ac2" />

<img width="1917" height="858" alt="image" src="https://github.com/user-attachments/assets/ab2dcd57-b145-45a4-bb9c-13d98f5a83c8" />

- Modal de confirmación para eliminaciones de peliculas en gestion de peliculas.
- <img width="1919" height="999" alt="image" src="https://github.com/user-attachments/assets/2789796e-86d5-4a07-9dca-b31598ed5f09" />
- Filtrado de peliculas por nombre,director y genero
- <img width="1511" height="854" alt="image" src="https://github.com/user-attachments/assets/0f51e245-117e-42dc-920f-de1cb18b94d4" />

**Admin Usuarios Component:**
<img width="1919" height="887" alt="image" src="https://github.com/user-attachments/assets/28598a3d-df76-4da5-a053-4442892db21f" />
- Sistema de roles con dropdowns
- <img width="1525" height="580" alt="image" src="https://github.com/user-attachments/assets/cfe5c181-35f1-413f-b357-02ab9ef9fe3c" />
-Editar y borrar un usuario
<img width="1919" height="998" alt="image" src="https://github.com/user-attachments/assets/dddf63e1-d19e-4370-b593-3947e3524c11" />
<img width="1919" height="1012" alt="image" src="https://github.com/user-attachments/assets/f8094446-950b-4afd-aaa9-52b7b507f286" />
-Filtrado de usuarios y paginacion
<img width="1559" height="595" alt="image" src="https://github.com/user-attachments/assets/082a31cb-400c-4a70-90be-9a06c094eafa" />

**Admin Reseñas Component:**
- Dasboard de reseñas
- <img width="1919" height="899" alt="image" src="https://github.com/user-attachments/assets/652ca259-5ad2-4d41-9a38-298ecc0c393a" />
-Filtrado por calificacion
<img width="538" height="398" alt="image" src="https://github.com/user-attachments/assets/f4a3ee87-9940-4031-abda-c31901dd2a70" />

- Preview de contenido censurado
- <img width="1509" height="776" alt="image" src="https://github.com/user-attachments/assets/fad5f7a1-0e25-4242-93d8-2535f755046e" />

- Filtrado de pelicula y usuario
- <img width="1919" height="1012" alt="image" src="https://github.com/user-attachments/assets/01b04c65-19eb-4e5f-b803-d29a220bb439" />
.<img width="1919" height="908" alt="image" src="https://github.com/user-attachments/assets/8657c94e-3085-40f6-9661-4046c2fc51a2" />


### ⚙️ Backend Laravel - Arquitectura API

#### 📁 Estructura del Backend
```
app/
├── Http/
│   ├── Controllers/
│   │   ├── AuthController.php        # Autenticación
│   │   ├── PeliculaController.php    # CRUD películas
│   │   ├── ResenaController.php      # CRUD reseñas
│   │   └── AdminController.php       # Funciones admin
│   ├── Middleware/
│   │   ├── AdminMiddleware.php       # Verificación admin
│   │   └── CorsMiddleware.php        # Configuración CORS
│   └── Requests/
│       ├── StorePeliculaRequest.php  # Validación películas
│       └── StoreResenaRequest.php    # Validación reseñas
├── Models/
│   ├── User.php                      # Modelo usuario
│   ├── Pelicula.php                  # Modelo película
│   └── Resena.php                    # Modelo reseña
├── Services/
│   ├── EmailService.php              # Servicio de emails
│   ├── ImageService.php              # Gestión de imágenes
│   └── CensuraService.php            # Sistema de censura
└── database/
    ├── migrations/                   # Migraciones BD
    └── seeders/                      # Datos de prueba
```


## 🛠️ Tecnologías Utilizadas

### Frontend
- **Angular 18+**
- TypeScript
- HTML5/CSS3
- Bootstrap/CSS Grid

## 🔍 Características Detalladas por Componente

### 🎬 Componente Gestión de Películas (Admin)

#### Funcionalidades Principales:
- **Lista dinámica** con paginación de 10 elementos por página
- **Búsqueda en tiempo real** por título, director o género
- **Filtros avanzados** por año, calificación y estado
- **Ordenamiento** por fecha, popularidad o calificación
- **Acciones en lote** para múltiples películas

#### Características Técnicas:
- **Formularios reactivos** con validación en tiempo real
- **Subida de imágenes** con preview inmediato
- **Validación de tipos** de archivo (JPG, PNG, WebP)
- **Compresión automática** de imágenes
- **Estados de loading** durante operaciones

#### Validaciones Implementadas:
- ✅ **Título**: Mínimo 2 caracteres, máximo 100
- ✅ **Sinopsis**: Máximo 1000 caracteres
- ✅ **Director**: Mínimo 2 caracteres, máximo 50
- ✅ **Año**: Entre 1900 y año actual + 2
- ✅ **Género**: Selección de lista predefinida
- ✅ **Imagen**: Máximo 2MB, formatos específicos


### 👥 Componente Gestión de Usuarios (Admin)

#### Panel de Usuarios:
- **Tabla responsiva** con información completa del usuario
- **Sistema de roles** (Usuario, Moderador, Administrador)
- **Estados de cuenta** (Activo, Suspendido, Baneado)
- **Filtros por rol** y estado de cuenta
- **Búsqueda** por nombre, email o ID

#### Funcionalidades de Moderación:
- **Cambio de roles** con confirmación
- **Suspensión temporal** con duración configurable
- **Ban permanente** con motivo obligatorio
- **Historial de sanciones** por usuario
- **Estadísticas de actividad** (reseñas, login, etc.)

#### Información Mostrada:
- 📊 **ID de usuario** y fecha de registro
- 👤 **Nombre completo** y email verificado
- 🎭 **Rol actual** con badge visual
- ⭐ **Total de reseñas** escritas
- 📅 **Último acceso** al sistema
- 🛡️ **Estado de cuenta** con indicadores visuales

### 📝 Componente Moderación de Reseñas (Admin)

#### Sistema de Moderación:
- **Cola de revisión** con reseñas pendientes
- **Vista previa** del contenido original y censurado
- **Sistema de flags** automáticos por palabras prohibidas
- **Moderación manual** con opciones de aprobación/rechazo
- **Historial completo** de acciones de moderación

#### Características del Sistema de Censura:
- **Detección automática** de palabras inapropiadas
- **Lista personalizable** de términos prohibidos
- **Reemplazo inteligente** con asteriscos
- **Niveles de severidad** (Leve, Moderado, Severo)
- **Notificaciones** al usuario sobre contenido modificado

#### Métricas y Estadísticas:
- 📈 **Total de reseñas** moderadas por período
- 🚫 **Porcentaje de censura** automática vs manual
- 👤 **Usuarios más reportados** y estadísticas
- ⏱️ **Tiempo promedio** de moderación
- 📊 **Distribución por tipo** de contenido problemático


### 🏠 Dashboard Administrativo

#### Widgets de Estadísticas:
- **Usuarios totales** con crecimiento mensual
- **Películas en catálogo** con añadidas recientemente
- **Reseñas pendientes** de moderación
- **Actividad del día** con gráfico en tiempo real
- **Top películas** más reseñadas del mes

#### Gráficos y Visualizaciones:
- **Gráfico de líneas**: Actividad de usuarios por mes
- **Gráfico de barras**: Reseñas por categoría de película
- **Gráfico circular**: Distribución de roles de usuarios
- **Mapa de calor**: Actividad por hora del día
- **Tabla de ranking**: Películas mejor calificadas

#### Accesos Rápidos:
- 🚀 **Crear nueva película** - Acceso directo al formulario
- 👥 **Ver usuarios recientes** - Últimos registros
- 📝 **Moderar reseñas** - Cola de pendientes
- 📊 **Generar reporte** - Estadísticas exportables
- ⚙️ **Configuración** - Ajustes del sistema

## 👤 Experiencia del Usuario Final

### 🎬 Catálogo de Películas (Usuario)

#### Navegación y Búsqueda:
- **Grid responsivo** con cards atractivas de películas
- **Búsqueda inteligente** con sugerencias automáticas
- **Filtros múltiples** por género, año, calificación
- **Ordenamiento** por popularidad, fecha, calificación
- **Paginación infinita** para mejor UX

#### Información por Película:
- 🎭 **Portada en alta calidad** con lazy loading
- ⭐ **Calificación promedio** calculada automáticamente
- 📝 **Sinopsis completa** con expand/collapse
- 🎬 **Información técnica** (director, año, género)
- 💬 **Contador de reseñas** con link directo

*[Espacio reservado para imagen del catálogo público de películas]*

### ⭐ Sistema de Reseñas (Usuario)

#### Crear Reseña:
- **Calificación por estrellas** interactiva (1-5)
- **Editor de texto** enriquecido para comentarios
- **Vista previa** antes de publicar
- **Validación en tiempo real** de contenido
- **Guardado automático** de borradores

#### Visualización de Reseñas:
- **Layout tipo tarjetas** con información del autor
- **Sistema de likes** y valoración de reseñas
- **Ordenamiento** por fecha, calificación o popularidad
- **Respuestas anidadas** entre usuarios
- **Reportar contenido** inapropiado

*[Espacio reservado para imagen del sistema de reseñas de usuarios]*

### Backend
- **Laravel 11**
- PHP 8.2+
- MySQL
- Sanctum (Autenticación)

### Librerías y Dependencias Principales

#### Frontend (Angular)
- **@angular/forms**: Formularios reactivos
- **@angular/router**: Navegación SPA
- **@angular/common/http**: Cliente HTTP
- **bootstrap**: Framework CSS responsivo
- **chart.js**: Gráficos y visualizaciones
- **ng-bootstrap**: Componentes Bootstrap para Angular

#### Backend (Laravel)
- **laravel/sanctum**: Autenticación API
- **intervention/image**: Manipulación de imágenes
- **guzzlehttp/guzzle**: Cliente HTTP
- **faker**: Generación de datos de prueba
- **phpunit**: Testing unitario

*[Espacio reservado para imagen del stack tecnológico completo]*

## 🧪 Testing y Calidad

### 🔍 Testing Frontend
- **Unit Tests**: Jasmine + Karma para componentes
- **Integration Tests**: Pruebas de servicios y API
- **E2E Tests**: Cypress para flujos completos
- **Coverage**: Mínimo 80% de cobertura de código

### �️ Testing Backend
- **PHPUnit**: Tests unitarios y de feature
- **Database Testing**: Pruebas con base de datos en memoria
- **API Testing**: Validación completa de endpoints
- **Security Testing**: Pruebas de vulnerabilidades

### 📊 Métricas de Calidad
- **Code Coverage**: > 80%
- **Performance**: Lighthouse Score > 90
- **Accessibility**: WCAG 2.1 AA compliance
- **SEO**: Meta tags y estructura optimizada

*[Espacio reservado para imagen de reportes de testing]*

## 🚀 Despliegue y DevOps

### 🌐 Opciones de Hosting

#### Backend (API Laravel)
- **Heroku**: Deploy con Git, escalable
- **Railway**: CI/CD automático, Docker
- **DigitalOcean**: App Platform, alta disponibilidad
- **AWS**: EC2 + RDS para producción enterprise

#### Frontend (Angular)
- **Vercel**: Deploy automático, CDN global
- **Netlify**: CI/CD integrado, forms handling
- **Firebase Hosting**: Google Cloud, SSL gratuito
- **GitHub Pages**: Para demos y documentación

### 🔄 CI/CD Pipeline
- **GitHub Actions**: Automatización de tests y deploy
- **Docker**: Containerización para consistencia
- **Environment Variables**: Configuración segura
- **Database Migrations**: Deploy automático de esquemas

*[Espacio reservado para imagen del pipeline de deployment]*

## 📈 Métricas y Monitoreo

### 📊 Analytics Implementados
- **Google Analytics**: Tracking de usuarios y comportamiento
- **Performance Monitoring**: Core Web Vitals
- **Error Tracking**: Logs centralizados de errores
- **Usage Metrics**: Estadísticas de uso de features

### 🔍 Logs y Debugging
- **Laravel Telescope**: Debugging de queries y requests
- **Browser DevTools**: Debugging frontend en desarrollo
- **Error Reporting**: Notificaciones automáticas de errores
- **Performance Profiling**: Análisis de rendimiento

*[Espacio reservado para imagen del dashboard de métricas]*

## 📦 Estructura Completa del Proyecto

```
CinefilosAPP/
├── 📁 frontend-angular/              # Aplicación Angular
│   ├── 📁 src/
│   │   ├── 📁 app/
│   │   │   ├── 📁 components/
│   │   │   │   ├── 📁 admin/         # Componentes administrativos
│   │   │   │   │   ├── admin-dashboard/
│   │   │   │   │   ├── admin-peliculas/
│   │   │   │   │   ├── admin-usuarios/
│   │   │   │   │   └── admin-resenas/
│   │   │   │   ├── 📁 auth/          # Autenticación
│   │   │   │   │   ├── login/
│   │   │   │   │   ├── register/
│   │   │   │   │   └── profile/
│   │   │   │   ├── 📁 peliculas/     # Gestión de películas
│   │   │   │   │   ├── lista-peliculas/
│   │   │   │   │   ├── detalle-pelicula/
│   │   │   │   │   └── formulario-pelicula/
│   │   │   │   └── 📁 resenas/       # Sistema de reseñas
│   │   │   │       ├── lista-resenas/
│   │   │   │       ├── formulario-resena/
│   │   │   │       └── resena-card/
│   │   │   ├── 📁 services/          # Servicios Angular
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── pelicula.service.ts
│   │   │   │   ├── resena.service.ts
│   │   │   │   └── admin.service.ts
│   │   │   ├── 📁 models/           # Interfaces TypeScript
│   │   │   │   ├── user.model.ts
│   │   │   │   ├── pelicula.model.ts
│   │   │   │   └── resena.model.ts
│   │   │   ├── 📁 guards/           # Route Guards
│   │   │   │   ├── auth.guard.ts
│   │   │   │   └── admin.guard.ts
│   │   │   └── 📁 interceptors/     # HTTP Interceptors
│   │   │       ├── auth.interceptor.ts
│   │   │       └── error.interceptor.ts
│   │   ├── 📁 assets/               # Recursos estáticos
│   │   │   ├── 📁 images/
│   │   │   ├── 📁 icons/
│   │   │   └── 📁 data/
│   │   └── 📁 styles/               # Estilos globales
│   │       ├── globals.css
│   │       ├── variables.css
│   │       └── components.css
│   ├── 📄 angular.json              # Configuración Angular
│   ├── 📄 package.json              # Dependencias npm
│   └── 📄 tsconfig.json             # Configuración TypeScript
│
├── 📁 backend-laravel/              # API Laravel
│   ├── 📁 app/
│   │   ├── 📁 Http/
│   │   │   ├── 📁 Controllers/      # Controladores
│   │   │   │   ├── AuthController.php
│   │   │   │   ├── PeliculaController.php
│   │   │   │   ├── ResenaController.php
│   │   │   │   └── AdminController.php
│   │   │   ├── 📁 Middleware/       # Middleware personalizado
│   │   │   │   ├── AdminMiddleware.php
│   │   │   │   └── CorsMiddleware.php
│   │   │   └── 📁 Requests/         # Form Requests
│   │   │       ├── StorePeliculaRequest.php
│   │   │       └── StoreResenaRequest.php
│   │   ├── 📁 Models/               # Modelos Eloquent
│   │   │   ├── User.php
│   │   │   ├── Pelicula.php
│   │   │   └── Resena.php
│   │   └── 📁 Services/             # Servicios de negocio
│   │       ├── EmailService.php
│   │       ├── ImageService.php
│   │       └── CensuraService.php
│   ├── 📁 database/
│   │   ├── 📁 migrations/           # Migraciones de BD
│   │   │   ├── create_users_table.php
│   │   │   ├── create_peliculas_table.php
│   │   │   └── create_resenas_table.php
│   │   ├── 📁 seeders/              # Datos de prueba
│   │   │   ├── UserSeeder.php
│   │   │   ├── PeliculaSeeder.php
│   │   │   └── ResenaSeeder.php
│   │   └── 📁 factories/            # Model Factories
│   ├── 📁 routes/                   # Rutas de la aplicación
│   │   ├── api.php                  # Rutas API
│   │   ├── web.php                  # Rutas web
│   │   └── console.php              # Comandos console
│   ├── 📁 config/                   # Configuraciones
│   │   ├── database.php
│   │   ├── cors.php
│   │   ├── sanctum.php
│   │   └── app.php
│   ├── 📁 storage/                  # Archivos y logs
│   │   ├── 📁 app/public/          # Archivos públicos
│   │   └── 📁 logs/                 # Logs del sistema
│   ├── 📁 tests/                    # Tests automatizados
│   │   ├── 📁 Feature/              # Tests de integración
│   │   └── 📁 Unit/                 # Tests unitarios
│   ├── 📄 composer.json             # Dependencias PHP
│   ├── 📄 .env.example              # Variables de entorno
│   └── 📄 artisan                   # CLI de Laravel
│
├── 📁 docs/                         # Documentación
│   ├── 📄 API.md                    # Documentación API
│   ├── 📄 DEPLOYMENT.md             # Guía de despliegue
│   └── 📁 images/                   # Imágenes de documentación
│
├── 📁 .github/                      # GitHub Actions
│   └── 📁 workflows/
│       ├── frontend-ci.yml          # CI Frontend
│       └── backend-ci.yml           # CI Backend
│
├── 📄 README.md                     # Este archivo
├── 📄 .gitignore                    # Archivos ignorados
├── 📄 LICENSE                       # Licencia del proyecto
└── 📄 docker-compose.yml           # Configuración Docker
```

*[Espacio reservado para imagen de la estructura del proyecto en VS Code]*

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

### 🎬 Gestión de Películas
El sistema de películas permite a los usuarios explorar un catálogo completo con:

- **Catálogo dinámico** con información detallada de cada película
- **Búsqueda avanzada** por título, género, director y año
- **Sistema de calificaciones** con promedio automático
- **Subida de imágenes** de portada con validación
- **Filtros múltiples** para encontrar contenido específico



### ⭐ Sistema de Reseñas
Los usuarios pueden interactuar y compartir opiniones mediante:

- **Reseñas completas** con calificación de 1-5 estrellas
- **Comentarios detallados** con validación de contenido
- **Moderación automática** de palabras inapropiadas
- **Historial de reseñas** por usuario
- **Censura inteligente** que protege el contenido

*[Espacio reservado para imagen del sistema de reseñas]*

## 👑 Panel de Administración

El panel de administración es el corazón del sistema, diseñado para gestionar todos los aspectos de la plataforma.

### 🏠 Dashboard Principal
El dashboard ofrece una vista general completa con:

- **Estadísticas en tiempo real** del sistema
- **Gráficos de actividad** de usuarios y contenido
- **Métricas de películas** más populares
- **Resumen de reseñas** pendientes de moderación
- **Alertas del sistema** y notificaciones importantes

*[Espacio reservado para imagen del dashboard de administración]*

### 🎭 Gestión de Películas (Admin)
Los administradores tienen control total sobre el catálogo:

#### Componentes principales:
- **Lista de películas** con paginación y filtros avanzados
- **Editor de películas** con formulario completo
- **Subida de imágenes** con preview en tiempo real
- **Validación de datos** en frontend y backend
- **Eliminación segura** con confirmación

#### Funcionalidades detalladas:
- ✅ **Crear películas**: Formulario completo con título, sinopsis, director, género, año
- ✅ **Editar información**: Modificación de todos los campos de la película
- ✅ **Gestión de imágenes**: Subida, preview y eliminación de portadas
- ✅ **Control de visibilidad**: Activar/desactivar películas del catálogo público
- ✅ **Búsqueda administrativa**: Filtros por estado, género, año y popularidad

*[Espacio reservado para imagen de gestión de películas]*

### 👥 Gestión de Usuarios (Admin)
Sistema completo para administrar la comunidad:

#### Componentes principales:
- **Lista de usuarios** con información detallada
- **Editor de perfiles** con roles y permisos
- **Sistema de roles** (Usuario, Moderador, Administrador)
- **Historial de actividad** por usuario
- **Gestión de bans** y suspensiones

#### Funcionalidades detalladas:
- ✅ **Visualizar usuarios**: Lista completa con filtros por rol y estado
- ✅ **Editar perfiles**: Modificar información personal y roles
- ✅ **Gestión de roles**: Asignar permisos específicos
- ✅ **Suspender usuarios**: Sistema de bans temporales y permanentes
- ✅ **Historial de reseñas**: Ver todas las reseñas de un usuario específico

*[Espacio reservado para imagen de gestión de usuarios]*

### 📝 Moderación de Reseñas (Admin)
Herramientas avanzadas para mantener la calidad del contenido:

#### Componentes principales:
- **Cola de moderación** con reseñas pendientes
- **Sistema de censura** automática y manual
- **Reportes de usuarios** sobre contenido inapropiado
- **Historial de moderación** con acciones realizadas
- **Filtros inteligentes** para detectar contenido problemático

#### Funcionalidades detalladas:
- ✅ **Aprobar/rechazar reseñas**: Sistema de moderación manual
- ✅ **Censura automática**: Detección de palabras inapropiadas
- ✅ **Edición de contenido**: Corrección de reseñas problemáticas
- ✅ **Sistema de reportes**: Los usuarios pueden reportar contenido
- ✅ **Estadísticas de moderación**: Métricas de contenido censurado

*[Espacio reservado para imagen de moderación de reseñas]*

## 👤 Experiencia del Usuario

### 🔐 Autenticación y Registro
Sistema seguro y user-friendly:

- **Registro simple** con validación en tiempo real
- <img width="609" height="866" alt="image" src="https://github.com/user-attachments/assets/4ba90af5-6d45-48b8-a52a-49b3f28555ed" />

- **Login seguro** con Laravel Sanctum
- **Recuperación de contraseña** por email
- Olvidaste tu contraseña?
- <img width="1919" height="998" alt="image" src="https://github.com/user-attachments/assets/66d93304-34f0-4538-995f-7760243e724f" />
<img width="1919" height="1021" alt="image" src="https://github.com/user-attachments/assets/42ad487d-64f1-4e62-ae45-0940d75b7d87" />

- 
- **Perfiles personalizables** con información del usuario
- **Gestión de sesiones** con tokens seguros



### 🎯 Interfaz de Usuario
Diseño moderno y responsivo:

- **Navegación intuitiva** con menús organizados
- **Diseño responsivo** que se adapta a todos los dispositivos
- **Búsqueda inteligente** con sugerencias automáticas
- **Filtros avanzados** para encontrar contenido específico
- **Experiencia fluida** sin recargas de página
<img width="1919" height="1012" alt="image" src="https://github.com/user-attachments/assets/087b2f9c-4e50-4611-9fb6-ab69a38b2649" />

### 📊 Dashboard de Usuario
Cada usuario tiene su propio espacio personal:
<img width="1919" height="173" alt="image" src="https://github.com/user-attachments/assets/7d95417e-335a-400a-b463-4d2c7bc2191a" />

- **Mis reseñas** 
- <img width="1919" height="1019" alt="image" src="https://github.com/user-attachments/assets/612cdff4-10f7-4dba-8d1b-6e4d5af4b92c" />
-Filtrado para buscar reseñas
<img width="1918" height="1017" alt="image" src="https://github.com/user-attachments/assets/0fdc07e2-f55b-4dd0-b2fb-9116cdfc20d4" />
-Ver galeria de peliculas para hacer una reseña
<img width="1917" height="1010" alt="image" src="https://github.com/user-attachments/assets/c7616944-edfd-4e8b-b70d-6228d5c9ca45" />
-Ver detalles de la pelicula(reseñas de la comunidad y apartada de añadir tu propia reseña
<img width="1919" height="1009" alt="image" src="https://github.com/user-attachments/assets/adf58ad1-bfd2-45c8-a357-784fe977aff0" />
<img width="1918" height="1003" alt="image" src="https://github.com/user-attachments/assets/578e032b-b51b-4235-9c3b-da01c547dffc" />
-RESEÑA
<img width="1234" height="699" alt="image" src="https://github.com/user-attachments/assets/d1f4d32a-13d7-4aa6-aa66-71df543c6d74" />
-Mensaje y visualizacion de la reseña
<img width="1198" height="640" alt="image" src="https://github.com/user-attachments/assets/6fbd3741-f71c-430d-9536-78a654caa58f" />
<img width="1178" height="276" alt="image" src="https://github.com/user-attachments/assets/7952cb74-3300-4253-80b6-a13a31f9878e" />
-Editar o eliminar las reseña como usuario
<img width="1910" height="867" alt="image" src="https://github.com/user-attachments/assets/9cb37059-2b2e-4c4d-a19b-43a3e0fd4096" />
  Notificacion de eliminacion
  <img width="1919" height="974" alt="image" src="https://github.com/user-attachments/assets/1b158e39-4a3b-41c3-bfca-f65cf79103ff" />
<img width="1407" height="989" alt="image" src="https://github.com/user-attachments/assets/c6a0e7de-e9f2-4e87-8b18-5a708e601c98" />
-Editar reseña
<img width="1919" height="1003" alt="image" src="https://github.com/user-attachments/assets/beda0222-f109-4571-91b4-6a925904f136" />
-Mnesaje de reseña actualizada
 <img width="1915" height="1014" alt="image" src="https://github.com/user-attachments/assets/8b089b7e-d434-4ccb-9b29-308622848f18" />


## 🔐 Seguridad

- Autenticación mediante Laravel Sanctum
- Validación de datos en frontend y backend
- Protección CORS configurada
- Sanitización de inputs
- Sistema de censura automática

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

### Requisitos del Sistema
💻 Hardware Mínimo
RAM: 8 GB (recomendado 16 GB)
Almacenamiento: 5 GB libres
Procesador: Intel i5 / AMD Ryzen 5 o superior
Conexión a Internet: Banda ancha estable
🖥️ Sistema Operativo
Windows: 10/11 (64-bit)
macOS: 10.15 Catalina o superior
Linux: Ubuntu 18.04+ / Debian 10+ / CentOS 8+
📋 Software Requerido
🟢 Node.js y npm

[GitHub](https://github.com/Rubiss1118)


