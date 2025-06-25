<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../../db.php';
date_default_timezone_set('Asia/Manila');
session_start();

$con = new pdo_db();

// $repair_office = $_POST['repairOffice'];

$pre_repair_inspection = $con->getData("SELECT *, DATE_FORMAT(date_started, '%m/%d/%Y') AS date_started, DATE_FORMAT(date_finish, '%m/%d/%Y') AS date_finish, DATE_FORMAT(date_released, '%m/%d/%Y') AS date_released FROM pre_repair_inspection WHERE id = $_POST[id]");

$repair_history = $con->getData("SELECT id, equipment_id, DATE_FORMAT(date_release, '%M %d, %Y') AS repair_date FROM `repair_history` WHERE equipment_id = ".$pre_repair_inspection[0]['equipment_id']." ORDER BY id DESC LIMIT 1");
$pre_repair_inspection[0]['repair_history'] = $repair_history[0];

$requested_by = $con->getData("SELECT id, accountable_officer FROM `machinery_equipment_pars` WHERE id = ".$pre_repair_inspection[0]['par_id']);
$pre_repair_inspection[0]['requested_by'] = $requested_by[0];

$requested_by = $con->getData("SELECT id, CONCAT(first_name,' ',last_name) as requested_by_user FROM `users` WHERE id = ".$requested_by[0]['accountable_officer']);
$pre_repair_inspection[0]['requested_by']['requested_by_user'] = $requested_by[0];

$noted_by = $con->getData("SELECT id, CONCAT(first_name,' ',middle_name,'. ',last_name) as signatories FROM `signatories` WHERE code = 'PGSO'");
$pre_repair_inspection[0]['noted_by'] = $noted_by[0];

$checked_by = $con->getData("SELECT id, CONCAT(first_name,' ',middle_name,'. ',last_name) as signatories FROM `signatories` WHERE code IN('Property Custodian', 'COMMITTEE ON INSPECTION', 'COMMITTEE ON INSPECTION 1', 'COMMITTEE ON INSPECTION 2', 	'PGSO')");
$pre_repair_inspection[0]['checked_by'] = $checked_by;

$machinery_equipment = $con->getData("SELECT id, property_number, acquisition_cost, description, brand_id, article_id FROM machinery_equipment WHERE id = ".$pre_repair_inspection[0]['equipment_id']);
$pre_repair_inspection[0]['property_number'] = $machinery_equipment[0];
$pre_repair_inspection[0]['acquisition_cost'] = number_format($machinery_equipment[0]['acquisition_cost']);

$brand = $con->getData("SELECT id, name FROM brands WHERE id = ".$machinery_equipment[0]['brand_id']);
$pre_repair_inspection[0]['property_number']['brand'] = $brand[0];

$article = $con->getData("SELECT id, name FROM articles WHERE id = ".$machinery_equipment[0]['article_id']);
$pre_repair_inspection[0]['property_number']['article'] = $article[0];

if(empty($pre_repair_inspection[0]['serial_number'])) {
  $pre_repair_inspection[0]['serial_number'] = array(
    'id' => 0,
    'serial_number' => ''
  );
} else {
  $pre_repair_inspection[0]['serial_number'] = array(
    'id' => 0,
    'serial_number' => $pre_repair_inspection[0]['serial_number'],
  );
}

echo json_encode($pre_repair_inspection[0]);

?> 
