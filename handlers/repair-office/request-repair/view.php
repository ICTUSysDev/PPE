<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../../db.php';

session_start();

$con = new pdo_db();

$ppe_data = $_POST['ppe_data'];
// $equipment_description = $ppe_data['equipment_description'];

$machinery_equipment = $con->getData("SELECT id, property_number, acquisition_cost, description, brand_id, article_id FROM machinery_equipment WHERE id = ".$ppe_data['equipment_id']);

if($machinery_equipment[0]['brand_id'] != null) {

  $brand = $con->getData("SELECT id, name FROM brands WHERE id = ".$machinery_equipment[0]['brand_id']);
  $machinery_equipment[0]['brand'] = $brand[0];

}

$article = $con->getData("SELECT id, name FROM articles WHERE id = ".$machinery_equipment[0]['article_id']);
$machinery_equipment[0]['article'] = $article[0];

$requested_by = $con->getData("SELECT id, CONCAT(first_name,' ',last_name) fullname, office_id FROM users WHERE id = ".$ppe_data['accountable_officer']);
$machinery_equipment[0]['requested_by'] = $requested_by[0];

$office = $con->getData("SELECT id, name FROM offices WHERE id = ".$requested_by[0]['office_id']);
$machinery_equipment[0]['office'] = $office[0];

$machinery_equipment[0]['remarks'] = $ppe_data['remarks'];

header("Content-Type: application/json");
echo json_encode($machinery_equipment[0]);

?> 
