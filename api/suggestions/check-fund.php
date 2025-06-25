<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$check_fund = $_POST['checkFund'];

  $check_funds = $con->getData("SELECT id, fund_id FROM machinery_equipment WHERE fund_id = $check_fund");

header("Content-Type: application/json");
echo json_encode($check_funds);

?>