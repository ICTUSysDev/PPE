<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../../db.php';

$con = new pdo_db();

$serial_number = $con->getData("SELECT * FROM parts_serial_number WHERE machinery_equipment_id = $_POST[id]");

header("Content-Type: application/json");
echo json_encode($serial_number);

?>