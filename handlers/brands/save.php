<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

$con = new pdo_db("brands");

session_start();

$session_user_id = $_SESSION['id'];
$brand = $_POST['brand'];

if ($brand['id']) {

	$wording = 'Updated';
	$id = $brand['article_id']['id'];
	$insertId = $brand['id'];
	$brand = $con->updateObj($brand,'id');

} else {

	$wording = 'Added';
	$id = $brand['article_id']['id'];
	$brand = $con->insertObj($brand);
	$insertId = $con->insertId;
	
}

// History
$con->table = "history";
$history = array (
  "user_id"=>$session_user_id,
  "module_id"=>$insertId,
  "description"=>"$wording a brand",
  "module_name"=>"BRAND",
);
$con->insertData($history);

	echo $id;
?>