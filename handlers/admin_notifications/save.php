<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

$con = new pdo_db("users");

session_start();

if ($_POST['id']) {

	if($_POST['password']=="") {

		unset($_POST['password']);
		$id = $_POST['id'];
		$user = $con->updateObj($_POST,'id');
		
	} else {

		$_POST['password'] = hash('sha512',$_POST['password']);
		$id = $_POST['id'];
		$user = $con->updateObj($_POST,'id');
	}

} else {
	
	$_POST['password'] = hash('sha512',$_POST['password']);
	$user = $con->insertObj($_POST);

}

?>