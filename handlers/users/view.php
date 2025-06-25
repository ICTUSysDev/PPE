<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$user = $con->getData("SELECT * FROM users WHERE id = $_POST[id]");
$user[0]['password'] = "";

$office = $con->getData("SELECT id, name FROM offices WHERE id = ".$user[0]['office_id']);
$user[0]['office_id'] = $office[0];

$position = $con->getData("SELECT id, position_description FROM positions WHERE id = ".$user[0]['position_id']);
$user[0]['position_id'] = $position[0];

$group = $con->getData("SELECT id, name FROM groups WHERE id = ".$user[0]['groups']);
$user[0]['groups'] = $group[0];

header("Content-Type: application/json");
echo json_encode($user[0]);

?> 
