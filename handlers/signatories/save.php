<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

$con = new pdo_db("signatories");

date_default_timezone_set('Asia/Manila');
session_start();

$session_user_id = $_SESSION['id'];
$signatory = $_POST['signatory'];

$inventory_date =  $signatory['date_of_assumption'];
$new_inventory_date = new DateTime($inventory_date);
$signatory['date_of_assumption'] = $new_inventory_date->format('Y-m-d H:i:s'); // MySQL DATETIME format

if ($signatory['id']) {
	
	$wording = 'Updated';
	$id = $signatory['id'];
	$signatory = $con->updateObj($signatory,'id');

} else {
	
	$wording = 'Added';
	$signatory = $con->insertObj($signatory);
	$id = $con->insertId;
}

// History
$con->table = "history";
$history = array (
  "user_id"=>$session_user_id,
  "module_id"=>$id,
  "description"=>"$wording signatories",
  "module_name"=>"SIGNATORIES",
);
$con->insertData($history);

?>