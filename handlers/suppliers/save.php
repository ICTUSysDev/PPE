<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

$con = new pdo_db("suppliers");

session_start();

$session_user_id = $_SESSION['id'];
$supplier = $_POST['supplier'];

if ($supplier['id']) {
	
	$wording = 'Updated';
	$id = $supplier['id'];
	$supplier = $con->updateObj($supplier,'id');

} else {

	$wording = 'Added';
	$supplier = $con->insertObj($supplier);
	$id = $con->insertId;
}

// History
$con->table = "history";
$history = array (
  "user_id"=>$session_user_id,
  "module_id"=>$id,
  "description"=>"$wording a supplier",
  "module_name"=>"SUPPLIER",
);
$con->insertData($history);

?>