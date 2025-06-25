<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$serial_number = $_POST['serialNumber'];

$check_serial = $con->getData("SELECT id, serial_number FROM parts_serial_number WHERE serial_number = '$serial_number'");

header("Content-Type: application/json");
echo json_encode($check_serial);

?>