<?php

namespace Database\Seeders;

use App\Models\Pelicula;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PeliculaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $peliculas = [
            [
                'titulo' => 'El Padrino',
                'director' => 'Francis Ford Coppola',
                'genero' => 'Drama/Crimen',
                'fecha_estreno' => '1972-03-24',
                'duracion' => 175,
                'sinopsis' => 'La saga de la familia Corleone bajo el patriarca Vito Corleone, centrándose en la transformación de su hijo menor, Michael, de reacio hijo de familia a despiadado jefe mafioso.',
                'url_imagen' => 'https://images.unsplash.com/photo-1489599510070-5c5b2ad81dc8?w=400'
            ],
            [
                'titulo' => 'Pulp Fiction',
                'director' => 'Quentin Tarantino',
                'genero' => 'Crimen/Drama',
                'fecha_estreno' => '1994-10-14',
                'duracion' => 154,
                'sinopsis' => 'Las vidas de dos sicarios, un boxeador, la esposa de un gángster y un par de bandidos se entrelazan en cuatro historias de violencia y redención.',
                'url_imagen' => 'https://images.unsplash.com/photo-1489599510070-5c5b2ad81dc8?w=400'
            ],
            [
                'titulo' => 'El Caballero de la Noche',
                'director' => 'Christopher Nolan',
                'genero' => 'Acción/Drama',
                'fecha_estreno' => '2008-07-18',
                'duracion' => 152,
                'sinopsis' => 'Cuando la amenaza conocida como el Joker emerge de su misterioso pasado, causa estragos y caos en la gente de Gotham.',
                'url_imagen' => 'https://images.unsplash.com/photo-1489599510070-5c5b2ad81dc8?w=400'
            ],
            [
                'titulo' => 'Forrest Gump',
                'director' => 'Robert Zemeckis',
                'genero' => 'Drama/Romance',
                'fecha_estreno' => '1994-07-06',
                'duracion' => 142,
                'sinopsis' => 'Las presidencias de Kennedy y Johnson, Vietnam, Watergate y otros eventos históricos se desarrollan desde la perspectiva de un hombre de Alabama con un coeficiente intelectual de 75.',
                'url_imagen' => 'https://images.unsplash.com/photo-1489599510070-5c5b2ad81dc8?w=400'
            ],
            [
                'titulo' => 'Inception',
                'director' => 'Christopher Nolan',
                'genero' => 'Acción/Ciencia Ficción',
                'fecha_estreno' => '2010-07-16',
                'duracion' => 148,
                'sinopsis' => 'Un ladrón que roba secretos corporativos a través del uso de la tecnología de compartir sueños recibe la tarea inversa de plantar una idea en la mente de un CEO.',
                'url_imagen' => 'https://images.unsplash.com/photo-1489599510070-5c5b2ad81dc8?w=400'
            ],
            [
                'titulo' => 'Matrix',
                'director' => 'The Wachowskis',
                'genero' => 'Acción/Ciencia Ficción',
                'fecha_estreno' => '1999-03-31',
                'duracion' => 136,
                'sinopsis' => 'Un hacker descubre que la realidad como la conoce no existe y se une a una rebelión contra las máquinas que han esclavizado a la humanidad.',
                'url_imagen' => 'https://images.unsplash.com/photo-1489599510070-5c5b2ad81dc8?w=400'
            ],
            [
                'titulo' => 'Titanic',
                'director' => 'James Cameron',
                'genero' => 'Romance/Drama',
                'fecha_estreno' => '1997-12-19',
                'duracion' => 195,
                'sinopsis' => 'Una aristócrata de diecisiete años se enamora de un artista amable pero pobre a bordo del lujoso y malogrado R.M.S. Titanic.',
                'url_imagen' => 'https://images.unsplash.com/photo-1489599510070-5c5b2ad81dc8?w=400'
            ],
            [
                'titulo' => 'Avatar',
                'director' => 'James Cameron',
                'genero' => 'Acción/Aventura',
                'fecha_estreno' => '2009-12-18',
                'duracion' => 162,
                'sinopsis' => 'Un marine parapléjico enviado a la luna Pandora en una misión única se debate entre seguir órdenes y proteger el mundo que siente como su hogar.',
                'url_imagen' => 'https://images.unsplash.com/photo-1489599510070-5c5b2ad81dc8?w=400'
            ],
            [
                'titulo' => 'Interstellar',
                'director' => 'Christopher Nolan',
                'genero' => 'Drama/Ciencia Ficción',
                'fecha_estreno' => '2014-11-07',
                'duracion' => 169,
                'sinopsis' => 'Un equipo de exploradores viaja a través de un agujero de gusano en el espacio en un intento de asegurar la supervivencia de la humanidad.',
                'url_imagen' => 'https://images.unsplash.com/photo-1489599510070-5c5b2ad81dc8?w=400'
            ],
            [
                'titulo' => 'El Señor de los Anillos: El Retorno del Rey',
                'director' => 'Peter Jackson',
                'genero' => 'Aventura/Drama',
                'fecha_estreno' => '2003-12-17',
                'duracion' => 201,
                'sinopsis' => 'Gandalf y Aragorn lideran el Mundo de los Hombres contra el ejército de Sauron para distraer su atención de Frodo y Sam mientras se acercan al Monte del Destino con el Anillo Único.',
                'url_imagen' => 'https://images.unsplash.com/photo-1489599510070-5c5b2ad81dc8?w=400'
            ]
        ];

        // Insertar las primeras 10 películas
        foreach ($peliculas as $pelicula) {
            Pelicula::create($pelicula);
        }

        // Generar 40 películas adicionales
        $generos = ['Acción', 'Drama', 'Comedia', 'Terror', 'Ciencia Ficción', 'Romance', 'Thriller', 'Aventura'];
        $directores = ['Steven Spielberg', 'Martin Scorsese', 'Ridley Scott', 'David Fincher', 'Quentin Tarantino', 'Christopher Nolan', 'James Cameron', 'Denis Villeneuve'];

        for ($i = 11; $i <= 50; $i++) {
            Pelicula::create([
                'titulo' => 'Película ' . $i,
                'director' => $directores[array_rand($directores)],
                'genero' => $generos[array_rand($generos)],
                'fecha_estreno' => fake()->dateTimeBetween('1990-01-01', '2024-12-31')->format('Y-m-d'),
                'duracion' => fake()->numberBetween(90, 180),
                'sinopsis' => fake()->paragraph(3),
                'url_imagen' => 'https://images.unsplash.com/photo-1489599510070-5c5b2ad81dc8?w=400'
            ]);
        }
    }
}
