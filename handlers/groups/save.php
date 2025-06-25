<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';
require_once '../../classes.php';

$con = new pdo_db("groups");

session_start();

$session_user_id = $_SESSION['id'];
$group = $_POST['group'];

$privileges = [];
if (isset($_POST['privileges'])) {
	
	$arrayHex = new ArrayHex();
		
	$privileges = $arrayHex->toHex(json_encode($_POST['privileges']));
	$group['privileges'] = $privileges;
	
};

if ($group['id']) {

	$wording = 'Updated';
	$insertId = $group['id'];
	$group = $con->updateObj($group,'id');

} else {

	$wording = 'Added';

	$group = $con->insertObj($group);
	$insertId = $con->insertId;
		
}

// History
$con->table = "history";
$history = array (
  "user_id"=>$session_user_id,
  "module_id"=>$insertId,
  "description"=>"$wording a Group",
  "module_name"=>"GROUP",
);
$con->insertData($history);

?>