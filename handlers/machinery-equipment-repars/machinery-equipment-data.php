<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$machinery_equipment_data = $con->getData("SELECT * FROM par_machinery_equipment WHERE par_id = $_POST[par_id] AND status = 'PAR' AND equipment_description = 'Machinery Equipment'");

foreach($machinery_equipment_data as $key => $med) {

	$machinery_equipment = $con->getData("SELECT id, property_number, description, article_id FROM machinery_equipment WHERE id = $med[equipment_id]");

		foreach($machinery_equipment as $i => $me) {

				$article = $con->getData("SELECT id, name FROM articles WHERE id = $me[article_id]");
				$machinery_equipment_data[$key]['article_id'] = $article[0];

		}

	$machinery_equipment_data[$key]['property_number'] = $machinery_equipment[0]['property_number'];

}

$building_and_structures_data = $con->getData("SELECT * FROM par_machinery_equipment WHERE par_id = $_POST[par_id] AND status = 'PAR' AND equipment_description = 'Building and Structures'");

foreach($building_and_structures_data as $key => $bsd) {

	$building_and_structures = $con->getData("SELECT id, CONCAT(building_and_structure_property_no) as property_number, building_and_structure_component FROM building_and_structures WHERE id = $bsd[equipment_id]");

	foreach($building_and_structures as $index => $building_and_structure) {

		$building_and_structures_data[$key]['article_id'] = array(
			"id" => 0,
			"name" => $building_and_structure['building_and_structure_component']
		);
	
		$building_and_structures_data[$key]['description'] = "Building and Structures";
	
	}

	$building_and_structures_data[$key]['property_number'] = $building_and_structures[0]['property_number'];

}

$furniture_and_fixture_data = $con->getData("SELECT * FROM par_machinery_equipment WHERE par_id = $_POST[par_id] AND status = 'PAR' AND equipment_description = 'Furniture and Fixture'");

foreach($furniture_and_fixture_data as $key => $ffd) {

	$furniture_and_fixtures = $con->getData("SELECT id, property_number, article_id FROM furniture_and_fixtures WHERE id = $ffd[equipment_id]");

	foreach($furniture_and_fixtures as $i => $ff) {

		$article = $con->getData("SELECT id, name FROM articles WHERE id = $ff[article_id]");
		$furniture_and_fixture_data[$key]['article_id'] = $article[0];

		$furniture_and_fixtures[$key]['description'] = "Furniture and Fixture";
	}

	$furniture_and_fixture_data[$key]['property_number'] = $furniture_and_fixtures[0]['property_number'];


}

$infrastructure_assets_data = $con->getData("SELECT * FROM par_machinery_equipment WHERE par_id = $_POST[par_id] AND status = 'PAR' AND equipment_description = 'Infrastructure Assets'");

foreach($infrastructure_assets_data as $key => $iad) {

	$infrastructure_assets = $con->getData("SELECT id, CONCAT(component_property_no) as property_number, type_of_infrastructure FROM infrastructure_assets WHERE id = $iad[equipment_id]");

	foreach($infrastructure_assets as $i => $ia) {

		$infrastructure_assets_data[$key]['article_id'] = array(
			"id" => 0,
			"name" => $ia['type_of_infrastructure']
		);

	}

	$infrastructure_assets_data[$key]['property_number'] = $infrastructure_assets[0]['property_number'];

}

$land_and_land_improvements_data = $con->getData("SELECT * FROM par_machinery_equipment WHERE par_id = $_POST[par_id] AND status = 'PAR' AND equipment_description = 'Land and Land Improvements'");

foreach($land_and_land_improvements_data as $key => $lli) {

	$land_and_land_improvements = $con->getData("SELECT id, CONCAT(id_number) as property_number, description FROM land_and_land_improvements WHERE id = $lli[equipment_id]");

	foreach($land_and_land_improvements as $i => $llia) {

		$land_and_land_improvements_data[$key]['article_id'] = array(
			"id" => 0,
			"name" => $llia['description']
		);

	}

	$land_and_land_improvements_data[$key]['property_number'] = $land_and_land_improvements[0]['property_number'];

}

$ppe_datas = array_merge(
	$machinery_equipment_data,
	$building_and_structures_data,
	$furniture_and_fixture_data,
	$infrastructure_assets_data,
	$land_and_land_improvements_data
);

foreach($ppe_datas as $i => $pd) {
	$ppe_datas[$i]['list_no'] = $i+1;
}

header("Content-Type: application/json");
echo json_encode($ppe_datas);

?>