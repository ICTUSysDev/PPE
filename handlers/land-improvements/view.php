<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$land_and_land_improvements = $con->getData("SELECT * FROM land_and_land_improvements WHERE id = $_POST[id]");

$coa_code = substr($land_and_land_improvements[0]['land_code'], 0, 8);

$int = (int)$coa_code;
// var_dump($coa_code); exit();

$municipalities = $con->getData("SELECT * FROM municipalities WHERE id = ".$land_and_land_improvements[0]['municipality_id']);
$land_and_land_improvements[0]['municipality_id'] = $municipalities[0];

$barangays_muns = $con->getData("SELECT * FROM barangays WHERE municipality_id = ".$municipalities[0]['id']);
$land_and_land_improvements[0]['municipality_id']['barangays'] = $barangays_muns;

$barangays = $con->getData("SELECT * FROM barangays WHERE id = ".$land_and_land_improvements[0]['barangay_id']);
$land_and_land_improvements[0]['barangay_id'] = $barangays[0];

$coa_codes = $con->getData("SELECT * FROM charts_of_account WHERE code = $int");
$land_and_land_improvements[0]['coa_code'] = $coa_codes[0];

header("Content-Type: application/json");
echo json_encode($land_and_land_improvements[0]);

?> 
