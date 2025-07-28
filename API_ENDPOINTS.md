# CINEFILOSAPP - Documentación API

## Base URL
```
http://localhost:8000/api
```

## Autenticación
Todas las rutas protegidas requieren el header:
```
Authorization: Bearer {tu_token}
```

## Endpoints

### Autenticación

#### Login
- **POST** `/login`
- **Body:**
```json
{
    "email": "usuario@example.com",
    "password": "tu_contraseña"
}
```
- **Respuesta:**
```json
{
    "token": "xxx.yyy.zzz",
    "user": {
        "id": 1,
        "name": "Nombre",
        "email": "usuario@example.com",
        "rol": "cinefilo"
    }
}
```

#### Registro
- **POST** `/register`
- **Body:**
```json
{
    "name": "Nombre Usuario",
    "email": "nuevo@example.com",
    "password": "contraseña",
    "password_confirmation": "contraseña"
}
```

#### Logout
- **POST** `/logout`
- **Requiere:** Token de autenticación

### Películas

#### Listar todas las películas
- **GET** `/peliculas`
- **Parámetros de Query (opcionales):**
  - `page`: número de página
  - `per_page`: items por página

#### Obtener una película específica
- **GET** `/peliculas/{id}`

#### Crear película (solo admin)
- **POST** `/peliculas`
- **Requiere:** Token de admin
- **Body:**
```json
{
    "titulo": "Nombre de la Película",
    "director": "Nombre Director",
    "genero": "Género",
    "fecha_estreno": "2023-07-25",
    "duracion": 120,
    "sinopsis": "Descripción de la película",
    "url_imagen": "https://ejemplo.com/imagen.jpg"
}
```

#### Actualizar película (solo admin)
- **PUT** `/peliculas/{id}`
- **Requiere:** Token de admin
- **Body:** (igual que crear)

#### Eliminar película (solo admin)
- **DELETE** `/peliculas/{id}`
- **Requiere:** Token de admin

### Reseñas

#### Listar reseñas de una película
- **GET** `/peliculas/{id}/resenas`
- **Parámetros de Query (opcionales):**
  - `page`: número de página
  - `per_page`: items por página

#### Crear reseña
- **POST** `/resenas`
- **Requiere:** Token de autenticación
- **Body:**
```json
{
    "pelicula_id": 1,
    "calificacion": 4,
    "resena": "Texto de la reseña"
}
```

#### Actualizar reseña
- **PUT** `/resenas/{id}`
- **Requiere:** Token de autenticación (debe ser el autor)
- **Body:**
```json
{
    "calificacion": 5,
    "resena": "Texto actualizado de la reseña"
}
```

#### Eliminar reseña
- **DELETE** `/resenas/{id}`
- **Requiere:** Token de autenticación (debe ser el autor o admin)

### Usuarios

#### Ver perfil propio
- **GET** `/profile`
- **Requiere:** Token de autenticación

#### Ver reseñas propias
- **GET** `/mis-resenas`
- **Requiere:** Token de autenticación

#### Actualizar perfil
- **PUT** `/profile`
- **Requiere:** Token de autenticación
- **Body:**
```json
{
    "name": "Nuevo Nombre",
    "email": "nuevo@email.com",
    "password": "nueva_contraseña",
    "password_confirmation": "nueva_contraseña"
}
```

### Ejemplos de Uso con cURL

#### Login
```bash
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"usuario@example.com","password":"contraseña"}'
```

#### Crear Película (como admin)
```bash
curl -X POST http://localhost:8000/api/peliculas \
  -H "Authorization: Bearer {tu_token}" \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Nueva Película",
    "director": "Director",
    "genero": "Acción",
    "fecha_estreno": "2023-07-25",
    "duracion": 120,
    "sinopsis": "Descripción",
    "url_imagen": "https://ejemplo.com/imagen.jpg"
  }'
```

#### Crear Reseña
```bash
curl -X POST http://localhost:8000/api/resenas \
  -H "Authorization: Bearer {tu_token}" \
  -H "Content-Type: application/json" \
  -d '{
    "pelicula_id": 1,
    "calificacion": 4,
    "resena": "¡Excelente película!"
  }'
```

## Códigos de Estado HTTP

- 200: OK - La petición se realizó correctamente
- 201: Created - Recurso creado exitosamente
- 400: Bad Request - Error en los datos enviados
- 401: Unauthorized - No autenticado
- 403: Forbidden - No autorizado
- 404: Not Found - Recurso no encontrado
- 422: Unprocessable Entity - Error de validación
- 500: Internal Server Error - Error del servidor

## Notas
- Todas las respuestas incluyen un mensaje descriptivo en caso de error
- Las fechas se manejan en formato ISO (YYYY-MM-DD)
- Las calificaciones son números del 1 al 5
- Los roles pueden ser 'admin' o 'cinefilo'
