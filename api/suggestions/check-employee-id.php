<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$employee_id = $con->getData("SELECT id, employee_id FROM users WHERE employee_id = $_POST[employeeId]");

header("Content-Type: application/json");
echo json_encode($employee_id);

?>