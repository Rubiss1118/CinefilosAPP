<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Models\User;
use Carbon\Carbon;
use App\Services\EmailService;

class PasswordResetController extends Controller
{
    protected $emailService;

    public function __construct(EmailService $emailService)
    {
        $this->emailService = $emailService;
    }

    /**
     * Solicitar restablecimiento de contraseña
     */
    public function requestReset(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        $email = $request->email;
        
        // Generar código de 6 dígitos
        $code = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
        
        // Eliminar códigos anteriores para este email
        DB::table('password_resets')->where('email', $email)->delete();
        
        // Insertar nuevo código con expiración de 1 hora
        DB::table('password_resets')->insert([
            'email' => $email,
            'token' => Hash::make($code),
            'code' => $code, // Guardamos el código sin hashear para facilitar la verificación
            'created_at' => Carbon::now()
        ]);

        // Registramos en los logs (sólo para seguimiento)
        \Log::info("Código de recuperación para {$email}: {$code}");
        
        // Enviar el correo electrónico usando nuestro servicio
        $result = $this->emailService->sendPasswordResetEmail($email, $code);
        
        // Incluimos el código en el modo de desarrollo
        $includeCodeInResponse = config('app.env') === 'local' || config('app.debug');
        
        if ($result['success']) {
            return response()->json([
                'message' => 'Código de recuperación enviado a tu email',
                'code' => $includeCodeInResponse ? $code : null,
                'success' => true
            ], 200);
        } else {
            // Si hay un error pero estamos en desarrollo, incluimos el código para facilitar pruebas
            return response()->json([
                'message' => 'Error al enviar el correo. Por favor, intenta nuevamente más tarde.',
                'code' => $includeCodeInResponse ? $code : null,
                'success' => false,
                'debug_info' => $includeCodeInResponse ? $result : null
            ], 200); // Código 200 para permitir continuar con el flujo
        }
    }

    /**
     * Verificar código de restablecimiento
     */
    public function verifyCode(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code' => 'required|string|size:6',
        ]);

        $email = $request->email;
        $code = $request->code;
        
        \Log::info("Verificando código para {$email}: {$code}");

        // Buscar el código en la base de datos
        $resetRecord = DB::table('password_resets')
            ->where('email', $email)
            ->where('code', $code)
            ->where('created_at', '>=', Carbon::now()->subHour())
            ->first();

        if (!$resetRecord) {
            \Log::warning("Código inválido o expirado para {$email}: {$code}");
            
            // Buscar si hay algún registro para este email para mejor diagnóstico
            $anyRecord = DB::table('password_resets')
                ->where('email', $email)
                ->first();
                
            if ($anyRecord) {
                \Log::info("Hay un código para este email, pero no coincide o está expirado");
            } else {
                \Log::info("No hay ningún código registrado para este email");
            }
            
            return response()->json([
                'message' => 'Código inválido o expirado'
            ], 400);
        }

        \Log::info("Código verificado correctamente para {$email}");
        return response()->json([
            'message' => 'Código verificado correctamente'
        ], 200);
    }

    /**
     * Restablecer contraseña
     */
    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code' => 'required|string|size:6',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $email = $request->email;
        $code = $request->code;
        $password = $request->password;

        // Verificar el código nuevamente
        $resetRecord = DB::table('password_resets')
            ->where('email', $email)
            ->where('code', $code)
            ->where('created_at', '>=', Carbon::now()->subHour())
            ->first();

        if (!$resetRecord) {
            return response()->json([
                'message' => 'Código inválido o expirado'
            ], 400);
        }

        // Actualizar la contraseña del usuario
        $user = User::where('email', $email)->first();
        
        if (!$user) {
            return response()->json([
                'message' => 'Usuario no encontrado'
            ], 404);
        }

        $user->password = Hash::make($password);
        $user->save();

        // Eliminar el código usado
        DB::table('password_resets')->where('email', $email)->delete();

        return response()->json([
            'message' => 'Contraseña actualizada correctamente'
        ], 200);
    }
}
