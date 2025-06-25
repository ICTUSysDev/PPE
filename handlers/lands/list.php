<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$land_and_land_improvements = $con->getData("SELECT id, land_code, location, land_condition, remarks FROM land_and_land_improvements WHERE classification = 'Land'");

foreach($land_and_land_improvements as $key => $land_and_land_improvement) {

  $land_and_land_improvements[$key]['list_no'] = $key+1;

}

header("Content-Type: application/json");
echo json_encode($land_and_land_improvements);

?>