<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

$con = new pdo_db("pre_repair_inspection");

date_default_timezone_set('Asia/Manila');
session_start();

$session_user_id = $_SESSION['id'];
$repair_office = $_POST['repairOffice'];


$get_par_data = $con->getData("SELECT id, par_id, accountable_officer, equipment_id FROM par_machinery_equipment WHERE status = 'PAR' AND equipment_id = ".$repair_office['equipment_id']);

$action_data = $repair_office['machinery_equipment']['property_number'];
$repair_date = $repair_office['date_finish'];

var_dump($get_par_data[0]['par_id']); exit();
$get_par_id = $get_par_data[0]['par_id'];
$get_accountable_officer = $get_par_data[0]['accountable_officer'];
$get_equipment_id = $get_par_data[0]['equipment_id'];

$date_released = $repair_office['date_released'];
$converted_date = new DateTime($date_released);
$formatted_date = $converted_date->format('Y-m-d H:i:s');

$date_started = $repair_office['date_started'];
$converted_date_started = new DateTime($date_started);
$formatted_date_started = $converted_date_started->format('Y-m-d H:i:s');

$date_finish = $repair_office['date_finish'];
$converted_date_finish = new DateTime($date_finish);
$formatted_date_finish = $converted_date_finish->format('Y-m-d H:i:s');

// var_dump($get_accountable_officer); exit();

if(isset($repair_office['serial_number']['serial_number'])) {
	$serial_number = $repair_office['serial_number']['serial_number'];
} else {
	$serial_number = 'N/A';
}

if ($repair_office['id']) {

	unset($repair_office['accountable_officer']);
	unset($repair_office['remarks']);
	unset($repair_office['status']);
	unset($repair_office['requested_by']);
	unset($repair_office['approved_by']);
	unset($repair_office['machinery_equipment']);
	unset($repair_office['brand']);
	unset($repair_office['article']);
	
	$repair_office['serial_number'] = $serial_number;
	$repair_office['date_released'] = $formatted_date;
	$repair_office['date_started'] = $formatted_date_started;
	$repair_office['date_finish'] = $formatted_date_finish;
	
	$sql = "UPDATE machinery_equipment SET status = 'DONE' WHERE id = ".$repair_office['equipment_id'];
	$con->query($sql);

	$wording = 'Updated';
	$id = $repair_office['id'];
	$repair_office = $con->updateObj($repair_office,'id');

} else {

	unset($repair_office['accountable_officer']);
	unset($repair_office['remarks']);
	unset($repair_office['status']);
	unset($repair_office['requested_by']);
	unset($repair_office['approved_by']);
	unset($repair_office['machinery_equipment']);
	unset($repair_office['brand']);
	unset($repair_office['article']);

	$wording = 'Added';
	$repair_office['date_started'] = $formatted_date_started;
	$repair_office['date_finish'] = $formatted_date_finish;
	$repair_office['date_released'] = $formatted_date;
	$repair_office['serial_number'] = $serial_number;
	
	$insert = $con->insertObj($repair_office);
	$id = $con->insertId;
	
}

// History
$con->table = "history";
$history = array (
  "user_id"=>$session_user_id,
  "module_id"=>$id,
  "description"=>"Pre-repair Inspection $wording",
	"action_name"=>"REPAIR",
  "module_name"=>'MACHINERY EQUIPMENT',
  "action_data"=>$action_data
);
$con->insertData($history);

echo $id;

?>