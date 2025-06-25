<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

session_start();

$con = new pdo_db("machinery_equipment_pars");

$session_user_id = $_SESSION['id'];
$machinery_equipment_newpar = $_POST['machineryEquipmentNewpar'];
$machinery_equipment_data_newpar = $_POST['machineryEquipmentDataNewpar'];
$office_id = $_POST['machineryEquipmentNewpar']['new_accountable_officer']['office_id'];
$new_accountable_officer = $_POST['machineryEquipmentNewpar']['new_accountable_officer']['id'];
$accountable_officer = $_POST['machineryEquipmentNewpar']['accountable_officer']['id'];
$accountable_officer_name = $_POST['machineryEquipmentNewpar']['accountable_officer']['name'];

$par_year = date('Y', strtotime($machinery_equipment_newpar['par_date']));
$par_month = date('m', strtotime($machinery_equipment_newpar['par_date']));

$check_par_number_year = $con->getData("SELECT * FROM par_number WHERE par_year = $par_year AND par_number_type = 'PAR' ORDER BY id DESC LIMIT 1");

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

$machinery_equipment_newpar['par_date'] = (isset($machinery_equipment_newpar['par_date']))?date("Y-m-d",strtotime($machinery_equipment_newpar['par_date'])):NULL;

// var_dump($par_number_incremental_result); exit();

if ($machinery_equipment_newpar['id']) {

	unset($machinery_equipment_newpar['id']);
	unset($machinery_equipment_newpar['new_accountable_officer']);
	unset($machinery_equipment_newpar['office_id']);

	$machinery_equipment_newpar['par_no'] = $par_number_incremental_result;
	$machinery_equipment_newpar['office_id'] = $office_id;
	$machinery_equipment_newpar['accountable_officer'] = $new_accountable_officer;
	$machinery_equipment_newpar['form_type'] = 'REPAR';
	$machinery_equipment_newpar['added_by'] = $session_user_id;
	$machinery_equipment_newpar = $con->insertObj($machinery_equipment_newpar);

	$con->table = "par_number";
	$par_number = array (
		"par_year"=> $par_year,
		"serial_number"=> $computed,
		"par_number_type"=> 'PAR'
	);
	$con->insertData($par_number);
	$id = $con->insertId;

} else {


}

$con->table = "par_machinery_equipment";
foreach ($machinery_equipment_data_newpar as $medn) {


		$con->table = "par_machinery_equipment";
		$t = array(
			"par_id"=>$id,
			"accountable_officer"=>$new_accountable_officer,
			"prev_accountable_officer"=>$accountable_officer,
			"office_id"=>$office_id,
			"equipment_id"=>$medn['equipment_id'],
			"equipment_description"=>$medn['equipment_description'],
			"status"=>'PAR',
			"created_by"=>$session_user_id
		);
		$con->insertData($t);

		// Equipment History
		$con->table = "equipment_history";
		$equipment_history = array (
			"par_id"=>$id,
			"equipment_id"=>$medn['equipment_id'],
			"accountable_officer"=>$new_accountable_officer,
			"equipment_description"=>$medn['equipment_description'],
			"office_id"=>$office_id,
			"operation"=>'REPAR',
			"operation_description"=>'Item has been REPAR to',
			"color_code"=>'dark',
			"show_highlight"=>'true',
			"created_by"=>$session_user_id,
		);
		$con->insertData($equipment_history);
		
		$sql = "UPDATE par_machinery_equipment SET status = 'REPAR', created_by = '$session_user_id' WHERE id = $medn[id]";
		$con->query($sql);
		
		$sql = "UPDATE machinery_equipment_pars SET note = 'Other Machinery and Equipment in this PAR has already REPAR, The PAR number is:' '$par_number_incremental_result' WHERE id = $medn[par_id]";
		$con->query($sql);

}

// History
$con->table = "history";
$history = array (
	"user_id"=>$session_user_id,
	"description"=>"REPAR an Equipment",
);
$con->insertData($history);

// Notification
$con->table = "notifications";
$notification = array (
	"user_id"=>$session_user_id,
	"module_id"=>$id,
	"module_name"=>"REPAR",
	"description"=>"REPAR an Equipment with PAR number - '$par_number_incremental_result'",
	"for_user"=>"SUPER ADMIN",
	"dismiss"=>0,
);
$con->insertData($notification);

?>