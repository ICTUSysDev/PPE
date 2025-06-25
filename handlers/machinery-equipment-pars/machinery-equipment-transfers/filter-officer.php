<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../../db.php';

$con = new pdo_db();

$office_id = $_POST['officeId'];

$accountable_officer = $con->getData("SELECT id, CONCAT(first_name, ' ', last_name) as name, employee_id, office_id FROM users WHERE office_id = $office_id");

header("Content-Type: application/json");
echo json_encode($accountable_officer);

?>