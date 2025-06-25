<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$machinery_equipments = $con->getData("SELECT id, coa_description_id, property_number, article_id, brand_id, remarks, useful_life FROM machinery_equipment where acquisition_cost >=50000 ORDER BY id DESC");

foreach($machinery_equipments as $key => $machinery_equipment) {

  $charts_of_account = $con->getData("SELECT id, code, account_title FROM charts_of_account WHERE id = ".$machinery_equipment['coa_description_id']);
  $machinery_equipments[$key]['charts_of_account'] = $charts_of_account[0];

  $article = $con->getData("SELECT id, name FROM articles WHERE id = ".$machinery_equipment['article_id']);
  $machinery_equipments[$key]['article'] = $article[0];

  if(!empty($machinery_equipment[$key]['brand_id'])) {
    $brand = $con->getData("SELECT id, name FROM brands WHERE id = ".$machinery_equipment['brand_id']);
    $machinery_equipments[$key]['brand'] = $brand[0];
  } else {
    $machinery_equipments[$key]['brand'] = 'N/A';
  }

  $machinery_equipments[$key]['list_no'] = $key+1;

}

header("Content-Type: application/json");
echo json_encode($machinery_equipments);

?>