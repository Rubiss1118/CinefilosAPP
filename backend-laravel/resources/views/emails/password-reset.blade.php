<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recuperación de contraseña - Cinéfilos APP</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 20px 0;
            border-bottom: 1px solid #eee;
        }
        .header h1 {
            color: #6b46c1;
            margin: 0;
            font-size: 28px;
        }
        .content {
            padding: 30px 20px;
        }
        .code-container {
            background-color: #f0f0f9;
            border-radius: 6px;
            padding: 20px;
            text-align: center;
            margin: 20px 0;
        }
        .code {
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 5px;
            color: #6b46c1;
        }
        .instructions {
            margin-bottom: 25px;
        }
        .footer {
            text-align: center;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 12px;
            color: #777;
        }
        .logo {
            font-size: 36px;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🎬</div>
            <h1>Cinéfilos APP</h1>
        </div>
        
        <div class="content">
            <h2>Recuperación de Contraseña</h2>
            
            <div class="instructions">
                <p>Hola,</p>
                <p>Recibimos una solicitud para restablecer la contraseña de tu cuenta. Ingresa el siguiente código en la página de recuperación de contraseña:</p>
            </div>
            
            <div class="code-container">
                <div class="code">{{ $code }}</div>
            </div>
            
            <p>Este código expirará en 60 minutos.</p>
            
            <p>Si no solicitaste este cambio, puedes ignorar este correo. Tu cuenta sigue segura.</p>
        </div>
        
        <div class="footer">
            <p>&copy; {{ date('Y') }} Cinéfilos APP. Todos los derechos reservados.</p>
            <p>Este es un correo automático, por favor no respondas a este mensaje.</p>
        </div>
    </div>
</body>
</html>
