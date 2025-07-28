<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PeliculaController;
use App\Http\Controllers\ResenaController;
use App\Http\Controllers\PasswordResetController;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Rutas públicas de autenticación
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Rutas de recuperación de contraseña (públicas)
Route::post('/password/request-reset', [PasswordResetController::class, 'requestReset']);
Route::post('/password/verify-code', [PasswordResetController::class, 'verifyCode']);
Route::post('/password/reset', [PasswordResetController::class, 'resetPassword']);

// Ruta de prueba de autenticación
Route::middleware('auth:sanctum')->get('/test-auth', function (Request $request) {
    return response()->json([
        'authenticated' => true,
        'user' => $request->user(),
        'token_valid' => $request->user() ? true : false
    ]);
});

// Rutas públicas - visualización de películas
Route::get('/peliculas', [PeliculaController::class, 'index']);
Route::get('/peliculas/{pelicula}', [PeliculaController::class, 'show']);
Route::get('/peliculas/{pelicula}/resenas', [PeliculaController::class, 'resenas']);

// Rutas protegidas
Route::middleware('auth:sanctum')->group(function () {
    // Rutas de autenticación
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    
    // Rutas de reseñas para usuarios autenticados
    Route::get('/mis-resenas', [ResenaController::class, 'misResenas']);
    Route::apiResource('/resenas', ResenaController::class);
    
    // Rutas solo para admin - Gestión de usuarios
    Route::middleware([RoleMiddleware::class . ':admin'])->group(function () {
        // Estadísticas - DEBE IR ANTES de las rutas con parámetros
        Route::get('/admin/usuarios/estadisticas', [UserController::class, 'estadisticas']);
        Route::get('/admin/peliculas/estadisticas', [PeliculaController::class, 'estadisticas']);
        Route::get('/admin/resenas/estadisticas', [ResenaController::class, 'estadisticas']);
        
        // Gestión de usuarios con prefijo admin
        Route::get('/admin/usuarios', [UserController::class, 'index']);
        Route::post('/admin/usuarios', [UserController::class, 'store']);
        Route::get('/admin/usuarios/{user}', [UserController::class, 'show']);
        Route::put('/admin/usuarios/{user}', [UserController::class, 'update']);
        Route::delete('/admin/usuarios/{user}', [UserController::class, 'destroy']);
        
        // Gestión completa de películas con prefijo admin
        Route::get('/admin/peliculas', [PeliculaController::class, 'adminIndex']);
        Route::post('/admin/peliculas', [PeliculaController::class, 'store']);
        Route::put('/admin/peliculas/{pelicula}', [PeliculaController::class, 'update']);
        Route::delete('/admin/peliculas/{pelicula}', [PeliculaController::class, 'destroy']);
        
        // Admin puede ver todas las reseñas
        Route::get('/admin/resenas', [ResenaController::class, 'adminIndex']);
        Route::get('/admin/resenas/{resena}', [ResenaController::class, 'show']);
        Route::put('/admin/resenas/{resena}', [ResenaController::class, 'adminUpdate']);
        Route::delete('/admin/resenas/{resena}', [ResenaController::class, 'destroy']);
    });
});
