<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../../db.php';

session_start();

$con = new pdo_db();

$waste_materials = $con->getData("SELECT * FROM waste_materials WHERE pre_repair_id = $_POST[id]");

$signatories = $con->getData("SELECT id, code, CONCAT(first_name, ' ', last_name) AS name FROM signatories WHERE code IN('Property Custodian', 'PGSO')");

foreach($waste_materials as $key => $wm) {
  
  $waste_materials[$key]['list_no']=$key+1;

}
$data = [
  'waste_materials' => $waste_materials,
  'signatories' => $signatories,
];
header("Content-Type: application/json");
echo json_encode($data);

?> 
