<?php

namespace App\Http\Controllers;

use App\Models\Resena;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ResenaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        if ($user->isAdmin()) {
            // Admin puede ver todas las reseñas
            $resenas = Resena::with(['pelicula', 'usuario'])->get();
        } else {
            // Cinéfilo solo ve sus propias reseñas
            $resenas = Resena::with(['pelicula', 'usuario'])
                ->where('usuario_id', $user->id)
                ->get();
        }

        return response()->json([
            'resenas' => $resenas
        ]);
    }

    /**
     * Obtener reseñas del usuario autenticado
     */
    public function misResenas(Request $request)
    {
        $user = $request->user();
        $resenas = Resena::with(['pelicula', 'usuario'])
            ->where('usuario_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'resenas' => $resenas
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'pelicula_id' => 'required|exists:peliculas,id',
            'calificacion' => 'required|integer|min:1|max:5',
            'resena' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Ya no verificamos si el usuario tiene una reseña existente
        // Permitimos múltiples reseñas por película y usuario

        $resena = Resena::create([
            'pelicula_id' => $request->pelicula_id,
            'usuario_id' => $request->user()->id,
            'calificacion' => $request->calificacion,
            'resena' => $request->resena,
        ]);

        $resena->load(['pelicula', 'usuario']);

        return response()->json([
            'message' => 'Reseña creada exitosamente',
            'resena' => $resena
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Resena $resena)
    {
        $resena->load(['pelicula', 'usuario']);
        
        return response()->json([
            'resena' => $resena
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Resena $resena)
    {
        $user = $request->user();

        // Solo el autor o admin pueden editar
        if (!$user->isAdmin() && $resena->usuario_id !== $user->id) {
            return response()->json([
                'message' => 'No autorizado para editar esta reseña'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'calificacion' => 'sometimes|integer|min:1|max:5',
            'resena' => 'sometimes|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $resena->update($request->only(['calificacion', 'resena']));

        $resena->load(['pelicula', 'usuario']);

        return response()->json([
            'message' => 'Reseña actualizada exitosamente',
            'resena' => $resena
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Resena $resena, Request $request)
    {
        $user = $request->user();

        // Solo el autor o admin pueden eliminar
        if (!$user->isAdmin() && $resena->usuario_id !== $user->id) {
            return response()->json([
                'message' => 'No autorizado para eliminar esta reseña'
            ], 403);
        }

        $resena->delete();

        return response()->json([
            'message' => 'Reseña eliminada exitosamente'
        ]);
    }

    /**
     * Display a listing of all reviews for admin.
     */
    public function adminIndex(Request $request)
    {
        $perPage = $request->get('per_page', 10);
        $resenas = Resena::with(['pelicula', 'usuario'])
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        return response()->json($resenas);
    }

    /**
     * Admin update review.
     */
    public function adminUpdate(Request $request, Resena $resena)
    {
        // Registrar los datos que llegan para depuración
        \Log::info('Datos recibidos para actualizar reseña:', [
            'resena_id' => $resena->id,
            'request_data' => $request->all()
        ]);
        
        $validator = Validator::make($request->all(), [
            'calificacion' => 'sometimes|integer|min:1|max:5',
            'resena' => 'sometimes|string|max:1000',
        ]);

        if ($validator->fails()) {
            \Log::error('Error de validación:', ['errors' => $validator->errors()]);
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Datos que se van a actualizar
        $datosActualizados = $request->only(['calificacion', 'resena']);
        \Log::info('Datos que se actualizarán:', $datosActualizados);
        
        $resena->update($datosActualizados);
        
        // Verificar si se guardaron los cambios
        $resenaActualizada = Resena::find($resena->id);
        \Log::info('Reseña después de actualizar:', [
            'id' => $resenaActualizada->id,
            'resena' => $resenaActualizada->resena,
            'calificacion' => $resenaActualizada->calificacion
        ]);

        return response()->json([
            'message' => 'Reseña actualizada exitosamente',
            'resena' => $resena->load(['pelicula', 'usuario'])
        ]);
    }

    /**
     * Obtener estadísticas de reseñas
     */
    public function estadisticas()
    {
        $totalResenas = Resena::count();
        $resenasRecientes = Resena::whereDate('created_at', '>=', now()->subDays(30))->count();
        $promedioCalificacion = Resena::avg('calificacion');
        
        // Distribución de calificaciones
        $distribucionCalificaciones = Resena::select('calificacion')
            ->selectRaw('COUNT(*) as total')
            ->groupBy('calificacion')
            ->orderBy('calificacion')
            ->get();

        // Top 5 usuarios más activos (más reseñas)
        $usuariosMasActivos = Resena::select('usuario_id')
            ->with('usuario:id,name')
            ->selectRaw('COUNT(*) as total_resenas')
            ->groupBy('usuario_id')
            ->orderBy('total_resenas', 'desc')
            ->limit(5)
            ->get();

        return response()->json([
            'total_resenas' => $totalResenas,
            'resenas_recientes' => $resenasRecientes,
            'promedio_calificacion' => round($promedioCalificacion, 2),
            'distribucion_calificaciones' => $distribucionCalificaciones,
            'usuarios_mas_activos' => $usuariosMasActivos
        ]);
    }
}
