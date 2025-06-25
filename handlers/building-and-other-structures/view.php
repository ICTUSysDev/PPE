<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$building_and_structure = $con->getData("SELECT * FROM building_and_structures WHERE id = $_POST[id]");

$coa_code = substr($building_and_structure[0]['building_and_structure_id'], 0, 8);

$int = (int)$coa_code;
// var_dump($coa_code); exit();

$municipalities = $con->getData("SELECT * FROM municipalities WHERE id = ".$building_and_structure[0]['municipality_id']);
$building_and_structure[0]['municipality_id'] = $municipalities[0];

$barangays_muns = $con->getData("SELECT * FROM barangays WHERE municipality_id = ".$municipalities[0]['id']);
$building_and_structure[0]['municipality_id']['barangays'] = $barangays_muns;

$barangays = $con->getData("SELECT * FROM barangays WHERE id = ".$building_and_structure[0]['barangay_id']);
$building_and_structure[0]['barangay_id'] = $barangays[0];

$coa_codes = $con->getData("SELECT * FROM charts_of_account WHERE code = $int");
$building_and_structure[0]['coa_code'] = $coa_codes[0];

header("Content-Type: application/json");
echo json_encode($building_and_structure[0]);

?> 
