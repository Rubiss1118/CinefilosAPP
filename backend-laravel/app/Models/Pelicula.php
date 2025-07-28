<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Pelicula extends Model
{
    use HasFactory;

    protected $fillable = [
        'titulo',
        'director',
        'genero',
        'fecha_estreno',
        'duracion',
        'sinopsis',
        'url_imagen',
    ];

    protected $casts = [
        'fecha_estreno' => 'date',
    ];

    /**
     * Relación con reseñas
     */
    public function resenas()
    {
        return $this->hasMany(Resena::class);
    }

    /**
     * Obtener calificación promedio
     */
    public function calificacionPromedio()
    {
        return $this->resenas()->avg('calificacion');
    }

    /**
     * Obtener total de reseñas
     */
    public function totalResenas()
    {
        return $this->resenas()->count();
    }
}
