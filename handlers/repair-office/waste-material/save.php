<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../../db.php';

$con = new pdo_db("waste_materials");

date_default_timezone_set('Asia/Manila');
session_start();

$session_user_id = $_SESSION['id'];
$waste_material = $_POST['wasteMaterial'];
$repair_equipment_id = $_POST['repairEquipmentId'];
$repair_office_id = $_POST['repairOfficeId'];

$repair_amount = $waste_material['amount'];

$get_par_data = $con->getData("SELECT id, par_id, accountable_officer, equipment_id FROM par_machinery_equipment WHERE status = 'PAR' AND equipment_id = $repair_equipment_id");

if ($waste_material['id']) {

	$wording = 'Updated';
	$waste_material['pre_repair_id'] = $_POST['repairOfficeId'];
	$waste_material['equipment_id'] = $_POST['repairEquipmentId'];
	$id = $waste_material['id'];
	$waste_material = $con->updateObj($waste_material,'id');

} else {

	$wording = 'Added';
	$waste_material['pre_repair_id'] = $_POST['repairOfficeId'];
	$waste_material['equipment_id'] = $_POST['repairEquipmentId'];
	$waste_material = $con->insertObj($waste_material);
	$id = $con->insertId;

	$sql = "UPDATE machinery_equipment SET status = 'Not Available' WHERE id = ".$_POST['repairEquipmentId'];
	$con->query($sql);

}

// History
$con->table = "history";
$history = array (
  "user_id"=>$session_user_id,
  "module_id"=>$id,
  "description"=>"$wording a waste material",
	"action_name"=>strtoupper($wording),
  "module_name"=>"WASTE MATERIAL",
);
$con->insertData($history);

?>