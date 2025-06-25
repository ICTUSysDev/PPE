<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

$con = new pdo_db("infrastructure_assets");
date_default_timezone_set('Asia/Manila');
session_start();

$session_user_id = $_SESSION['id'];
$infrastructure_asset = $_POST['infrastructureAsset'];

$infrastructure_asset['status'] = 'Available';

$code_month = date('m', strtotime($infrastructure_asset['date_added']));
$code_year = date('Y', strtotime($infrastructure_asset['date_added']));
$new_date = date('Y-m-d', strtotime($infrastructure_asset['date_added']));
$property_code = $infrastructure_asset['coa_code']['code'];

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

if ($infrastructure_asset['id']) {
	
	unset($infrastructure_asset['coa_code']);
	$infrastructure_asset['date_added'] = $new_date;
	$id = $infrastructure_asset['id'];
	$wording = 'Updated';
	$action_data = $infrastructure_asset['infrastructure_id_number'];

	$infrastructure_asset = $con->updateObj($infrastructure_asset,'id');

} else {

	unset($infrastructure_asset['coa_code']);
	$wording = 'Added';
	$action_data = $property_code_result;

	$infrastructure_asset['infrastructure_id_number'] = $property_code_result;
	$infrastructure_asset['date_added'] = $new_date;
	$infrastructure_asset = $con->insertObj($infrastructure_asset);
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
  "description"=>"$wording an infrastructure asset",
	"action_name"=>strtoupper($wording),
  "module_name"=>"INFRASTRUCTURE ASSET",
	"action_data"=>$action_data,
);
$con->insertData($history);

// Notification
$con->table = "notifications";
$notification = array (
	"user_id"=>$session_user_id,
	"module_id"=>$id,
	"module_name"=>"Infrastructure Asset",
	"description"=>"$wording an infrastructure asset with ID number - '$property_code_result'",
	"for_user"=>"SUPER ADMIN",
	"dismiss"=>0,
);
$con->insertData($notification);

echo $id;

?>