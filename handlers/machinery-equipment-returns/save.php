<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

session_start();

$con = new pdo_db("machinery_equipment_pars");

$session_user_id = $_SESSION['id'];
$machinery_equipment_return = $_POST['machineryEquipmentReturn'];
$note = $_POST['machineryEquipmentReturn']['note'];
$purpose = $_POST['machineryEquipmentReturn']['purpose'];
$accountable_officer = $_POST['machineryEquipmentReturn']['accountable_officer']['id'];
$prev_office_id = $_POST['machineryEquipmentReturn']['accountable_officer']['office_id'];
$machinery_equipment_data_return = $_POST['machineryEquipmentDataReturn'];

$new_date = date('Y-m-d');

$par_year = substr($machinery_equipment_return['par_no'], 0, 4);
$serial_number = substr($machinery_equipment_return['par_no'], 8, 12);

if($machinery_equipment_return['purpose'] == 'REPAIR') {
	
$new_accountable_officer = $_POST['machineryEquipmentReturn']['accountable_officer']['id'];
$office_id = $_POST['machineryEquipmentReturn']['accountable_officer']['office_id'];
$operation_description = 'Item has been RETURNED';
$show_highlight = 'false';
$color_code = 'info';

} else {

	$new_accountable_officer = $_POST['machineryEquipmentReturn']['new_accountable_officer']['id'];
	$office_id = $_POST['machineryEquipmentReturn']['new_accountable_officer']['office_id'];
	$operation_description = 'Item has been RETURNED';
	$show_highlight = 'true';
	$color_code = 'danger';

}

if ($machinery_equipment_return['id']) {

	unset($machinery_equipment_return['id']);
	unset($machinery_equipment_return['purpose']);
	unset($machinery_equipment_return['new_accountable_officer']);
	
	$machinery_equipment_return['par_date'] = $new_date;
	$machinery_equipment_return['office_id'] = $office_id;
	$machinery_equipment_return['par_no'] = $machinery_equipment_return['par_no'];
	$machinery_equipment_return['accountable_officer'] = $new_accountable_officer;
	$machinery_equipment_return['form_type'] = 'RETURNED';
	
	$machinery_equipment_return['added_by'] = $session_user_id;
	$machinery_equipment_return = $con->insertObj($machinery_equipment_return);
	$id = $con->insertId;

} else {


}


$con->table = "par_machinery_equipment";
foreach ($machinery_equipment_data_return as $medn) {


		$con->table = "par_machinery_equipment";
		$t = array(
			"par_id"=>$id,
			"accountable_officer"=>$new_accountable_officer,
			"prev_accountable_officer"=>$accountable_officer,
			"office_id"=>$office_id,
			"equipment_id"=>$medn['equipment_id'],
			"equipment_description"=>$medn['equipment_description'],
			"status"=>$purpose,
			"created_by"=>$session_user_id
		);
		$con->insertData($t);
		$pme_id = $con->insertId;

		// Equipment History
		$con->table = "equipment_history";
		$equipment_history = array (
			"par_id"=>$id,
			"equipment_id"=>$medn['equipment_id'],
			"equipment_description"=>$medn['equipment_description'],
			"accountable_officer"=>$new_accountable_officer,
			"office_id"=>$office_id,
			"operation"=>'RETURNED',
			"operation_description"=>$operation_description .' for '. $purpose .' - ',
			"color_code"=>$color_code,
			"show_highlight"=>'true',
			"created_by"=>$session_user_id,
		);
		$con->insertData($equipment_history);
		
		$sql = "UPDATE par_machinery_equipment SET status = 'RETURNED', created_by = '$session_user_id' WHERE id = $medn[id]";
		$con->query($sql);
		
		if($purpose == 'DISPOSAL') {

			if($medn['equipment_description'] == 'Machinery Equipment') {
				$sql = "UPDATE machinery_equipment SET equipment_condition = 'UNSERVICEABLE' WHERE id = $medn[equipment_id]";
				$con->query($sql);
			} else {
				$sql = "UPDATE furniture_and_fixtures SET equipment_condition = 'UNSERVICEABLE' WHERE id = $medn[equipment_id]";
				$con->query($sql);
			}

		}

		if($purpose == 'RETURN TO STOCK') {

			if($medn['equipment_description'] == 'Machinery Equipment') {
				$sql = "UPDATE machinery_equipment SET status = 'Available' WHERE id = $medn[equipment_id]";
				$con->query($sql);
			} else {
				$sql = "UPDATE furniture_and_fixtures SET status = 'Available' WHERE id = $medn[equipment_id]";
				$con->query($sql);
			}

		}

}

$con->table = "par_number";
	$par_machinery_equipment = array(
		"par_year"=>$par_year,
		"serial_number"=>$serial_number,
		"type_no"=> 'RTN',
	);
$con->insertData($par_machinery_equipment);

$con->table = "ptr_number";
$ptr_number = array (
	"ptr_year"=> $par_year,
	"serial_number"=> $serial_number,
	"type_no"=> 'RTN',
);
$con->insertData($ptr_number);
$id_ptr = $con->insertId;

// History
$con->table = "history";
$history = array (
  "user_id"=>$session_user_id,
  "module_id"=>$id,
  "description"=>"Returned an item of equipment",
	"action_name"=>"PAR",
  "module_name"=>"RETURN",
  "action_data"=>"N/A",
);
$con->insertData($history);

// Notification
$con->table = "notifications";
$notification = array (
	"user_id"=>$session_user_id,
	"module_id"=>$id,
	"module_name"=>"RETURNED",
	"purpose"=>$purpose,
	"description"=>"RETURNED an item of equipment for ".$purpose,
	"for_user"=>"SUPER ADMIN",
	"dismiss"=>0,
);
$con->insertData($notification);

echo $id;

?>