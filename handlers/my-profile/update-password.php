<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

$con = new pdo_db("users");

session_start();

$session_id = $_SESSION['id'];
$update_password = $_POST['updatePassword'];

$hashed = hash('sha512',$update_password['currentPassword']);
$hashedd = hash('sha512',$update_password['password']);
// var_dump($hashed); exit();
$check_password = $con->getData("SELECT id, username, password FROM users WHERE id = $session_id");

if($hashed != $check_password[0]['password']) {
	$check_password[0]['check_password'] = false;
} else {
	$wording = 'Updated';
	$sql = "UPDATE users SET password = '{$hashedd}' WHERE id = $session_id";
	$con->query($sql);
	
	// History
	$con->table = "history";
	$history = array (
		"user_id"=>$session_id,
		"module_id"=>$session_id,
		"description"=>"$wording Password",
		"module_name"=>"MY PROFILE",
	);
	$con->insertData($history);
}


header("Content-Type: application/json");
echo json_encode($check_password[0]);

?>
