<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$equipment_description = $_POST['equipment_description'];

if($equipment_description == 'Machinery Equipment') {

  $par_machinery_equipment_view = $con->getData("SELECT id, accountable_officer, equipment_id, equipment_description FROM par_machinery_equipment WHERE id = $_POST[id] AND equipment_description = 'Machinery Equipment'");

  $me_view = $con->getData("SELECT id, property_number, article_id, description, acquisition_cost FROM machinery_equipment WHERE id = ".$par_machinery_equipment_view[0]['equipment_id']);
  
  $article_id = $con->getData("SELECT id, CONCAT(name) as article_name FROM articles WHERE id = ".$me_view[0]['article_id']);
  $me_view[0]['article_id'] = $article_id[0];
  
  $assigned_to = $con->getData("SELECT id, employee_id, CONCAT(first_name,' ',last_name) as name FROM users WHERE id = ".$par_machinery_equipment_view[0]['accountable_officer']);
  $me_view[0]['assigned_to'] = $assigned_to[0];

  header("Content-Type: application/json");
  echo json_encode($me_view[0]);

} else {
  
$par_furniture_and_fixtures_view = $con->getData("SELECT id, accountable_officer, equipment_id, equipment_description FROM par_machinery_equipment WHERE id = $_POST[id] AND equipment_description = 'Furniture and Fixture'");

$ff_view = $con->getData("SELECT id, property_number, article_id, description, CONCAT(carrying_amount) acquisition_cost FROM furniture_and_fixtures WHERE id = ".$par_furniture_and_fixtures_view[0]['equipment_id']);

$article_id = $con->getData("SELECT id, CONCAT(name) as article_name FROM articles WHERE id = ".$ff_view[0]['article_id']);
$ff_view[0]['article_id'] = $article_id[0];

$assigned_to = $con->getData("SELECT id, employee_id, CONCAT(first_name,' ',last_name) as name FROM users WHERE id = ".$par_furniture_and_fixtures_view[0]['accountable_officer']);
$ff_view[0]['assigned_to'] = $assigned_to[0];

header("Content-Type: application/json");
echo json_encode($ff_view[0]);

}

?> 