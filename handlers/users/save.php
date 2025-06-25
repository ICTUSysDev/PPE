<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

$con = new pdo_db("users");

session_start();

$session_user_id = $_SESSION['id'];
$user = $_POST['user'];

if ($user['id']) {

	$wording = 'Updated';

	if($user['password']=="") {

		unset($user['password']);
		$id = $user['id'];
		$user = $con->updateObj($user,'id');

	} else {

		$user['password'] = hash('sha512',$user['password']);
		$id = $user['id'];
		$user = $con->updateObj($user,'id');
		
	}

} else {

	$wording = 'Added';
	$user['password'] = hash('sha512',$user['password']);
	$user = $con->insertObj($user);
	$id = $con->insertId;
	
}

// History
$con->table = "history";
$history = array (
  "user_id"=>$session_user_id,
  "module_id"=>$id,
  "description"=>"$wording a user",
  "module_name"=>"USER",
);
$con->insertData($history);

// Notification
$con->table = "notifications";
$notification = array (
	"user_id"=>$session_user_id,
	"module_id"=>$id,
	"module_name"=>'USER',
	"description"=>"$wording a User",
	"for_user"=>"SUPER ADMIN",
	"dismiss"=>0,
);
$con->insertData($notification);

?>