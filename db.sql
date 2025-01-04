CREATE TABLE productos (
    id_producto INT PRIMARY KEY AUTO_INCREMENT,
    nombre_producto VARCHAR(100) NOT NULL,
    principio_activo TEXT,
    presentacion VARCHAR(50),
    concentracion VARCHAR(50),
    categoria VARCHAR(50),
    fecha_vencimiento DATE
);

INSERT INTO productos (nombre_producto, principio_activo, presentacion, concentracion, categoria, fecha_vencimiento)
VALUES
('Paracetamol', 'Paracetamol', 'Tabletas', '500 mg', 'Analgésico', '2025-06-30'),
('Ibuprofeno', 'Ibuprofeno', 'Cápsulas', '400 mg', 'Anti-inflamatorio', '2024-12-15'),
('Amoxicilina', 'Amoxicilina', 'Cápsulas', '500 mg', 'Antibiótico', '2024-05-20'),
('Loratadina', 'Loratadina', 'Tabletas', '10 mg', 'Antihistamínico', '2026-03-01'),
('Omeprazol', 'Omeprazol', 'Cápsulas', '20 mg', 'Antiácido', '2025-10-10'),
('Metformina', 'Metformina', 'Tabletas', '850 mg', 'Antidiabético', '2025-08-25'),
('Diclofenaco', 'Diclofenaco', 'Tabletas', '50 mg', 'Anti-inflamatorio', '2024-11-11'),
('Salbutamol', 'Salbutamol', 'Inhalador', '100 mcg', 'Broncodilatador', '2025-02-14'),
('Ranitidina', 'Ranitidina', 'Tabletas', '150 mg', 'Antiácido', '2024-07-22'),
('Aspirina', 'Ácido Acetilsalicílico', 'Tabletas', '500 mg', 'Analgésico', '2025-01-05');