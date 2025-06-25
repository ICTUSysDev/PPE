<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$article = $con->getData("SELECT * FROM articles WHERE id = $_POST[id]");

$coa_code = $con->getData("SELECT id, code, account_title FROM charts_of_account WHERE code = ".$article[0]['coa_code']);
$article[0]['coa_code'] = $coa_code[0];

header("Content-Type: application/json");
echo json_encode($article[0]);

?> 
