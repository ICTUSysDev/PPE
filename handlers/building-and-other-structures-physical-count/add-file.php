<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$bos = $con->getData("SELECT id, building_and_structure_id, building_and_structure_location, building_and_structure_component FROM building_and_structures WHERE id = $_POST[id]");

header("Content-Type: application/json");
echo json_encode($bos[0]);

?> 