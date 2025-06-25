<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$machinery_equipments = $con->getData("SELECT id, property_number, article_id FROM machinery_equipment WHERE status = 'Available' AND equipment_condition = 'SERVICEABLE' AND acquisition_cost <= 49999");

foreach($machinery_equipments as $key => $machinery_equipment) {

  $article = $con->getData("SELECT id, name FROM articles WHERE id = ".$machinery_equipment['article_id']);
  $machinery_equipments[$key]['article'] = $article[0];

  $machinery_equipments[$key]['list_no'] = $key+1;
  $machinery_equipments[$key]['description'] = "Machinery Equipment";

}

$furniture_and_fixtures = $con->getData("SELECT id, property_number, article_id FROM furniture_and_fixtures WHERE status = 'Available' AND carrying_amount <= 49999");

foreach($furniture_and_fixtures as $key => $furniture_and_fixture) {

  $article = $con->getData("SELECT id, name FROM articles WHERE id = ".$furniture_and_fixture['article_id']);
  $furniture_and_fixtures[$key]['article'] = $article[0];

  $furniture_and_fixtures[$key]['description'] = "Furniture and Fixture";

}

$ppe = array_merge(
  $machinery_equipments, 
  $furniture_and_fixtures,
);

foreach($ppe as $i => $p) {
  $ppe[$i]['list_no'] = $i+1;
}

echo json_encode($ppe);

?>