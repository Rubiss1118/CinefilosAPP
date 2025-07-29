
### ENCABEZADO
INSTITUTO TECNOLÓGICO DE OAXACA

### Departamento de Ingeniería en Sistemas Computacionales

Materia:PROGRAMACION WEB

### “API DE RESEÑAS DE PELICULAS”

Profesor: Martinez Nieto Adelina Equipo:

### MORALES OSORIO RUBI ESMERALDA ROL: FRONTEND
### JIMENEZ CASTILLEJOS FABIAN DE JESUS ROL: BACKEND

Grupo: VSI Oaxaca de juarez a 28 de julio de 2025

# 🎬 CinefilosAPP

**¿Qué hace el sistema?**
Sistema web completo para cinéfilos que permite explorar un catálogo de películas, escribir reseñas detalladas con calificaciones, 
y gestionar contenido cinematográfico a través de un panel administrativo robusto con moderación automática.

## Tipo de sistema: Sistema Web.

## FUNCIONALIDADES 

## PROCESO DE LOGUEO 
El proceso de autenticación en CinefilosAPP funciona mediante un sistema robusto basado en Laravel Sanctum que garantiza la seguridad de los usuarios.
Cuando un usuario intenta iniciar sesión, el sistema primero valida que el email tenga formato correcto y que la contraseña esté presente,
luego busca en la base de datos un usuario que coincida con el email proporcionado. 
Si encuentra el usuario, utiliza la función Hash::check() de Laravel para comparar la contraseña ingresada con el hash almacenado en la base de datos,
un proceso que es seguro porque nunca almacena contraseñas en texto plano.

### Credenciales por defecto:
- **Admin**: admin@cinefilos.com / password123
- **Usuario**: juan@example.com / password123

### 🔐 Autenticación y Registro
Sistema seguro y user-friendly:

- **Registro simple** con validación en tiempo real
- 
- <img width="609" height="866" alt="image" src="https://github.com/user-attachments/assets/4ba90af5-6d45-48b8-a52a-49b3f28555ed" />
  
- **Recuperación de contraseña** por GMAIL
  
- ## Librerías Principales
  
Laravel Mail: Sistema nativo de Laravel (incluido en el framework)
Symfony Mailer: Motor subyacente que usa Laravel (automáticamente incluido)
SwiftMailer: Componente base para el envío de emails

La generación de códigos de verificación se realiza mediante un algoritmo seguro
implementado en PHP que crea códigos aleatorios de 6 dígitos. 
El proceso comienza cuando un usuario solicita recuperar su contraseña y el sistema ejecuta la función random_int(0, 999999).

- Olvidaste tu contraseña?
- <img width="1919" height="998" alt="image" src="https://github.com/user-attachments/assets/66d93304-34f0-4538-995f-7760243e724f" />
<img width="1919" height="1021" alt="image" src="https://github.com/user-attachments/assets/42ad487d-64f1-4e62-ae45-0940d75b7d87" />
<img width="748" height="777" alt="image" src="https://github.com/user-attachments/assets/f82cbf25-eae5-43c7-a7d9-017b0d418e9c" />
<img width="711" height="789" alt="image" src="https://github.com/user-attachments/assets/be7261d2-4328-41bc-8e68-565349b3ad78" />
<img width="702" height="1600" alt="image" src="https://github.com/user-attachments/assets/360f2a67-6e9b-4b2c-8f89-aee54da2eb4f" />

<img width="1919" height="1024" alt="image" src="https://github.com/user-attachments/assets/a2e20644-0db6-4851-b29c-6aaca6ec1102" />
-Verificar que si se cambio la contarseña
<img width="617" height="858" alt="image" src="https://github.com/user-attachments/assets/76d44e69-0657-48b3-b105-7843cec68706" />
<img width="545" height="605" alt="image" src="https://github.com/user-attachments/assets/d508a34b-6a24-4108-bedd-29770e69f0c5" />

## registro de usuario
-Se pueden registrar un usuario nuevo con nombre correo y contraseña
<img width="737" height="876" alt="image" src="https://github.com/user-attachments/assets/7957be0e-ec65-4034-8abf-e81471152cd9" />
-Redirige a la cuenta creada
<img width="1919" height="783" alt="image" src="https://github.com/user-attachments/assets/0f1c898b-d9a0-47d2-a99b-42eac1def50c" />
-Usuario creado en la base de datos 

 ## NIVELES DE USUARIO 
