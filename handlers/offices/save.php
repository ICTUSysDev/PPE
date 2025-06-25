<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

$con = new pdo_db("offices");

session_start();

$session_user_id = $_SESSION['id'];
$office = $_POST['office'];

if ($office['id']) {
	
	$wording = 'Updated';
	$id = $office['id'];
	$office = $con->updateObj($office,'id');

} else {

	$wording = 'Added';
	$office = $con->insertObj($office);
	$id = $con->insertId;
}

// History
$con->table = "history";
$history = array (
  "user_id"=>$session_user_id,
  "module_id"=>$id,
  "description"=>"$wording an office",
  "module_name"=>"OFFICE",
);
$con->insertData($history);

?>