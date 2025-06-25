<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$employee = $con->getData("SELECT * FROM users WHERE id = $_POST[id]");
$employee[0]['password'] = "";

$office = $con->getData("SELECT id, name FROM offices WHERE id = ".$employee[0]['office_id']);
$employee[0]['office_id'] = $office[0];

$position = $con->getData("SELECT id, position_description FROM positions WHERE id = ".$employee[0]['position_id']);
$employee[0]['position_id'] = $position[0];

$group = $con->getData("SELECT id, name FROM groups WHERE id = ".$employee[0]['groups']);
$employee[0]['groups'] = $group[0];

header("Content-Type: application/json");
echo json_encode($employee[0]);

?> 
