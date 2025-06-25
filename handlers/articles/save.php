<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

$con = new pdo_db("articles");

session_start();

$session_user_id = $_SESSION['id'];
$article = $_POST['article'];

if ($article['id']) {

	$wording = 'Updated';
	
	$article['coa_code'] = $_POST['coaCode'];
	$id = $article['id'];
	$article = $con->updateObj($article,'id');

} else {

	$wording = 'Added';

	$article['coa_code'] = $_POST['coaCode'];
	$article = $con->insertObj($article);
	$id = $con->insertId;
	
}

// History
$con->table = "history";
$history = array (
  "user_id"=>$session_user_id,
  "module_id"=>$id,
  "description"=>"$wording an article",
  "module_name"=>"ARTICLE",
);
$con->insertData($history);

?>