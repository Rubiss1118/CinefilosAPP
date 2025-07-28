<?php
// Script temporal para crear la base de datos
try {
    $pdo = new PDO('mysql:host=127.0.0.1;port=3306', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $sql = "CREATE DATABASE IF NOT EXISTS cinefilosapp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";
    $pdo->exec($sql);
    
    echo "✅ Base de datos 'cinefilosapp' creada exitosamente.\n";
    
} catch (PDOException $e) {
    echo "❌ Error al crear la base de datos: " . $e->getMessage() . "\n";
    echo "💡 Verifica que MySQL esté corriendo y que las credenciales sean correctas.\n";
}
?>
