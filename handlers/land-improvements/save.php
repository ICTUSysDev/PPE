<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

$con = new pdo_db("land_and_land_improvements");
date_default_timezone_set('Asia/Manila');
session_start();

$session_user_id = $_SESSION['id'];
$land_improvement = $_POST['landImprovement'];
$land_improvement['classification'] = 'Land Improvements';

$land_improvement['status'] = 'Available';

$code_month = date('m', strtotime($land_improvement['date_added']));
$code_year = date('Y', strtotime($land_improvement['date_added']));
$new_date = date('Y-m-d', strtotime($land_improvement['date_added']));
$property_code = $land_improvement['coa_code']['code'];

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

if ($land_improvement['id']) {

	unset($land_improvement['coa_code']);
	unset($land_improvement['coaDescription']);
	$land_improvement['date_added'] = $new_date;
	$id = $land_improvement['id'];
	$wording = 'Updated';
	$action_data = $land_improvement['land_code'];
	
	$land_improvement = $con->updateObj($land_improvement,'id');
	
} else {

	unset($land_improvement['coa_code']);
	$wording = 'Added';
	$action_data = $property_code_result;

	$land_improvement['land_code'] = $property_code_result;
	$land_improvement['date_added'] = $new_date;
	$land_improvement = $con->insertObj($land_improvement);
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

// History
$con->table = "history";
$history = array (
  "user_id"=>$session_user_id,
  "module_id"=>$id,
  "description"=>"$wording a Land Improvement",
	"action_name"=>strtoupper($wording),
  "module_name"=>"LAND IMPROVEMENT",
	"action_data"=>$action_data,
);
$con->insertData($history);

// Notification
$con->table = "notifications";
$notification = array (
	"user_id"=>$session_user_id,
	"module_id"=>$id,
	"module_name"=>"Land",
	"description"=>"$wording a land improvement with ID number - '$property_code_result'",
	"for_user"=>"SUPER ADMIN",
	"dismiss"=>0,
);
$con->insertData($notification);

echo $id;

?>