<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

$con = new pdo_db("building_and_structures");
date_default_timezone_set('Asia/Manila');
session_start();

$session_user_id = $_SESSION['id'];
$building_and_structure = $_POST['buildingAndStructure'];

$building_and_structure['status'] = 'Available';

$code_month = date('m', strtotime($building_and_structure['date_added']));
$code_year = date('Y', strtotime($building_and_structure['date_added']));
$new_date = date('Y-m-d', strtotime($building_and_structure['date_added']));
$property_code = $building_and_structure['coa_code']['code'];

$check = $con->getData("SELECT * FROM property_code WHERE property_code = $property_code AND month_added = $code_month ORDER BY id DESC LIMIT 1");

if(isset($check[0]['code_incremental'])) {

	$format = $code_year."-".$check[0]['code_incremental'];

} else {

	$zero_no = '0000';

	$format = $code_year	."-".$zero_no;

}

$next_code = $format;
preg_match_all("/\d+/", $next_code, $matches);
$year_code_incremental = $matches[0][0].$matches[0][1];

$next_code_incremental = $year_code_incremental + 1;
$computed = substr($next_code_incremental, 4);

$property_code_result = $property_code."-".$code_year."-".$code_month."-".$computed;

$depreciation_value = $building_and_structure['depreciation_value'];

// Depreciation Value

if ($building_and_structure['id']) {

	unset($building_and_structure['coa_code']);
	unset($building_and_structure['depreciation_value']);
	$building_and_structure['date_added'] = $new_date;
	$wording = 'Updated';
	$action_data = $building_and_structure['building_and_structure_id'];
	$id = $building_and_structure['id'];
	
	$building_and_structure = $con->updateObj($building_and_structure,'id');

} else {

	unset($building_and_structure['coa_code']);
	unset($building_and_structure['depreciation_value']);
	$wording = 'Added';
	$action_data = $property_code_result;

	$building_and_structure['building_and_structure_id'] = $property_code_result;
	$building_and_structure['date_added'] = $new_date;
	$building_and_structure = $con->insertObj($building_and_structure);
	$id = $con->insertId;
	
	$con->table = "property_code";
	$property_code = array (
		"property_id"=> $id,
		"property_code"=> $property_code,
		"month_added"=> $code_month,
		"code_incremental"=> $computed
	);
	$con->insertData($property_code);

}

$con->table = "depreciation_value";
$dv = array (
  "classification"=>'BUILDING AND OTHER STRUCTURE',
  "ppe_id"=>$id,
  "depreciation_value"=>$depreciation_value,
);
$con->insertData($dv);

// History
$con->table = "history";
$history = array (
  "user_id"=>$session_user_id,
  "module_id"=>$id,
  "description"=>"$wording a building and other structures",
	"action_name"=>strtoupper($wording),
  "module_name"=>"BUILDING AND OTHER STRUCTURE",
	"action_data"=>$action_data,
);
$con->insertData($history);

// Notification
$con->table = "notifications";
$notification = array (
	"user_id"=>$session_user_id,
	"module_id"=>$id,
	"module_name"=>"Building Structures",
	"description"=>"$wording a building and other structures with ID number - '$property_code_result'",
	"for_user"=>"SUPER ADMIN",
	"dismiss"=>0,
);
$con->insertData($notification);

echo $id;

?>