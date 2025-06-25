<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

$con = new pdo_db("furniture_and_fixtures");
date_default_timezone_set('Asia/Manila');
session_start();

$session_user_id = $_SESSION['id'];
$furniture_and_fixture = $_POST['furnitureAndFixture'];
$useful_life = $furniture_and_fixture['coa_description_id']['useful_life'];
$property_number = $furniture_and_fixture['property_number'];
$furniture_and_fixture['status'] = 'Available';
$furniture_and_fixture['equipment_condition'] = "SERVICEABLE";
$new_date = date('Y-m-d', strtotime($furniture_and_fixture['acquisition_date']));

if ($furniture_and_fixture['id']) {

	unset($furniture_and_fixture['property_life']);
	$furniture_and_fixture['acquisition_date'] = $new_date;
	$furniture_and_fixture['updated_by'] = $session_user_id;
	$id = $furniture_and_fixture['id'];
	$wording = 'Updated';
	$action_data = $furniture_and_fixture['property_number'];
	
	$furniture_and_fixture = $con->updateObj($furniture_and_fixture,'id');

} else {

	$wording = 'Added';
	$action_data = $furniture_and_fixture['property_number'];

	$furniture_and_fixture['acquisition_date'] = $new_date;
	$furniture_and_fixture['property_life'] = $useful_life;
	$furniture_and_fixture['added_by'] = $session_user_id;
	$furniture_and_fixture = $con->insertObj($furniture_and_fixture);
	$id = $con->insertId;
	
}

// History
$con->table = "history";
$history = array (
  "user_id"=>$session_user_id,
  "module_id"=>$id,
  "description"=>"$wording a Furniture/Fixture",
	"action_name"=>strtoupper($wording),
  "module_name"=>"FURNITURE AND FIXTURE",
	"action_data"=>$action_data,
);
$con->insertData($history);

// Notification
$con->table = "notifications";
$notification = array (
	"user_id"=>$session_user_id,
	"module_id"=>$id,
	"module_name"=>"Furniture and Fixture",
	"description"=>"$wording a Furniture/Fixture/Book with Property Number - '$property_number'",
	"for_user"=>"SUPER ADMIN",
	"dismiss"=>0,
);
$con->insertData($notification);

echo $id;

?>