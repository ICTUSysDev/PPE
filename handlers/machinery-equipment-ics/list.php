<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$machinery_equipments_ICS = $con->getData("SELECT id, coa_description_id, property_number, article_id, brand_id, remarks, useful_life FROM machinery_equipment WHERE acquisition_cost <= 49999");

foreach($machinery_equipments_ICS as $key => $machinery_equipment_ICS) {

  $charts_of_account = $con->getData("SELECT id, code, account_title FROM charts_of_account WHERE id = ".$machinery_equipment_ICS['coa_description_id']);
  $machinery_equipments_ICS[$key]['charts_of_account'] = $charts_of_account[0];

  $article = $con->getData("SELECT id, name FROM articles WHERE id = ".$machinery_equipment_ICS['article_id']);
  $machinery_equipments_ICS[$key]['article'] = $article[0];

  if(!empty($machinery_equipment[$key]['brand_id'])) {
    $brand = $con->getData("SELECT id, name FROM brands WHERE id = ".$machinery_equipment_ICS['brand_id']);
    $machinery_equipments_ICS[$key]['brand'] = $brand[0];
  } else {
    $machinery_equipments_ICS[$key]['brand'] = 'N/A';
  }

  $machinery_equipments_ICS[$key]['list_no'] = $key+1;

}

header("Content-Type: application/json");
echo json_encode($machinery_equipments_ICS);

?>