<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../../../db.php';

$con = new pdo_db("pre_repair_inspection");

session_start();

$session_user_id = $_SESSION['id'];
$equipment_id = $_POST['approvedId'];
$par_id = $_POST['par_id'];

// var_dump($par_id['id']); exit();

$get_office = $con->getData("SELECT id, office_id FROM users WHERE id = ".$par_id['accountable_officer']);

$sql = "UPDATE pre_repair_requests SET status_approve = 0, approved_by = '$session_user_id' WHERE equipment_id = $equipment_id AND status_approve = 1";
$con->query($sql);

$sql = "UPDATE machinery_equipment SET status = 'APPROVED' WHERE id = $equipment_id";
$con->query($sql);

$con->table = "pre_repair_inspection";
$pre_repair_inspection = array (
	"equipment_id"=>$equipment_id,
	"par_id"=>$par_id['par_id'],
);
$con->insertData($pre_repair_inspection);
$pri_id = $con->insertId;

// Repair History
$con->table = "repair_history";
$repair_history = array (
	"par_id"=>$par_id['par_id'],
	"pri_id"=>$pri_id,
	"accountable_officer"=>$par_id['accountable_officer'],
	"equipment_id"=>$par_id['equipment_id'],
	"remarks"=>'REPAIRING',
	"equipment_description"=>'MACHINERY EQUIPMENT'
);
$con->insertData($repair_history);

// Equipment History
$con->table = "equipment_history";
$equipment_history = array (
	"par_id"=>$par_id['par_id'],
	"equipment_id"=>$par_id['equipment_id'],
	"equipment_description"=>'Machinery Equipment',
	"accountable_officer"=>$par_id['accountable_officer'],
	"office_id"=>$get_office[0]['office_id'],
	"operation"=>'REQUEST REPAIR',
	"operation_description"=>'Item has been Requested for Repair',
	"color_code"=>'success',
	"created_by"=>$session_user_id,
);
$con->insertData($equipment_history);

// History
$con->table = "history";
$history = array (
  "user_id"=>$session_user_id,
  "module_id"=>$par_id['equipment_id'],
  "description"=>"A repair form was added.",
  "action_name"=>"REQUEST REPAIR",
  "module_name"=>'MACHINERY EQUIPMENT',
  "action_data"=>$par_id['ppe_data']['property_number'],
);
$con->insertData($history);

echo $pri_id;

?>
