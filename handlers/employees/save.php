<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

$con = new pdo_db("users");

session_start();

$session_user_id = $_SESSION['id'];
$employee = $_POST['employee'];

$employee['groups'] = 3;

if ($employee['id']) {

	$wording = 'Updated';

	$employee = $con->updateObj($employee,'id');
	$id = $employee['id'];
} else {

	$wording = 'Added';

	$employee = $con->insertObj($employee);
	$id = $con->insertId;
}

	// History
$con->table = "history";
$history = array (
  "user_id"=>$session_user_id,
  "module_id"=>$id,
  "description"=>"$wording an employee",
  "module_name"=>"EMPLOYEE",
);
$con->insertData($history);

?>