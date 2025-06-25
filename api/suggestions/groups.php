<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$groups = $con->getData("SELECT id, name FROM groups");

header("Content-Type: application/json");
echo json_encode($groups);

?>