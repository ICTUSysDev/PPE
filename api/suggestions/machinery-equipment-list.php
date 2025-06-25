<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$equipment_description = $_POST['equipmentDescription'];

if($equipment_description == 'Machinery Equipment') {
  $machinery_equipment = $con->getData("SELECT id, property_number FROM machinery_equipment");
} else {
  $machinery_equipment =  $con->getData("SELECT id, property_number FROM furniture_and_fixtures");
}



header("Content-Type: application/json");
echo json_encode($machinery_equipment);

?>