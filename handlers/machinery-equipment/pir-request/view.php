<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$machinery_equipment = $con->getData("SELECT * FROM machinery_equipment WHERE id = $_POST[id]");

$office = $con->getData("SELECT id, name, shortname FROM offices WHERE id = ".$machinery_equipment[0]['office_id']);
$machinery_equipment[0]['office_id'] = $office[0];

$coa_description = $con->getData("SELECT id, code, account_title, useful_life FROM charts_of_account WHERE id = ".$machinery_equipment[0]['coa_description_id']);
$machinery_equipment[0]['coa_description_id'] = $coa_description[0];

$article = $con->getData("SELECT *, CONCAT(coa_code) code FROM articles WHERE id = ".$machinery_equipment[0]['article_id']);
$machinery_equipment[0]['article_id'] = $article[0];

if($machinery_equipment[0]['brand_id']!=null){
  $brand = $con->getData("SELECT * FROM brands WHERE id = ".$machinery_equipment[0]['brand_id']);
  $machinery_equipment[0]['brand_id'] = $brand[0];
}

$fund = $con->getData("SELECT id, name FROM funds WHERE id = ".$machinery_equipment[0]['fund_id']);
$machinery_equipment[0]['fund_id'] = $fund[0];

$supplier = $con->getData("SELECT id, name FROM funds WHERE id = ".$machinery_equipment[0]['supplier_id']);
$machinery_equipment[0]['supplier_id'] = $supplier[0];

header("Content-Type: application/json");
echo json_encode($machinery_equipment[0]);

?> 
