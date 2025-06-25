<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$coa_description = $con->getData("SELECT * FROM charts_of_account WHERE code_id IS NOT NULL");

header("Content-Type: application/json");
echo json_encode($coa_description);

?>