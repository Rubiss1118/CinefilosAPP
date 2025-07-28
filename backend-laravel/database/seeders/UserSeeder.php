<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Usuario admin principal
        User::create([
            'name' => 'Administrador',
            'email' => 'admin@cinefilos.com',
            'password' => Hash::make('admin123'),
            'rol' => 'admin',
        ]);

        // Usuarios de prueba con contraseñas conocidas
        $usuarios = [
            ['name' => 'Juan Pérez', 'email' => 'juan@example.com', 'password' => 'password123', 'rol' => 'cinefilo'],
            ['name' => 'María García', 'email' => 'maria@example.com', 'password' => 'password123', 'rol' => 'cinefilo'],
            ['name' => 'Carlos López', 'email' => 'carlos@example.com', 'password' => 'password123', 'rol' => 'admin'],
            ['name' => 'Ana Martínez', 'email' => 'ana@example.com', 'password' => 'password123', 'rol' => 'cinefilo'],
            ['name' => 'Luis Rodríguez', 'email' => 'luis@example.com', 'password' => 'password123', 'rol' => 'cinefilo'],
        ];

        foreach ($usuarios as $usuario) {
            User::create([
                'name' => $usuario['name'],
                'email' => $usuario['email'],
                'password' => Hash::make($usuario['password']),
                'rol' => $usuario['rol'],
            ]);
        }

        // Generar 24 usuarios adicionales
        for ($i = 6; $i <= 30; $i++) {
            User::create([
                'name' => 'Usuario ' . $i,
                'email' => 'usuario' . $i . '@example.com',
                'password' => Hash::make('password123'),
                'rol' => $i % 5 == 0 ? 'admin' : 'cinefilo', // Cada 5 usuarios uno es admin
            ]);
        }
    }
}
