<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../../../db.php';

$con = new pdo_db("machinery_equipment");

session_start();

$session_user_id = $_SESSION['id'];

$equipment_id = $_POST['equipmentId'];

$sql = "UPDATE machinery_equipment SET status = 'Not Available' WHERE id = ".$equipment_id['equipment_id'];
$con->query($sql);

$sql = "UPDATE pre_repair_requests SET status_release = 1 WHERE id = ".$equipment_id['id'];
$con->query($sql);

$date_release = date("Y-m-d H:i:s");

$sql = "UPDATE repair_history SET date_release = '$date_release' WHERE status_release = 0 AND equipment_id = ".$equipment_id['equipment_id'];
$con->query($sql);

usleep(500);

$sql = "UPDATE repair_history SET status_release = 1, remarks = 'REPAIRED' WHERE equipment_id = ".$equipment_id['equipment_id'];
$con->query($sql);

// // Equipment History
$con->table = "equipment_history";
$equipment_history = array (
	"par_id"=>$equipment_id['par_id'],
	"equipment_id"=>$equipment_id['equipment_id'],
	"equipment_description"=>'Machinery Equipment',
	"accountable_officer"=>$equipment_id['accountable_officer'],
	"office_id"=>$equipment_id['requested_by']['office_id'],
	"operation"=>'REPAIRED',
	"operation_description"=>'Item has been REPAIRED',
	"color_code"=>'success',
	"created_by"=>$session_user_id,
);
$con->insertData($equipment_history);

// // History
$con->table = "history";
$history = array (
  "user_id"=>$session_user_id,
  "module_id"=>$equipment_id['id'],
  "description"=>"Equipment Repaired",
	"action_name"=>"REPAIRED",
  "module_name"=>"MACHINERY EQUIPMENT",
  "action_data"=>$equipment_id['machinery_equipment']['property_number'],
);
$con->insertData($history);

?>