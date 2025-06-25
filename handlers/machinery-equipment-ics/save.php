<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

session_start();

$con = new pdo_db("machinery_equipment");

$session_user_id = $_SESSION['id'];

$machinery_equipment_ICS = $_POST['machineryEquipmentICS'];
$machinery_equipment_ICS['status'] = "Available";
$machinery_equipment_ICS['equipment_condition'] = "SERVICEABLE";

$property_number_month = date('m', strtotime($machinery_equipment_ICS['acquisition_date']));
$property_number_year = date('Y', strtotime($machinery_equipment_ICS['acquisition_date']));
$new_date = date('Y-m-d', strtotime($machinery_equipment_ICS['acquisition_date'] . ' +1 day'));

$coa_code = $machinery_equipment_ICS['coa_description_id']['code'];
$useful_life = $machinery_equipment_ICS['coa_description_id']['useful_life'];
$office = $machinery_equipment_ICS['office_id']['shortname'];

$check_property_number_incremental = $con->getData("SELECT * FROM property_number WHERE coa_code = $coa_code AND property_number_month = $property_number_month AND equipment_type = 'ICS' ORDER BY id DESC LIMIT 1");

if(isset($check_property_number_incremental[0]['property_number_incremental'])) {

	$format = $property_number_year."-".$check_property_number_incremental[0]['property_number_incremental'];

} else {

	$zero_no = '0000';

	$format = $property_number_year	."-".$zero_no;

}

$next_property_number_incremental = $format;
preg_match_all("/\d+/", $next_property_number_incremental, $matches);
$year_property_number_incremental = $matches[0][0].$matches[0][1];

$next_property_number_incremental = $year_property_number_incremental + 1;
$computed = substr($next_property_number_incremental, 4);

$property_number_incremental_result = $office."-".$coa_code."-".$property_number_year."-".$property_number_month."-".$computed;

if ($machinery_equipment_ICS['id']) {
	
	$wording = 'Updated';
	$action_data = $machinery_equipment_ICS['property_number'];

	$machinery_equipment_ICS['acquisition_date'] = $new_date;
	$id = $machinery_equipment_ICS['id'];
	$machinery_equipment_ICS = $con->updateObj($machinery_equipment_ICS,'id');

} else {

	$wording = 'Added';
	$action_data = $property_number_incremental_result;

	$machinery_equipment_ICS['useful_life'] = $useful_life;
	$machinery_equipment_ICS['acquisition_date'] = $new_date;
	$machinery_equipment_ICS['property_number'] = $property_number_incremental_result;
	$machinery_equipment_ICS = $con->insertObj($machinery_equipment_ICS);
	$id = $con->insertId;

	$con->table = "property_number";
	$property_number = array (
		"machinery_equipment_id"=> $id,
		"coa_code"=> $coa_code,
		"property_number_month"=> $property_number_month,
		"property_number_incremental"=> $computed,
		"equipment_type"=> 'ICS'
	);
	$con->insertData($property_number);
	
}

// History
$con->table = "history";
$history = array (
  "user_id"=>$session_user_id,
  "module_id"=>$id,
  "description"=>"$wording an ICS",
	"action_name"=>strtoupper($wording),
  "module_name"=>"MACHINERY AND EQUIPMENT ICS",
	"action_data"=>$action_data,
);
$con->insertData($history);

// Notification
$con->table = "notifications";
$notification = array (
	"user_id"=>$session_user_id,
	"module_id"=>$id,
	"module_name"=>"Equipment",
	"description"=>"$wording an ICS with property number - '$property_number_incremental_result'",
	"for_user"=>"SUPER ADMIN",
	"dismiss"=>0,
);
$con->insertData($notification);

echo $id;

?>