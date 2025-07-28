<?php

namespace App\Services;

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Exception;

class EmailService
{
    /**
     * Envía un correo electrónico de recuperación de contraseña
     * 
     * @param string $email Correo electrónico del destinatario
     * @param string $code Código de verificación
     * @return array Resultado de la operación
     */
    public function sendPasswordResetEmail($email, $code)
    {
        try {
            // Registrar el intento
            Log::info("Intentando enviar correo de recuperación a {$email}");
            
            // Enviar el correo
            Mail::send('emails.password-reset', ['code' => $code], function($message) use ($email) {
                $message->to($email)
                        ->subject('Código de recuperación de contraseña - Cinéfilos APP');
            });
            
            // Verificar si el correo se envió correctamente
            $failures = Mail::failures();
            if (!empty($failures)) {
                Log::error("Fallo al enviar correo a {$email}. Direcciones fallidas: " . implode(', ', $failures));
                return [
                    'success' => false,
                    'message' => 'No se pudo enviar el correo a la dirección proporcionada',
                    'debug_info' => $failures
                ];
            }
            
            Log::info("Correo enviado exitosamente a {$email}");
            return [
                'success' => true,
                'message' => 'Correo enviado correctamente'
            ];
        } catch (Exception $e) {
            Log::error("Error al enviar correo a {$email}: " . $e->getMessage() . "\nTraza: " . $e->getTraceAsString());
            return [
                'success' => false,
                'message' => 'Error al enviar el correo',
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ];
        }
    }
}
