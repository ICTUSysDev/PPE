<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../../db.php';

session_start();

$con = new pdo_db("machinery_equipment_pars");

$session_user_id = $_SESSION['id'];
$machinery_equipment_transfer = $_POST['machineryEquipmentTransfer'];
$office_id = $_POST['machineryEquipmentTransfer']['accountable_officer']['office_id'];
$purpose = $_POST['machineryEquipmentTransfer']['purpose'];
$accountable_officer = $_POST['machineryEquipmentTransfer']['accountable_officer']['id'];
$machinery_equipment_data_transfer = $_POST['machineryEquipmentData'];


$ptr_year = date('Y', strtotime($machinery_equipment_transfer['par_date']));
$ptr_month = date('m', strtotime($machinery_equipment_transfer['par_date']));

if($machinery_equipment_transfer['purpose'] == 'DONATION') {
	
	$new_accountable_officer = 0;
	$office_id = $_POST['machineryEquipmentTransfer']['accountable_officer']['office_id'];
	$operation_description = 'Item has been DONATED';
	$show_highlight = 'false';
	$color_code = 'warning';
	$form_type = 'DONATION';
	$type_no = 'PAR';
	
	} else if($machinery_equipment_transfer['form_type'] == 'ICS') {

		$new_accountable_officer = $_POST['machineryEquipmentTransfer']['new_accountable_officer']['id'];
		$office_id = $_POST['machineryEquipmentTransfer']['new_accountable_officer']['office_id'];
		$operation_description = 'Item has been REASSIGNED/RELOCATE';
		$show_highlight = 'true';
		$color_code = 'warning';
		$form_type = 'TRANSFER/REASSIGN ICS';
		$type_no = 'ICS';

	} else if($machinery_equipment_transfer['form_type'] == 'TRANSFER/REASSIGN ICS') {
	
		$new_accountable_officer = $_POST['machineryEquipmentTransfer']['new_accountable_officer']['id'];
		$office_id = $_POST['machineryEquipmentTransfer']['new_accountable_officer']['office_id'];
		$operation_description = 'Item has been REASSIGNED/RELOCATE';
		$show_highlight = 'true';
		$color_code = 'warning';
		$form_type = 'TRANSFER/REASSIGN ICS';
		$type_no = 'ICS';
	
	} else {
	
		$new_accountable_officer = $_POST['machineryEquipmentTransfer']['new_accountable_officer']['id'];
		$office_id = $_POST['machineryEquipmentTransfer']['new_accountable_officer']['office_id'];
		$operation_description = 'Item has been REASSIGNED/RELOCATE';
		$show_highlight = 'true';
		$color_code = 'warning';
		$form_type = 'TRANSFERRED/REPAR';
		$type_no = 'PAR';
	
	}

$check_ptr_number_year = $con->getData("SELECT * FROM ptr_number WHERE ptr_year = $ptr_year AND type_no = 'PTR' ORDER BY id DESC LIMIT 1");
$check_par_number_year = $con->getData("SELECT * FROM par_number WHERE par_year = $ptr_year AND type_no = '$type_no' ORDER BY id DESC LIMIT 1");

if(isset($check_ptr_number_year[0]['serial_number'])) {

	$format_ptr = $ptr_year."-".$check_ptr_number_year[0]['serial_number'];

} else {

	$zero_no = '0000';

	$format_ptr = $ptr_year	."-".$zero_no;
}

if(isset($check_par_number_year[0]['serial_number'])) {

	$format_par = $ptr_year."-".$check_par_number_year[0]['serial_number'];

} else {

	$zero_no = '0000';

	$format_par = $ptr_year	."-".$zero_no;
}


$next_par_number_incremental = $format_par;
preg_match_all("/\d+/", $next_par_number_incremental, $matches_par);
$year_par_number_incremental = $matches_par[0][0].$matches_par[0][1];

$next_par_number_incremental = $year_par_number_incremental + 1;
$computed_par = substr($next_par_number_incremental, 4);

$par_number_incremental_result = $ptr_year."-".$ptr_month."-".$computed_par;

$machinery_equipment_newpar['par_date'] = (isset($machinery_equipment_newpar['par_date']))?date("Y-m-d",strtotime($machinery_equipment_newpar['par_date'])):NULL;

$next_ptr_number_incremental = $format_ptr;
preg_match_all("/\d+/", $next_ptr_number_incremental, $matches_ptr);
$year_ptr_number_incremental = $matches_ptr[0][0].$matches_ptr[0][1];

