<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$funds = $con->getData("SELECT id, name FROM funds ORDER BY id");

header("Content-Type: application/json");
echo json_encode($funds);

?>