Rol	        Permisos	           Funcionalidades
Admin	   Control Total	   • Gestión completa de películas (CRUD)<br>• Moderación de reseñas<br>• Gestión de usuarios<br>• Panel administrativo<br>• NO puede crear reseñas
Cinefilo  Usuario Final	       • Ver catálogo de películas<br>• Crear/editar/eliminar sus reseñas<br>• Calificar películas<br>• Ver reseñas de otros usuarios


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
## FUNCIONANLIDADES UNICAS DEL PROYECTO 
#### Componentes Administrativos

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

## 🔍 Características Detalladas por Componente

### 🎬 Componente Gestión de Películas (Admin)

#### Componentes principales:
- **Lista de películas** con paginación y filtros avanzados
- **Editor de películas** con formulario completo
- **Subida de imágenes** con preview en tiempo real
- **Validación de datos** en frontend y backend
- **Eliminación segura** con confirmación
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
**Título**: Mínimo 2 caracteres, máximo 100
**Sinopsis**: Máximo 1000 caracteres
**Director**: Mínimo 2 caracteres, máximo 50
**Año**: Entre 1900 y año actual + 2
**Género**: Selección de lista predefinida
**Imagen**: Máximo 2MB, formatos específicos

### 👥 Componente Gestión de Usuarios (Admin)

#### Panel de Usuarios:
- **Tabla responsiva** con información completa del usuario
- **Sistema de roles** (Usuario, Moderador, Administrador)
- **Estados de cuenta** (Activo, Suspendido, Baneado)
- **Filtros por rol** y estado de cuenta
- **Búsqueda** por nombre, email o ID

#### Información Mostrada:
- 📊 **ID de usuario** y fecha de registro
- 👤 **Nombre completo** y email verificado
- 🎭 **Rol actual** con badge visual
- ⭐ **Total de reseñas** escritas
- 📅 **Último acceso** al sistema
- 🛡️ **Estado de cuenta** con indicadores visuales

### 📝 Componente Moderación de Reseñas (Admin)
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

## Experiencia del Usuario Final

### Interfaz de Usuario
Diseño moderno y responsivo:
<img width="1919" height="1021" alt="image" src="https://github.com/user-attachments/assets/ac1307c1-578f-42dd-b1f8-bcd90bb9bbb4" />
- **Navegación intuitiva** con menús organizados
- **Diseño responsivo** que se adapta a todos los dispositivos
- **Búsqueda inteligente** con sugerencias automáticas
- **Filtros avanzados** para encontrar contenido específico
- **Experiencia fluida** sin recargas de página
<img width="1919" height="1012" alt="image" src="https://github.com/user-attachments/assets/087b2f9c-4e50-4611-9fb6-ab69a38b2649" />

### 📊Dashboard de Usuario
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
### Catálogo de Películas (Usuario)

#### Navegación y Búsqueda:
- **Grid responsivo** con cards atractivas de películas
- **Búsqueda inteligente** con sugerencias automáticas
- **Filtros múltiples** por género, año, calificación
- **Ordenamiento** por popularidad, fecha, calificación
- **Paginación infinita** para mejor UX

#### Información por Película:
- **Portada en alta calidad** con lazy loading
-  **Calificación promedio** calculada automáticamente
-  **Sinopsis completa** con expand/collapse
-  **Información técnica** (director, año, género)
-  **Contador de reseñas** con link directo

### ⭐Sistema de Reseñas (Usuario)

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

##  API Endpoints

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

### Requisitos minimos del Sistema
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

Hardware Mínimo
RAM: 8 GB (recomendado 16 GB)
Almacenamiento: 5 GB libres
Procesador: Intel i5 / AMD Ryzen 5 o superior
Conexión a Internet: Banda ancha estable
Sistema Operativo
Windows: 10/11 (64-bit)
macOS: 10.15 Catalina o superior
Linux: Ubuntu 18.04+ / Debian 10+ / CentOS 8+
Software Requerido
Node.js y npm
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

## Acceso a la Aplicación

- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:8000/api
- **Admin Panel**: http://localhost:4200/admin

## OTROS
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
[GitHub](https://github.com/Rubiss1118)


