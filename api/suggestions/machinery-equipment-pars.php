<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$machinery_equipment = $con->getData("SELECT id, par_no FROM machinery_equipment_pars");

header("Content-Type: application/json");
echo json_encode($machinery_equipment);

?>