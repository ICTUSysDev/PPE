<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../../db.php';

$con = new pdo_db();

$repair_office_id = $_POST['repairOfficeId'];

$waste_materials = $con->getData("SELECT id, pre_repair_id, quantity, description, amount FROM waste_materials WHERE pre_repair_id = $repair_office_id");

foreach($waste_materials as $key => $waste_material) {

  $waste_materials[$key]['list_no'] = $key+1;

}


header("Content-Type: application/json");
echo json_encode($waste_materials);

?>