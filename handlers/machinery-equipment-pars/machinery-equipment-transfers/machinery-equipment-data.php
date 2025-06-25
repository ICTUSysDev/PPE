<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../../db.php';

session_start();

$con = new pdo_db();

$machinery_equipment_data = $con->getData("SELECT * FROM par_machinery_equipment WHERE par_id = $_POST[par_id] AND status IN('PAR', 'RELOCATE', 'REASSIGN', 'ICS') AND equipment_description = 'Machinery Equipment'");

foreach($machinery_equipment_data as $key => $data) {

  $machinery_equipment = $con->getData("SELECT id, property_number, article_id FROM machinery_equipment WHERE id = ".$data['equipment_id']);
  $machinery_equipment_data[$key]['machinery_equipment'] = $machinery_equipment[0];

  $machinery_equipment_data[$key]['property_number'] = $machinery_equipment[0]['property_number'];
  $machinery_equipment_data[$key]['list_no'] = $key+1;

  $article = $con->getData("SELECT * FROM articles WHERE id = ".$machinery_equipment[0]['article_id']);
  $machinery_equipment_data[$key]['article'] = $article[0];

}

$furniture_and_fixture_data = $con->getData("SELECT * FROM par_machinery_equipment WHERE par_id = $_POST[par_id] AND status IN('PAR', 'RELOCATE', 'REASSIGN', 'ICS') AND equipment_description = 'Furniture and Fixture'");

foreach($furniture_and_fixture_data as $key => $data) {

  $machinery_equipment = $con->getData("SELECT id, property_number, article_id FROM furniture_and_fixtures WHERE id = ".$data['equipment_id']);
  $furniture_and_fixture_data[$key]['machinery_equipment'] = $machinery_equipment[0];

  $furniture_and_fixture_data[$key]['property_number'] = $machinery_equipment[0]['property_number'];
  $furniture_and_fixture_data[$key]['list_no'] = $key+1;

  $article = $con->getData("SELECT * FROM articles WHERE id = ".$machinery_equipment[0]['article_id']);
  $furniture_and_fixture_data[$key]['article'] = $article[0];

}

$ppe_datas = array_merge(
	$machinery_equipment_data,
	$furniture_and_fixture_data,
);

foreach($ppe_datas as $i => $pd) {
	$ppe_datas[$i]['list_no'] = $i + 1;
}

header("Content-Type: application/json");
echo json_encode($ppe_datas);

?>