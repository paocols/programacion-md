<?php
header('Content-Type: application/json'); // Asegura que la respuesta esté en formato JSON

// Obtener los datos del cuerpo de la solicitud (JSON)
$data = json_decode(file_get_contents('php://input'), true);

$nombre = $data['nombre'];
$apellido = $data['apellido'];
$sueldo = $data['sueldo'];

// Conectar a la base de datos
$conn = new mysqli('localhost', 'root', '', 'empleados_db');

// Verificar la conexión
if ($conn->connect_error) {
    echo json_encode(["message" => "Error de conexión: " . $conn->connect_error]);
    exit;
}

// Preparar la consulta
$stmt = $conn->prepare("INSERT INTO empleados (nombre, apellido, sueldo) VALUES (?, ?, ?)");
$stmt->bind_param("ssd", $nombre, $apellido, $sueldo);  // 's' para string, 'd' para double

// Ejecutar la consulta e informar el resultado
if ($stmt->execute()) {
    echo json_encode(["message" => "Empleado registrado con éxito."]);
} else {
    echo json_encode(["message" => "Error: " . $conn->error]);
}

// Cerrar la declaración y la conexión
$stmt->close();
$conn->close();
?>

