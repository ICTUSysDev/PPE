<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$offices = $con->getData("SELECT id, name, shortname FROM offices");

header("Content-Type: application/json");
echo json_encode($offices);

?>