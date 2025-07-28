<?php

namespace App\Http\Controllers;

use App\Models\Pelicula;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PeliculaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $peliculas = Pelicula::with('resenas.usuario')->get();
        
        $peliculas = $peliculas->map(function ($pelicula) {
            return [
                'id' => $pelicula->id,
                'titulo' => $pelicula->titulo,
                'director' => $pelicula->director,
                'genero' => $pelicula->genero,
                'fecha_estreno' => $pelicula->fecha_estreno,
                'duracion' => $pelicula->duracion,
                'sinopsis' => $pelicula->sinopsis,
                'url_imagen' => $pelicula->url_imagen,
                'calificacion_promedio' => $pelicula->calificacionPromedio(),
                'total_resenas' => $pelicula->totalResenas(),
                'created_at' => $pelicula->created_at,
                'updated_at' => $pelicula->updated_at,
            ];
        });

        return response()->json([
            'peliculas' => $peliculas
        ]);
    }

    /**
     * Display a listing of the resource for admin.
     */
    public function adminIndex(Request $request)
    {
        $perPage = $request->get('per_page', 10);
        $peliculas = Pelicula::with(['resenas.usuario'])
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
        
        return response()->json($peliculas);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'titulo' => 'required|string|max:255',
            'director' => 'required|string|max:255',
            'genero' => 'required|string|max:100',
            'fecha_estreno' => 'required|date',
            'duracion' => 'required|integer|min:1',
            'sinopsis' => 'required|string',
            'url_imagen' => 'required|url',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $pelicula = Pelicula::create($request->all());

        return response()->json([
            'message' => 'Película creada exitosamente',
            'pelicula' => $pelicula
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Pelicula $pelicula)
    {
        $pelicula->load('resenas.usuario');
        
        return response()->json([
            'pelicula' => [
                'id' => $pelicula->id,
                'titulo' => $pelicula->titulo,
                'director' => $pelicula->director,
                'genero' => $pelicula->genero,
                'fecha_estreno' => $pelicula->fecha_estreno,
                'duracion' => $pelicula->duracion,
                'sinopsis' => $pelicula->sinopsis,
                'url_imagen' => $pelicula->url_imagen,
                'calificacion_promedio' => $pelicula->calificacionPromedio(),
                'total_resenas' => $pelicula->totalResenas(),
                'resenas' => $pelicula->resenas,
                'created_at' => $pelicula->created_at,
                'updated_at' => $pelicula->updated_at,
            ]
        ]);
    }

    /**
     * Obtener reseñas paginadas de una película
     */
    public function resenas(Pelicula $pelicula, Request $request)
    {
        $perPage = $request->get('per_page', 10);
        $resenas = $pelicula->resenas()
            ->with('usuario')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        return response()->json($resenas);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pelicula $pelicula)
    {
        $validator = Validator::make($request->all(), [
            'titulo' => 'sometimes|string|max:255',
            'director' => 'sometimes|string|max:255',
            'genero' => 'sometimes|string|max:100',
            'fecha_estreno' => 'sometimes|date',
            'duracion' => 'sometimes|integer|min:1',
            'sinopsis' => 'sometimes|string',
            'url_imagen' => 'sometimes|url',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $pelicula->update($request->all());

        return response()->json([
            'message' => 'Película actualizada exitosamente',
            'pelicula' => $pelicula
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pelicula $pelicula)
    {
        $pelicula->delete();

        return response()->json([
            'message' => 'Película eliminada exitosamente'
        ]);
    }

    /**
     * Obtener estadísticas de películas
     */
    public function estadisticas()
    {
        $totalPeliculas = Pelicula::count();
        $peliculasRecientes = Pelicula::whereDate('created_at', '>=', now()->subDays(30))->count();
        $peliculasSinResenas = Pelicula::doesntHave('resenas')->count();
        $peliculasConResenas = Pelicula::has('resenas')->count();
        
        // Top 5 géneros más populares
        $generosMasPopulares = Pelicula::select('genero')
            ->selectRaw('COUNT(*) as total')
            ->groupBy('genero')
            ->orderBy('total', 'desc')
            ->limit(5)
            ->get();

        return response()->json([
            'total_peliculas' => $totalPeliculas,
            'peliculas_recientes' => $peliculasRecientes,
            'peliculas_sin_resenas' => $peliculasSinResenas,
            'peliculas_con_resenas' => $peliculasConResenas,
            'generos_populares' => $generosMasPopulares
        ]);
    }
}
