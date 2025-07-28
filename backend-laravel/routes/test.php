<?php

// Archivo temporal para probar autenticación

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::middleware('auth:sanctum')->get('/test-auth', function (Request $request) {
    return response()->json([
        'authenticated' => true,
        'user' => $request->user(),
        'token_valid' => $request->user() ? true : false
    ]);
});
