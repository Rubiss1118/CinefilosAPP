# Configuración de Recuperación de Contraseña - Cinéfilos APP

## Configuración del Sistema de Correo

Para que el sistema de recuperación de contraseña funcione correctamente, se debe configurar el servicio de correo electrónico. Siga estos pasos:

### 1. Configuración del archivo .env

Actualice las siguientes variables en el archivo `.env` del proyecto backend:

```
MAIL_MAILER=smtp
MAIL_HOST=sandbox.smtp.mailtrap.io  # O su servidor SMTP
MAIL_PORT=2525                      # Puerto SMTP
MAIL_USERNAME=tu_usuario_smtp       # Usuario SMTP
MAIL_PASSWORD=tu_contraseña_smtp    # Contraseña SMTP
MAIL_FROM_ADDRESS="noreply@cinefilos.com"
MAIL_FROM_NAME="Cinéfilos APP"
```

### 2. Servicios de Correo Recomendados para Pruebas

- **Mailtrap**: Ideal para entornos de desarrollo. Captura los correos y los muestra en una interfaz web.
  - Regístrese en [Mailtrap](https://mailtrap.io/)
  - Obtenga las credenciales SMTP de su bandeja de entrada
  - Coloque esas credenciales en el archivo `.env`

- **Gmail**: Para pruebas con correos reales.
  - Configure las siguientes variables:
    ```
    MAIL_MAILER=smtp
    MAIL_HOST=smtp.gmail.com
    MAIL_PORT=587
    MAIL_USERNAME=tu_correo@gmail.com
    MAIL_PASSWORD=tu_contraseña_de_aplicación
    ```
  - Nota: Para Gmail, necesita crear una "Contraseña de aplicación" en la configuración de seguridad de su cuenta de Google.

### 3. Verificación de la Configuración

Para verificar que la configuración de correo funciona correctamente, puede usar el siguiente comando Artisan:

```
php artisan tinker
Mail::raw('Prueba de correo desde Cinéfilos APP', function($message) { $message->to('correo_destino@example.com')->subject('Prueba'); });
```

## Flujo de Recuperación de Contraseña

1. El usuario solicita recuperación en la página de inicio de sesión
2. Se envía un código de 6 dígitos al correo del usuario
3. El usuario introduce el código en la página de verificación
4. Una vez verificado, el usuario puede establecer una nueva contraseña

## Importante

- En entorno de desarrollo, el código se muestra en la respuesta de la API para facilitar las pruebas
- En producción, esta función está desactivada y el código solo se envía por correo electrónico
- Los códigos de recuperación expiran después de 60 minutos
