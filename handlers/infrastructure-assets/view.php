<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$infrastructure_asset = $con->getData("SELECT * FROM infrastructure_assets WHERE id = $_POST[id]");

$coa_code = substr($infrastructure_asset[0]['infrastructure_id_number'], 0, 8);

$int = (int)$coa_code;
// var_dump($coa_code); exit();

$municipalities = $con->getData("SELECT * FROM municipalities WHERE id = ".$infrastructure_asset[0]['municipality_id']);
$infrastructure_asset[0]['municipality_id'] = $municipalities[0];

$barangays_muns = $con->getData("SELECT * FROM barangays WHERE municipality_id = ".$municipalities[0]['id']);
$infrastructure_asset[0]['municipality_id']['barangays'] = $barangays_muns;

$barangays = $con->getData("SELECT * FROM barangays WHERE id = ".$infrastructure_asset[0]['barangay_id']);
$infrastructure_asset[0]['barangay_id'] = $barangays[0];

$coa_codes = $con->getData("SELECT * FROM charts_of_account WHERE code = $int");
$infrastructure_asset[0]['coa_code'] = $coa_codes[0];

header("Content-Type: application/json");
echo json_encode($infrastructure_asset[0]);

?> 
