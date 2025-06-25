<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

$con = new pdo_db("land_and_land_improvements");

date_default_timezone_set('Asia/Manila');
session_start();

$session_user_id = $_SESSION['id'];
$land = $_POST['land'];
$land['classification'] = 'Land';
$land['status'] = 'Available';

$code_month = date('m', strtotime($land['date_added']));
$code_year = date('Y', strtotime($land['date_added']));
$new_date = date('Y-m-d', strtotime($land['date_added']));
$property_code = $land['coa_code'];
$location_code = $land['municipality_id']['zip_code'];

$check = $con->getData("SELECT * FROM property_code WHERE property_code = $property_code AND location_code = $location_code AND month_added = $code_month ORDER BY id DESC LIMIT 1");

if(isset($check[0]['code_incremental'])) {

	$format = $code_year."-".$check[0]['code_incremental'];

} else {

	$zero_no = '0000';

	$format = $code_year	."-".$zero_no;

}

$next_code = $format;
preg_match_all("/\d+/", $next_code, $matches);
$year_code_incremental = $matches[0][0].$matches[0][1];
// var_dump($year_code_incremental);
$next_code_incremental = $year_code_incremental + 1;

$computed = substr($next_code_incremental, 4);

$property_code_result = $property_code."-".$code_year."-".$code_month."-".$location_code."-".$computed;

if ($land['id']) {

	unset($land['coa_code']);
	$land['date_added'] = $new_date;
	$id = $land['id'];
	$wording = 'Updated';
	$action_data = $land['land_code'];
	
	$land = $con->updateObj($land,'id');
} else {

	unset($land['coa_code']);
	$wording = 'Added';
	$action_data = $property_code_result;

	$land['land_code'] = $property_code_result;
	$land['date_added'] = $new_date;
	$land = $con->insertObj($land);
	$id = $con->insertId;

	$con->table = "property_code";
	$property_code = array (
		"property_id"=> $id,
		"property_code"=> $property_code,
		"location_code"=> $location_code,
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
  "description"=>"$wording a Land",
  "action_name"=>strtoupper($wording),
  "module_name"=>"LAND",
  "action_data"=>$action_data,
);
$con->insertData($history);

// Notification
$con->table = "notifications";
$notification = array (
	"user_id"=>$session_user_id,
	"module_id"=>$id,
	"module_name"=>"Land",
	"description"=>"$wording a land with Land Code - '$property_code_result'",
	"for_user"=>"SUPER ADMIN",
	"dismiss"=>0,
);
$con->insertData($notification);

echo $id;

?>