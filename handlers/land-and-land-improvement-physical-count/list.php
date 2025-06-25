<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$land_and_land_improvements = $con->getData("SELECT * FROM land_and_land_improvements");

foreach($land_and_land_improvements as $key => $land_and_land_improvement) {

  $land_and_land_improvements[$key]['list_no'] = $key+1;

}

header("Content-Type: application/json");
echo json_encode($land_and_land_improvements);

?>