$next_ptr_number_incremental = $year_ptr_number_incremental + 1;
$computed_ptr = substr($next_ptr_number_incremental, 4);

$ptr_number_incremental_result = "PTR"."-".$ptr_year."-".$ptr_month."-".$computed_ptr;

$machinery_equipment_transfer['par_date'] = (isset($machinery_equipment_transfer['par_date']))?date("Y-m-d",strtotime($machinery_equipment_transfer['par_date'])):NULL;

if($machinery_equipment_transfer['form_type'] == 'ICS') {
	$par_number_incremental_result_final = 'ICS'.'-'.$par_number_incremental_result;
} else if($machinery_equipment_transfer['form_type'] == 'TRANSFER/REASSIGN ICS'){
	$par_number_incremental_result_final = 'ICS'.'-'.$par_number_incremental_result;
} else {
	$par_number_incremental_result_final = $par_number_incremental_result;
}

if ($machinery_equipment_transfer['id']) {
	
	unset($machinery_equipment_transfer['id']);
	unset($machinery_equipment_transfer['purpose']);
	unset($machinery_equipment_transfer['accountable_officer']);
	unset($machinery_equipment_transfer['new_accountable_officer']);

	$machinery_equipment_transfer['accountable_officer'] = $new_accountable_officer;
	$machinery_equipment_transfer['par_no'] = $par_number_incremental_result_final;
	$machinery_equipment_transfer['ptr_no'] = $ptr_number_incremental_result;
	$machinery_equipment_transfer['office_id'] = $office_id;
	$machinery_equipment_transfer['form_type'] = $form_type;
	$machinery_equipment_transfer['added_by'] = $session_user_id;
	$machinery_equipment_transfer = $con->insertObj($machinery_equipment_transfer);
	$id = $con->insertId;

	$con->table = "par_number";
	$par_number = array (
		"par_year"=> $ptr_year,
		"serial_number"=> $computed_par,
		"type_no"=> $type_no,
	);
	$con->insertData($par_number);
	$id_par = $con->insertId;

	$con->table = "ptr_number";
	$ptr_number = array (
		"ptr_year"=> $ptr_year,
		"serial_number"=> $computed_ptr,
		"type_no"=> 'PTR',
	);
	$con->insertData($ptr_number);
	$id_ptr = $con->insertId;

} else {


}

$con->table = "par_machinery_equipment";
foreach ($machinery_equipment_data_transfer as $medt) {


		$con->table = "par_machinery_equipment";
		$t = array(
			"par_id"=>$id_par,
			"accountable_officer"=>$new_accountable_officer,
			"prev_accountable_officer"=>$accountable_officer,
			"office_id"=>$office_id,
			"equipment_id"=>$medt['equipment_id'],
			"equipment_description"=>$medt['equipment_description'],
			"status"=>$purpose,
			"created_by"=>$session_user_id
		);
		$con->insertData($t);
		$pme_id = $con->insertId;

		// Equipment History
		$con->table = "equipment_history";
		$equipment_history = array (
			"par_id"=>$id_par,
			"equipment_id"=>$medt['equipment_id'],
			"accountable_officer"=>$new_accountable_officer,
			"equipment_description"=>$medt['equipment_description'],
			"office_id"=>$office_id,
			"operation"=>'TRANSFERRED',
			"operation_description"=>$operation_description .' for '. $purpose .' - ',
			"color_code"=>$color_code,
			"show_highlight"=>'true',
			"created_by"=>$session_user_id,
		);
		$con->insertData($equipment_history);
		
		$sql = "UPDATE par_machinery_equipment SET status = 'TRANSFERRED', created_by = '$session_user_id' WHERE id = $medt[id]";
		$con->query($sql);
		
		 if($purpose == 'DONATION') {
			$sql = "UPDATE machinery_equipment SET status = 'DONATED' WHERE id = $medt[equipment_id]";
			$con->query($sql);
		}

}

// History
$con->table = "history";
$history = array (
  "user_id"=>$session_user_id,
  "module_id"=>$id_par,
  "description"=>"Transferred equipment",
	"action_name"=>$type_no,
  "module_name"=>"TRANSFER",
  "action_data"=>$ptr_number_incremental_result,
);
$con->insertData($history);

// Notification
$con->table = "notifications";
$notification = array (
	"user_id"=>$session_user_id,
	"module_id"=>$id_par,
	"module_name"=>"TRANSFERRED",
	"purpose"=>$purpose,
	"description"=>"TRANSFERRED Equipment",
	"for_user"=>"SUPER ADMIN",
	"dismiss"=>0,
);
$con->insertData($notification);

echo $id;
?>