<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';
date_default_timezone_set('Asia/Manila');
session_start();

$con = new pdo_db("machinery_equipment");

$session_user_id = $_SESSION['id'];

$machinery_equipment = $_POST['machineryEquipment'];

$property_number_month = date('m', strtotime($machinery_equipment['acquisition_date']));
$property_number_year = date('Y', strtotime($machinery_equipment['acquisition_date']));
$new_date = date('Y-m-d', strtotime($machinery_equipment['acquisition_date']));

$coa_code = $machinery_equipment['coa_description_id']['code'];
$useful_life = $machinery_equipment['coa_description_id']['useful_life'];
$office = $machinery_equipment['office_id']['shortname'];
$depreciation_value = $machinery_equipment['depreciation_value'];

$check_property_number_incremental = $con->getData("SELECT * FROM property_number WHERE coa_code = $coa_code AND property_number_month = $property_number_month AND equipment_type = 'PPE' ORDER BY id DESC LIMIT 1");

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

if ($machinery_equipment['id']) {
	
	$wording = 'Updated';
	$action_data = $machinery_equipment['property_number'];

	$machinery_equipment['acquisition_date'] = $new_date;
	$machinery_equipment['updated_by'] = $session_user_id;
	$id = $machinery_equipment['id'];
	$machinery_equipment = $con->updateObj($machinery_equipment,'id');

} else {

	$wording = 'Added';
	$action_data = $property_number_incremental_result;

	$machinery_equipment['added_by'] = $session_user_id;
	$machinery_equipment['useful_life'] = $useful_life;
	$machinery_equipment['status'] = "Available";
	$machinery_equipment['equipment_condition'] = "SERVICEABLE";
	$machinery_equipment['property_number'] = $property_number_incremental_result;
	$machinery_equipment['acquisition_date'] = $new_date;
	$machinery_equipment = $con->insertObj($machinery_equipment);
	$id = $con->insertId;

	$con->table = "property_number";
	$property_number = array (
		"machinery_equipment_id"=> $id,
		"coa_code"=> $coa_code,
		"property_number_month"=> $property_number_month,
		"property_number_incremental"=> $computed,
		"equipment_type"=> 'PPE'
	);
	$con->insertData($property_number);
	
}

// History
$con->table = "history";
$history = array (
  "user_id"=>$session_user_id,
  "module_id"=>$id,
  "description"=>"$wording a Machinery and Equipment",
	"action_name"=>strtoupper($wording),
  "module_name"=>"MACHINERY AND EQUIPMENT",
	"action_data"=>$action_data,
);
$con->insertData($history);

$con->table = "depreciation_value";
$dv = array (
  "classification"=>'MACHINERY EQUIPMENT',
  "ppe_id"=>$id,
  "depreciation_value"=>$depreciation_value,
);
$con->insertData($dv);

// Notification
$con->table = "notifications";
$notification = array (
	"user_id"=>$session_user_id,
	"module_id"=>$id,
	"module_name"=>"Equipment",
	"description"=>"$wording equipment with a property number - '$property_number_incremental_result'",
	"for_user"=>"SUPER ADMIN",
	"dismiss"=>0,
);
$con->insertData($notification);

echo $id;

?>