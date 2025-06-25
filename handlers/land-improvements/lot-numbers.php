<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$lot_numbers = $con->getData("SELECT id, lot_number, land_code FROM land_and_land_improvements WHERE classification = 'Land'");

echo json_encode($lot_numbers);

?>