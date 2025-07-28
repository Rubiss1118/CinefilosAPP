<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\Mail;

try {
    Mail::raw('Este es un correo de prueba desde Laravel para verificar la configuración de correo.', function ($message) {
        $message->to('rubiesmo13@gmail.com')
                ->subject('Prueba de envío de correo - Cinéfilos APP');
    });
    
    echo "Correo enviado correctamente. Revisa tu bandeja de entrada.\n";
    
} catch (\Exception $e) {
    echo "Error al enviar el correo: " . $e->getMessage() . "\n";
    echo "Traza completa: " . $e->getTraceAsString() . "\n";
}
