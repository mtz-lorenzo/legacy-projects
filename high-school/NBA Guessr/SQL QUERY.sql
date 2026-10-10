-- 1. Crear la base de datos con el nombre solicitado
CREATE DATABASE IF NOT EXISTS juego2_db;
USE juego2_db;

-- 2. Crear la tabla de Usuarios (basada en /login y /register)
CREATE TABLE IF NOT EXISTS Users (
    UserId INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL
);

-- 3. Crear la tabla de Equipos (basada en /checkGuess: busca por 'Name' y devuelve 'teamId')
CREATE TABLE IF NOT EXISTS Teams (
    teamId INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL UNIQUE
);

-- 4. Insertar los equipos (quitando la extensión .png y respetando el nombre exacto de tus imágenes)
INSERT INTO Teams (Name) VALUES
('ATLANTA HAWKS'),
('BOSTON CELTICS'),
('BROOKLYN NETS'),
('CHARLOTTE HORNETS'),
('CHICAGO BULLS'),
('CLEVELAND CAVALIERS'),
('DALLAS MAVERICKS'),
('DENVER NUGGETS'),
('DETROIT PISTONS'),
('GOLDEN STATE WARRIORS'),
('HOUSTON ROCKETS'),
('INDIANA PACERS'),
('LOS ANGELES CLIPPERS'),
('LOS ANGELES LAKERS'),
('MEMPHIS GRIZZLIES'),
('MIAMI HEAT'),
('MILWAUKEE BUCKS'),
('MINNESOTA TIMBERWOLVES'),
('NEW ORLEANS PELICANS'),
('NEW YORK KNICKS'),
('OKLAHOMA CITY THUNDER'),
('ORLANDO MAGIC'),
('PHILADELPHIA 76ERS'),
('PHOENIX SUNS'),
('PORTLAND TRAIL BLAZERS'),
('SACRAMENTO KINGS'),
('SAN ANTONIO SPURS'),
('TORONTO RAPTORS'),
('UTAH JAZZ'),
('WASHINGTON WIZARDS');