<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$machinery_equipment_pars = $con->getData("SELECT *, DATE_FORMAT(par_date,'%M %d, %Y') par_date FROM machinery_equipment_pars WHERE id = $_POST[id]");

if($machinery_equipment_pars[0]['accountable_officer'] !== 0) {
  $accountable_officer = $con->getData("SELECT id, CONCAT(first_name,' ',last_name) name FROM users WHERE id = ".$machinery_equipment_pars[0]['accountable_officer']);
  $machinery_equipment_pars[0]['accountable_officer'] = $accountable_officer[0];
} else {

  $machinery_equipment_pars[0]['accountable_officer'] = array(
    'id' => 0,
    'name' => 'N/A'
  );

}

$office = $con->getData("SELECT id, name, shortname FROM offices WHERE id = ".$machinery_equipment_pars[0]['office_id']);
$machinery_equipment_pars[0]['office_id'] = $office[0];


$machinery_equipments = $con->getData("SELECT * FROM par_machinery_equipment WHERE par_id = ".$machinery_equipment_pars[0]['id']." AND equipment_description = 'Machinery Equipment' ORDER BY status ASC");

foreach($machinery_equipments as $key => $machinery_equipment) {

  $machinery_equipmentss = $con->getData("SELECT * FROM machinery_equipment WHERE id = ".$machinery_equipment['equipment_id']);
  $machinery_equipments[$key]['par_machinery_equipment'] = $machinery_equipmentss[0];

  $machinery_equipments[$key]['par_machinery_equipment']['amount'] = number_format($machinery_equipments[$key]['par_machinery_equipment']['acquisition_cost']);

  $brand = $con->getData("SELECT id, name FROM brands WHERE id = ".$machinery_equipmentss[0]['brand_id']);
  $machinery_equipments[$key]['par_machinery_equipment']['brand'] = $brand[0];

  $article = $con->getData("SELECT id, name FROM articles WHERE id = ".$machinery_equipmentss[0]['article_id']);
  $machinery_equipments[$key]['par_machinery_equipment']['article'] = $article[0];

}

$furniture_and_fixtures = $con->getData("SELECT * FROM par_machinery_equipment WHERE par_id = ".$machinery_equipment_pars[0]['id']." AND equipment_description = 'Furniture and Fixture' ORDER BY status ASC");

foreach($furniture_and_fixtures as $key => $furniture_and_fixture) {

  $furniture_and_fixturess = $con->getData("SELECT id, property_number, article_id, furniture_and_fixture_condition, CONCAT(carrying_amount) as acquisition_cost, remarks FROM furniture_and_fixtures WHERE id = ".$furniture_and_fixture['equipment_id']);
  $furniture_and_fixtures[$key]['par_machinery_equipment'] = $furniture_and_fixturess[0];

  $furniture_and_fixtures[$key]['par_machinery_equipment']['amount'] = number_format($furniture_and_fixtures[$key]['par_machinery_equipment']['acquisition_cost']);

  $article = $con->getData("SELECT id, name FROM articles WHERE id = ".$furniture_and_fixturess[0]['article_id']);
  $furniture_and_fixtures[$key]['par_machinery_equipment']['article'] = $article[0];

  $furniture_and_fixtures[$key]['par_machinery_equipment']['brand'] = array(
    "id" => 0,
    "name" => $furniture_and_fixturess[0]['furniture_and_fixture_condition']
  );

}

$total = 0;

$par_machinery_equipments = array_merge(
  $machinery_equipments,
  $furniture_and_fixtures,
);

foreach($par_machinery_equipments as $i => $tots) {

  $total += $tots['par_machinery_equipment']['acquisition_cost'];

}

$viewPAR = array(

  "machinery_equipment_pars" => $machinery_equipment_pars[0],
  "par_machinery_equipments" => $par_machinery_equipments,
  "total" => number_format($total),

);

header("Content-Type: application/json");
echo json_encode($viewPAR);

?> 
