<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

$con = new pdo_db("users");

session_start();

$session_id = $_SESSION['id'];
$profile_setting = $_POST['usernameUpdate'];

$wording = 'Updated';
$sql = "UPDATE users SET username = '{$profile_setting['username']}' WHERE id = $session_id";
$con->query($sql);

	// History
	$con->table = "history";
	$history = array (
		"user_id"=>$session_id,
		"module_id"=>$session_id,
		"description"=>"$wording Username",
		"module_name"=>"MY PROFILE",
	);
	$con->insertData($history);
?>
