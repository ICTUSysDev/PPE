<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

$con = new pdo_db("users");

session_start();

$session_id = $_SESSION['id'];
$profile_setting = $_POST['usernameUpdate'];

$hashed = hash('sha512',$profile_setting['password']);

$check_password = $con->getData("SELECT id, username, password FROM users WHERE id = $session_id");

if($profile_setting['username'] != $check_password[0]['username']) {
	
	if($hashed == $check_password[0]['password']) {
		$check_password[0]['password_match'] = true;
	} else {
		$check_password[0]['password_match'] = false;
	}
	
} else {
	$check_password[0]['username_match'] = true;
}

header("Content-Type: application/json");
echo json_encode($check_password[0]);

?>
