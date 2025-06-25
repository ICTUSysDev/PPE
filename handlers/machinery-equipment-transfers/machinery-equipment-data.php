<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$machinery_equipment_data = $con->getData("SELECT * FROM par_machinery_equipment WHERE par_id = $_POST[par_id] AND status IN('PAR', 'RELOCATE', 'REASSIGN') AND equipment_description = 'Machinery Equipment'");

foreach($machinery_equipment_data as $key => $med) {

	$machinery_equipment = $con->getData("SELECT id, property_number, description, article_id FROM machinery_equipment WHERE id = $med[equipment_id]");

		foreach($machinery_equipment as $i => $me) {

				$article = $con->getData("SELECT id, name FROM articles WHERE id = $me[article_id]");
				$machinery_equipment_data[$key]['article_id'] = $article[0];

		}

	$machinery_equipment_data[$key]['property_number'] = $machinery_equipment[0]['property_number'];

}

$furniture_and_fixture_data = $con->getData("SELECT * FROM par_machinery_equipment WHERE par_id = $_POST[par_id] AND status IN('PAR', 'RELOCATE', 'REASSIGN') AND equipment_description = 'Furniture and Fixture'");

foreach($furniture_and_fixture_data as $key => $ffd) {

	$furniture_and_fixtures = $con->getData("SELECT id, property_number, article_id FROM furniture_and_fixtures WHERE id = $ffd[equipment_id]");

	foreach($furniture_and_fixtures as $i => $ff) {

		$article = $con->getData("SELECT id, name FROM articles WHERE id = $ff[article_id]");
		$furniture_and_fixture_data[$key]['article_id'] = $article[0];

		$furniture_and_fixtures[$key]['list_no'] = $key+1;
		$furniture_and_fixtures[$key]['description'] = "Furniture and Fixture";
	}

	$furniture_and_fixture_data[$key]['property_number'] = $furniture_and_fixtures[0]['property_number'];

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