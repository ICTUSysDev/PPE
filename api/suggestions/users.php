<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$employees = $con->getData("SELECT id, CONCAT(last_name,',',' ', first_name,' ', middle_name) name, office_id, employee_id FROM users");

header("Content-Type: application/json");
echo json_encode($employees);

?>