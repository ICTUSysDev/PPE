<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../../db.php';

$con = new pdo_db("pre_repair_inspection");

session_start();

$session_user_id = $_SESSION['id'];
$equipment_id = $_POST['approvedId'];

$sql = "UPDATE pre_repair_requests SET status = 0, approved_by = '$session_user_id' WHERE equipment_id = $equipment_id AND status = 1";
$con->query($sql);

$con->table = "pre_repair_inspection";
$pre_repair_inspection = array (
	"equipment_id"=>$equipment_id,
);
$con->insertData($pre_repair_inspection);

// Equipment History
// $con->table = "equipment_history";
// $equipment_history = array (
// 	"par_id"=>$repair_id,
// 	"equipment_id"=>$equipment_id,
// 	"equipment_description"=>$equipment_description,
// 	"accountable_officer"=>$accountable_officer,
// 	"office_id"=>$office_id,
// 	"operation"=>'REPAIRED',
// 	"operation_description"=>'Item has been REPAIRED',
// 	"color_code"=>'success',
// 	"created_by"=>$session_user_id,
// );
// $con->insertData($equipment_history);

// History
// $con->table = "history";
// $history = array (
//   "user_id"=>$session_user_id,
//   "module_id"=>$equipment_id,
//   "description"=>"A repair form was added.",
//   "action_name"=>"REPAIRED",
//   "module_name"=>strtoupper($equipment_description),
//   "action_data"=>$repair_details['machinery_equipment']['property_number'],
// );
// $con->insertData($history);

?>
