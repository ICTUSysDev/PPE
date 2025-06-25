<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

$con = new pdo_db("users");

session_start();

$session_id = $_SESSION['id'];
$profile_setting = $_POST['profileSettings'];

if ($profile_setting['id']) {
	
	$wording = 'Updated';
	$profile_setting = $con->updateObj($profile_setting,'id');

} else {

}

	// History
	$con->table = "history";
	$history = array (
		"user_id"=>$session_id,
		"module_id"=>$session_id,
		"description"=>"$wording Profile",
		"module_name"=>"MY PROFILE",
	);
	$con->insertData($history);
?>
