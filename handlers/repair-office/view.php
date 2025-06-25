<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$pri_id = $_POST['id'];

// var_dump($pri_id); exit();

$pre_repair_inspection = $con->getData("SELECT * FROM pre_repair_inspection WHERE id = $pri_id");

$machinery_equipment = $con->getData("SELECT id, property_number, acquisition_cost, description, brand_id, article_id FROM machinery_equipment WHERE id = ".$pre_repair_inspection[0]['equipment_id']);
$pre_repair_inspection[0]['machinery_equipment'] = $machinery_equipment[0];
if($machinery_equipment[0]['brand_id'] != null) {
  $brand = $con->getData("SELECT id, name FROM brands WHERE id = ".$machinery_equipment[0]['brand_id']);
  $pre_repair_inspection[0]['brand'] = $brand[0];
} else {
  $pre_repair_inspection[0]['brand'] = array(
    "id" => 0,
    "name" => 'N/A'
  );
}

$article = $con->getData("SELECT id, name FROM articles WHERE id = ".$machinery_equipment[0]['article_id']);
$pre_repair_inspection[0]['article'] = $article[0];

if($pre_repair_inspection[0]['equipment_id'] != null) {
  $serial_number = $con->getData("SELECT * FROM parts_serial_number WHERE machinery_equipment_id = ".$pre_repair_inspection[0]['equipment_id']);
  $pre_repair_inspection[0]['serial_number'] = $serial_number;
}

header("Content-Type: application/json");
echo json_encode($pre_repair_inspection[0]);

?> 
