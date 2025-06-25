<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$lali_view = $con->getData("SELECT id, land_code, classification, description FROM land_and_land_improvements WHERE id = $_POST[id]");

header("Content-Type: application/json");
echo json_encode($lali_view[0]);

?> 