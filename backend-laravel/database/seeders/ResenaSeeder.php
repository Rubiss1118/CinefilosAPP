<?php

namespace Database\Seeders;

use App\Models\Resena;
use App\Models\User;
use App\Models\Pelicula;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ResenaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $usuarios = User::all();
        $peliculas = Pelicula::all();

        $resenasEjemplo = [
            'Excelente película, una obra maestra del cine.',
            'Muy buena actuación y dirección, la recomiendo ampliamente.',
            'Una historia emocionante que te mantiene al borde del asiento.',
            'Efectos visuales impresionantes y una banda sonora memorable.',
            'Un clásico que nunca pasa de moda, simplemente brillante.',
            'Película decepcionante, esperaba mucho más del director.',
            'Historia predecible pero entretenida para pasar el rato.',
            'Actores convincentes en una trama bien desarrollada.',
            'Una experiencia cinematográfica única e inolvidable.',
            'Diálogos inteligentes y personajes bien construidos.',
            'Fotografía hermosa y ambientación perfecta.',
            'Ritmo lento pero profundo, requiere paciencia.',
            'Entretenida aunque no aporta nada nuevo al género.',
            'Obra de arte visual con mensaje profundo.',
            'Thriller emocionante con giros inesperados.',
        ];

        // Generar 80 reseñas
        for ($i = 1; $i <= 80; $i++) {
            $usuario = $usuarios->random();
            $pelicula = $peliculas->random();
            
            // Verificar que no exista ya una reseña de este usuario para esta película
            $existeResena = Resena::where('usuario_id', $usuario->id)
                ->where('pelicula_id', $pelicula->id)
                ->exists();
            
            if (!$existeResena) {
                Resena::create([
                    'pelicula_id' => $pelicula->id,
                    'usuario_id' => $usuario->id,
                    'calificacion' => fake()->numberBetween(1, 5),
                    'resena' => $resenasEjemplo[array_rand($resenasEjemplo)] . ' ' . fake()->sentence(),
                ]);
            } else {
                // Si ya existe, intentar con otra combinación
                $i--;
            }
        }
    }
}
