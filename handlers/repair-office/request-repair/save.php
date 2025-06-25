<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

$con = new pdo_db("repair_history");

date_default_timezone_set('Asia/Manila');
session_start();

$session_user_id = $_SESSION['id'];
$repair = $_POST['repair'];
var_dump($repair); exit();
$accountable_officer = $repair['accountable_officer'];
$office_id = $repair['office_id']['office_id'];
$equipment_id = $repair['equipment_id'];

$new_date = (isset($repair['repair_date']))?date("Y-m-d",strtotime($repair['repair_date'] . ' +1 day')):NULL;

$repair['remarks'] = 'REPAIRED';

$sql = "UPDATE par_machinery_equipment SET status = 'PAR', created_by = '$session_user_id' WHERE equipment_id = $repair[equipment_id] AND status = 'RETURNED'";
$con->query($sql);

$sql = "UPDATE par_machinery_equipment SET status = 'REPAIRED', created_by = '$session_user_id' WHERE equipment_id = $repair[equipment_id] AND status = 'Repair'";
$con->query($sql);

if ($repair['id']!=0) {
	
	unset($repair['id']);
	unset($repair['office_id']);
	unset($repair['office_name']);
	unset($repair['machinery_equipment']);

	$repair['par_id'] = $repair['par_id'];
	$repair['repair_date'] = $new_date;
	$repair['accountable_officer'] = $repair['accountable_officer'];
	$repair = $con->insertObj($repair);
	$id = $con->insertId;

} else {

	
}

// Equipment History
$con->table = "equipment_history";
$equipment_history = array (
	"equipment_id"=>$equipment_id,
	"equipment_description"=>$repair['equipment_description'],
	"accountable_officer"=>$accountable_officer,
	"office_id"=>$office_id,
	"operation"=>'REPAIRED',
	"operation_description"=>'Item has been REPAIRED',
	"color_code"=>'success',
	"created_by"=>$session_user_id,
);
$con->insertData($equipment_history);

// History
$con->table = "history";
$history = array (
  "user_id"=>$session_user_id,
  "module_id"=>$id,
  "description"=>"A repair form was added.",
	"action_name"=>"REPAIR",
  "module_name"=>"REPAIRS",
);
$con->insertData($history);

?>