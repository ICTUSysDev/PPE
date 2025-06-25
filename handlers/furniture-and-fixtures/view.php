<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$furniture_and_fixture = $con->getData("SELECT * FROM furniture_and_fixtures WHERE id = $_POST[id]");

$coa_description = $con->getData("SELECT id, code, account_title, useful_life FROM charts_of_account WHERE id = ".$furniture_and_fixture[0]['coa_description_id']);
$furniture_and_fixture[0]['coa_description_id'] = $coa_description[0];

$article = $con->getData("SELECT *, CONCAT(coa_code) code FROM articles WHERE id = ".$furniture_and_fixture[0]['article_id']);
$furniture_and_fixture[0]['article_id'] = $article[0];

$office = $con->getData("SELECT id, name, shortname FROM offices WHERE id = ".$furniture_and_fixture[0]['office_id']);
$furniture_and_fixture[0]['office_id'] = $office[0];

if(!empty($furniture_and_fixture[0]['furniture_and_fixture_location'])) {
  $location = $con->getData("SELECT id, building_and_structure_id, building_and_structure_location FROM building_and_structures WHERE id = ".$furniture_and_fixture[0]['furniture_and_fixture_location']);
  $furniture_and_fixture[0]['furniture_and_fixture_location'] = $location[0];
}

if($furniture_and_fixture[0]['brand_id'] != null) {
  $brand = $con->getData("SELECT * FROM brands WHERE id = ".$furniture_and_fixture[0]['brand_id']);
  $furniture_and_fixture[0]['brand_id'] = $brand[0];
}

$fund = $con->getData("SELECT id, name FROM funds WHERE id = ".$furniture_and_fixture[0]['fund_id']);
$furniture_and_fixture[0]['fund_id'] = $fund[0];

$supplier = $con->getData("SELECT id, name FROM funds WHERE id = ".$furniture_and_fixture[0]['supplier_id']);
$furniture_and_fixture[0]['supplier_id'] = $supplier[0];


header("Content-Type: application/json");
echo json_encode($furniture_and_fixture[0]);

?> 
