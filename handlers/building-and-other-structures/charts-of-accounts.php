<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$charts_of_accounts = $con->getData("SELECT id, code_id, code, account_title, disable FROM charts_of_account WHERE code_id = 10704");

echo json_encode($charts_of_accounts);

?>