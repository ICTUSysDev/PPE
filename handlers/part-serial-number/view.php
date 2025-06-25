<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$part_serial_number = $con->getData("SELECT * FROM parts_serial_number WHERE id = $_POST[id]");

header("Content-Type: application/json");
echo json_encode($part_serial_number[0]);

?> 
