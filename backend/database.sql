-- Crear la tabla de joyas
CREATE TABLE IF NOT EXISTS joyas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    stock INTEGER NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    metal VARCHAR(50) NOT NULL
);

-- Insertar datos de ejemplo
INSERT INTO joyas (nombre, precio, stock, categoria, metal) VALUES
('Anillo de oro', 1500.00, 10, 'anillos', 'oro'),
('Collar de plata', 800.00, 15, 'collares', 'plata'),
('Pulsera de oro', 1200.00, 8, 'pulseras', 'oro'),
('Aretes de plata', 600.00, 20, 'aretes', 'plata'),
('Anillo de plata', 900.00, 12, 'anillos', 'plata'); 