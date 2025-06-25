<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

session_start();

$con = new pdo_db("machinery_equipment_pars");

$session_user_id = $_SESSION['id'];
$ics_par = $_POST['icsPar'];
$ics_data = $_POST['icsData'];
$office_id = $_POST['icsPar']['accountable_officer']['office_id'];
$accountable_officer = $_POST['icsPar']['accountable_officer']['id'];
$accountable_officer_name = $_POST['icsPar']['accountable_officer']['name'];

$par_year = date('Y', strtotime($ics_par['par_date']));
$par_month = date('m', strtotime($ics_par['par_date']));
$new_date = date('Y-m-d', strtotime($ics_par['par_date'] . ' +1 day'));

$check_par_number_year = $con->getData("SELECT * FROM par_number WHERE par_year = $par_year AND type_no = 'ICS' ORDER BY id DESC LIMIT 1");
$check_ptr_number_year = $con->getData("SELECT * FROM ptr_number WHERE ptr_year = $par_year AND type_no = 'PTR' ORDER BY id DESC LIMIT 1");

if(isset($check_par_number_year[0]['serial_number'])) {

	$format = $par_year."-".$check_par_number_year[0]['serial_number'];

} else {

	$zero_no = '0000';

	$format = $par_year	."-".$zero_no;

}

if(isset($check_ptr_number_year[0]['serial_number'])) {

	$format_ptr = $par_year."-".$check_ptr_number_year[0]['serial_number'];

} else {

	$zero_no = '0000';

	$format_ptr = $par_year	."-".$zero_no;
}

$next_par_number_incremental = $format;
preg_match_all("/\d+/", $next_par_number_incremental, $matches);
$year_par_number_incremental = $matches[0][0].$matches[0][1];

$next_par_number_incremental = $year_par_number_incremental + 1;
$computed = substr($next_par_number_incremental, 4);

$par_number_incremental_result = "ICS"."-".$par_year."-".$par_month."-".$computed;

$next_ptr_number_incremental = $format_ptr;
// var_dump($next_ptr_number_incremental); exit();
preg_match_all("/\d+/", $next_ptr_number_incremental, $matches_ptr);
$year_ptr_number_incremental = $matches_ptr[0][0].$matches_ptr[0][1];

$next_ptr_number_incremental = $year_ptr_number_incremental + 1;
$computed_ptr = substr($next_ptr_number_incremental, 4);

$ptr_number_incremental_result = "PTR"."-".$par_year."-".$par_month."-".$computed_ptr;

$ics_par['par_date'] = (isset($ics_par['par_date']))?date("Y-m-d",strtotime($ics_par['par_date'])):NULL;

if ($ics_par['id']) {
	
	$ics_par['updated_by'] = $session_user_id;
	$ics_par = $con->updateObj($ics_par,'id');
	$id = $con->insertId;
} else {

	$ics_par['par_date'] = $new_date;
	$ics_par['par_no'] = $par_number_incremental_result;
	$ics_par['office_id'] = $office_id;
	$ics_par['form_type'] = 'ICS';
	$ics_par['added_by'] = $session_user_id;
	$ics_par = $con->insertObj($ics_par);
	$id = $con->insertId;

	$con->table = "par_number";
	$par_number = array (
		"par_year"=> $par_year,
		"serial_number"=> $computed,
		"type_no"=> 'ICS'
	);
	$con->insertData($par_number);
	$id_par = $con->insertId;

	$con->table = "ptr_number";
	$ptr_number = array (
		"ptr_year"=> $par_year,
		"serial_number"=> $computed_ptr,
		"type_no"=> 'ICS',
	);
	$con->insertData($ptr_number);
	$id_ptr = $con->insertId;

}

$con->table = "par_machinery_equipment";
foreach ($ics_data as $med) {

$check = $con->getData("SELECT * FROM par_machinery_equipment WHERE par_id = $id_par AND equipment_id = $med[id] AND equipment_description = '$med[description]'");

if ($check) { # update

	$t_id = $check[0]['id'];

	$t = array(
		"id"=>$t_id,
		"par_id"=>$id_par,
		"equipment_id"=>$med['id'],
	);
	$con->updateData($t,'id');
	
} else { # new

	$con->table = "par_machinery_equipment";
	$t = array(
		"par_id"=>$id_par,
		"accountable_officer"=>$accountable_officer,
		"office_id"=>$office_id,
		"equipment_id"=>$med['id'],
		"equipment_description"=>$med['description'],
		"status"=>'ICS',
		"created_by"=>$session_user_id
	);
	$con->insertData($t);

	// Equipment History
	$con->table = "equipment_history";
	$equipment_history = array (
		"par_id"=>$id_par,
		"equipment_id"=>$med['id'],
		"equipment_description"=>$med['description'],
		"accountable_officer"=>$accountable_officer,
		"office_id"=>$office_id,
		"operation"=>'ICS',
		"operation_description"=>'Item has been ICS to',
		"color_code"=>'primary',
		"show_highlight"=>'true',
		"created_by"=>$session_user_id,
	);
	$con->insertData($equipment_history);

	
	$sql = "UPDATE machinery_equipment SET status = 'Not Available' WHERE id = $med[id]";
	$con->query($sql);
	
	$sql = "UPDATE building_and_structures SET status = 'Not Available' WHERE id = $med[id]";
	$con->query($sql);
	
	$sql = "UPDATE furniture_and_fixtures SET status = 'Not Available' WHERE id = $med[id]";
	$con->query($sql);
	
	$sql = "UPDATE infrastructure_assets SET status = 'Not Available' WHERE id = $med[id]";
	$con->query($sql);
	
	$sql = "UPDATE land_and_land_improvements SET status = 'Not Available' WHERE id = $med[id]";
	$con->query($sql);
	
}
}

// History
$con->table = "history";
$history = array (
  "user_id"=>$session_user_id,
  "module_id"=>$id,
  "description"=>"Added an ICS",
	"action_name"=>"PAR",
  "module_name"=>"ICS PAR",
	"action_data"=>$par_number_incremental_result,
);
$con->insertData($history);

// Notification
$con->table = "notifications";
$notification = array (
	"user_id"=>$session_user_id,
	"module_id"=>$id_par,
	"module_name"=>"ICS PAR",
	"description"=>"Added ICS with ICS number - '$par_number_incremental_result'",
	"for_user"=>"SUPER ADMIN",
	"dismiss"=>0,
);
$con->insertData($notification);

echo $id;

?>