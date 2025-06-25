<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$office = $con->getData("SELECT * FROM offices WHERE id = $_POST[id]");

if($office[0]['head_of_office'] != null) {
  $head_of_offices = $con->getData("SELECT id, CONCAT(last_name,',',' ', first_name,' ', middle_name) name FROM users WHERE id = ".$office[0]['head_of_office']);
  $office[0]['head_of_office'] = $head_of_offices[0];
}

header("Content-Type: application/json");
echo json_encode($office[0]);

?> 
