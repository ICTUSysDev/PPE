<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$machinery_equipment_repars = $con->getData("SELECT * FROM machinery_equipment_pars WHERE id = $_POST[id]");

$accountable_officer = $con->getData("SELECT id, CONCAT(last_name,', ',first_name,' ',middle_name) name FROM users WHERE id = ".$machinery_equipment_repars[0]['accountable_officer']);
$machinery_equipment_repars[0]['accountable_officer'] = $accountable_officer[0];

unset($machinery_equipment_repars[0]['par_date']);

header("Content-Type: application/json");
echo json_encode($machinery_equipment_repars[0]);

?> 
