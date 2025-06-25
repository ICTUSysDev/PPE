<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$suppliers = $con->getData("SELECT id, name FROM suppliers ORDER BY name");

header("Content-Type: application/json");
echo json_encode($suppliers);

?>