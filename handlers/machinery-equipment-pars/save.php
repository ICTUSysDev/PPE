<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';
date_default_timezone_set('Asia/Manila');
session_start();

$con = new pdo_db("machinery_equipment_pars");

$session_user_id = $_SESSION['id'];
$machinery_equipment_par = $_POST['machineryEquipmentPar'];
$tab_id = $_POST['tabId'];

$machinery_equipment_data = $_POST['machineryEquipmentData'];
$office_id = $_POST['machineryEquipmentPar']['accountable_officer']['office_id'];
$accountable_officer = $_POST['machineryEquipmentPar']['accountable_officer']['id'];
$accountable_officer_name = $_POST['machineryEquipmentPar']['accountable_officer']['name'];

$par_year = date('Y', strtotime($machinery_equipment_par['par_date']));
$par_month = date('m', strtotime($machinery_equipment_par['par_date']));
$new_date = date('Y-m-d', strtotime($machinery_equipment_par['par_date']));

if($tab_id == 'parList') {
	$type_no = 'PAR';
} else {
	$type_no = 'ICS';
}

$check_par_number_year = $con->getData("SELECT * FROM par_number WHERE par_year = $par_year AND type_no = '$type_no' ORDER BY id DESC LIMIT 1");

if(isset($check_par_number_year[0]['serial_number'])) {

	$format = $par_year."-".$check_par_number_year[0]['serial_number'];

} else {

	$zero_no = '0000';

	$format = $par_year	."-".$zero_no;

}

$next_par_number_incremental = $format;
preg_match_all("/\d+/", $next_par_number_incremental, $matches);
$year_par_number_incremental = $matches[0][0].$matches[0][1];

$next_par_number_incremental = $year_par_number_incremental + 1;
$computed = substr($next_par_number_incremental, 4);

$par_number_incremental_result = $par_year."-".$par_month."-".$computed;

if($type_no == 'ICS') {
	$final_par_number = 'ICS'.'-'.$par_number_incremental_result;
} else {
	$final_par_number = $par_number_incremental_result;
}

$machinery_equipment_par['par_date'] = (isset($machinery_equipment_par['par_date']))?date("Y-m-d",strtotime($machinery_equipment_par['par_date'])):NULL;

if ($machinery_equipment_par['id']) {
	
	$machinery_equipment_par['updated_by'] = $session_user_id;
	$machinery_equipment_par = $con->updateObj($machinery_equipment_par,'id');

} else {
	
	unset($machinery_equipment_par['office_id']);
	$machinery_equipment_par['par_date'] = $new_date;
	$machinery_equipment_par['par_no'] = $final_par_number;
	$machinery_equipment_par['office_id'] = $office_id;
	$machinery_equipment_par['form_type'] = $type_no;
	$machinery_equipment_par['added_by'] = $session_user_id;
	$machinery_equipment_par = $con->insertObj($machinery_equipment_par);

	$con->table = "par_number";
	$par_number = array (
		"par_year"=> $par_year,
		"serial_number"=> $computed,
		"type_no"=> $type_no,
	);
	$con->insertData($par_number);
	$id = $con->insertId;
	
	$con->table = "ptr_number";
	$ptr_number = array (
		"ptr_year"=> $par_year,
		"serial_number"=> $computed,
		"type_no"=> $type_no,
	);
	$con->insertData($ptr_number);
	$id_ptr = $con->insertId;
}

$con->table = "par_machinery_equipment";
foreach ($machinery_equipment_data as $med) {

$check = $con->getData("SELECT * FROM par_machinery_equipment WHERE par_id = $id AND equipment_id = $med[id] AND equipment_description = '$med[description]'");

if ($check) { # update

	$t_id = $check[0]['id'];

	$t = array(
		"id"=>$t_id,
		"par_id"=>$id,
		"equipment_id"=>$med['id'],
	);
	$con->updateData($t,'id');
	
} else { # new

	$con->table = "par_machinery_equipment";
	$t = array(
		"par_id"=>$id,
		"accountable_officer"=>$accountable_officer,
		"office_id"=>$office_id,
		"equipment_id"=>$med['id'],
		"equipment_description"=>$med['description'],
		"status"=>$type_no,
		"created_by"=>$session_user_id
	);
	$con->insertData($t);

	// Equipment History
	$con->table = "equipment_history";
	$equipment_history = array (
		"par_id"=>$id,
		"equipment_id"=>$med['id'],
		"equipment_description"=>$med['description'],
		"accountable_officer"=>$accountable_officer,
		"office_id"=>$office_id,
		"operation"=>$type_no,
		"operation_description"=>'PPE has been assigned to',
		"color_code"=>'primary',
		"show_highlight"=>'true',
		"created_by"=>$session_user_id,
	);
	$con->insertData($equipment_history);

	if($med['description'] == 'Machinery Equipment') {
		
		$sql = "UPDATE machinery_equipment SET status = 'Not Available' WHERE id = $med[id]";
		$con->query($sql);

	} else if($med['description'] == 'Building and Structures') {

		$sql = "UPDATE building_and_structures SET status = 'Not Available' WHERE id = $med[id]";
		$con->query($sql);

	} else if($med['description'] == 'Furniture and Fixture') {

		$sql = "UPDATE furniture_and_fixtures SET status = 'Not Available' WHERE id = $med[id]";
		$con->query($sql);

	} else if($med['description'] == 'Infrastructure Assets') {

		$sql = "UPDATE infrastructure_assets SET status = 'Not Available' WHERE id = $med[id]";
		$con->query($sql);

	} else if($med['description'] == 'Land and Land Improvements') {
		
		$sql = "UPDATE land_and_land_improvements SET status = 'Not Available' WHERE id = $med[id]";
		$con->query($sql);

	}
	
}
}

// History
$con->table = "history";
$history = array (
  "user_id"=>$session_user_id,
  "module_id"=>$id,
  "description"=>"assigned an equipment",
	"action_name"=>$type_no,
  "module_name"=>$type_no,
  "action_data"=>$final_par_number,
);
$con->insertData($history);

// Notification
$con->table = "notifications";
$notification = array (
	"user_id"=>$session_user_id,
	"module_id"=>$id,
	"module_name"=>$type_no,
	"description"=>"assigned an equipment with '$type_no' number - '$par_number_incremental_result'",
	"for_user"=>"SUPER ADMIN",
	"dismiss"=>0,
);
$con->insertData($notification);

echo $id;
?>