<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$locations = $con->getData("SELECT id, building_and_structure_id, building_and_structure_location FROM building_and_structures");

echo json_encode($locations);

?>