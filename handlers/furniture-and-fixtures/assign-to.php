<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

session_start();

$con = new pdo_db("machinery_equipment_pars");

$session_user_id = $_SESSION['id'];
$assign_to = $_POST['assignTo'];
$furniture_fixtures = $_POST['furnitureAndFixture'];

$accountable_officer = $assign_to['accountable_officer']['id'];
$office_id = $assign_to['accountable_officer']['office_id'];
$equipment_id = $furniture_fixtures['id'];

$par_year = date('Y', strtotime($assign_to['par_date']));
$par_month = date('m', strtotime($assign_to['par_date']));
$new_date = date('Y-m-d', strtotime($assign_to['par_date']));

if($furniture_fixtures['carrying_amount']  >= 50000) {
	$form_type = 'PAR';
} else {
	$form_type = 'ICS';
}

$check_par_number_year = $con->getData("SELECT * FROM par_number WHERE par_year = $par_year AND type_no = '$form_type' ORDER BY id DESC LIMIT 1");

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

$assign_to['par_date'] = (isset($assign_to['par_date']))?date("Y-m-d",strtotime($assign_to['par_date'])):NULL;

if($furniture_fixtures['carrying_amount']  >= 50000) {
	$form_number = $par_number_incremental_result;
} else {
	$form_number = 'ICS-'.$par_number_incremental_result;
}

// var_dump($form_number); exit();

// if ($assign_to['id']) {
	
// 	$assign_to['updated_by'] = $session_user_id;
// 	$assign_to = $con->updateObj($assign_to,'id');

// } else {
	
	unset($assign_to['office_id']);
	unset($assign_to['office']);
	// $assign_to['par_date'] = $new_date;
	// $assign_to['par_no'] = $form_number;
	// $assign_to['office_id'] = $assign_to['accountable_officer']['office_id'];
	// $assign_to['form_type'] = $form_type;
	// $assign_to['added_by'] = $session_user_id;
	// $assign_to = $con->insertObj($assign_to);
	// $par_id = $con->insertId;

	$con->table = "machinery_equipment_pars";
	$machinery_equipment_pars = array (
		"par_date"=> $new_date,
		"par_no"=> $form_number,
		"office_id"=> $assign_to['accountable_officer']['office_id'],
		"form_type"=> $form_type,
		"added_by"=> $session_user_id,
		"accountable_officer"=> $assign_to['accountable_officer']['id'],
	);
	$con->insertData($machinery_equipment_pars);
	$par_id = $con->insertId;

	$con->table = "par_number";
	$par_number = array (
		"par_year"=> $par_year,
		"serial_number"=> $computed,
		"type_no"=> $form_type,
	);
	$con->insertData($par_number);
	$id = $con->insertId;
	
	$con->table = "ptr_number";
	$ptr_number = array (
		"ptr_year"=> $par_year,
		"serial_number"=> $computed,
		"type_no"=> $form_type,
	);
	$con->insertData($ptr_number);
	$id_ptr = $con->insertId;


	// var_dump($accountable_officer); exit();
	
	$con->table = "par_machinery_equipment";
	$par_machinery_equipment = array (
		"par_id"=> $par_id,
		"accountable_officer"=> $accountable_officer,
		"office_id"=> $office_id,
		"equipment_id"=> $equipment_id,
		"equipment_description"=> 'Furniture and Fixture',
		"status"=> $form_type,
		"created_by"=> $session_user_id,
	);
	$con->insertData($par_machinery_equipment);

		// Equipment History
	$con->table = "equipment_history";
	$equipment_history = array (
		"par_id"=>$par_id,
		"equipment_id"=>$equipment_id,
		"equipment_description"=>'Furniture and Fixture',
		"accountable_officer"=>$accountable_officer,
		"office_id"=>$office_id,
		"operation"=>$form_type,
		"operation_description"=>'PPE has been assign to',
		"color_code"=>'primary',
		"show_highlight"=>'true',
		"created_by"=>$session_user_id,
	);
	$con->insertData($equipment_history);

	$sql = "UPDATE furniture_and_fixtures SET status = 'Not Available' WHERE id = $equipment_id";
	$con->query($sql);

	// History
	$con->table = "history";
	$history = array (
		"user_id"=>$session_user_id,
		"module_id"=>$par_id,
		"description"=>"Assigned a Furniture/Fixture",
		"action_name"=>$form_type,
		"module_name"=>$form_type,
		"action_data"=>$par_number_incremental_result,
	);
	$con->insertData($history);

	// Notification
	$con->table = "notifications";
	$notification = array (
		"user_id"=>$session_user_id,
		"module_id"=>$par_id,
		"module_name"=>$form_type,
		"description"=>"assigned a Furniture/Fixture with '.$form_type.' number - '$par_number_incremental_result'",
		"for_user"=>"SUPER ADMIN",
		"dismiss"=>0,
	);
	$con->insertData($notification);

// }

echo $par_id;

?>