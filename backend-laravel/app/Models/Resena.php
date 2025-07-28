<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Resena extends Model
{
    use HasFactory;

    protected $fillable = [
        'pelicula_id',
        'usuario_id',
        'calificacion',
        'resena',
    ];

    /**
     * Relación con película
     */
    public function pelicula()
    {
        return $this->belongsTo(Pelicula::class);
    }

    /**
     * Relación con usuario
     */
    public function usuario()
    {
        return $this->belongsTo(User::class, 'usuario_id');
    }
}
