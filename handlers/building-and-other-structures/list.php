<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$building_and_structures = $con->getData("SELECT id, building_and_structure_id, building_and_structure_location, building_and_structure_property_no, building_and_structure_condition, remarks FROM building_and_structures");

foreach($building_and_structures as $key => $building_and_structure) {

  $building_and_structures[$key]['list_no'] = $key+1;

}

header("Content-Type: application/json");
echo json_encode($building_and_structures);

?>