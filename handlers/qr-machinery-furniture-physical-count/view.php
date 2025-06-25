<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();
// echo ( $_POST['type']);
$equipment_description = $_POST['type'];

if($equipment_description == 'Machinery Equipment') {

  // $par_machinery_equipment_view = $con->getData("SELECT id, equipment_id, equipment_description FROM par_machinery_equipment WHERE id = $_POST[id] AND equipment_description like 'Machinery Equipment'");

  $me_view = $con->getData("SELECT id, property_number, article_id, description, CONCAT('P ', FORMAT(acquisition_cost,2)) AS acquisition_cost FROM machinery_equipment WHERE id = " . $_POST['id']);
  
  $article_id = $con->getData("SELECT id, CONCAT(name) as article_name FROM articles WHERE id = ".$me_view[0]['article_id']);
  $me_view[0]['article_id'] = $article_id[0];

  header("Content-Type: application/json");
  echo json_encode($me_view[0]);

} 
elseif($equipment_description == 'Furniture and Fixture') 
{
  
  // $par_furniture_and_fixtures_view = $con->getData("SELECT id, equipment_id, equipment_description FROM par_machinery_equipment WHERE id = $_POST[id] AND equipment_description like 'Furniture and Fixture'");

  $ff_view = $con->getData("SELECT id, property_number, article_id, description, CONCAT(carrying_amount) acquisition_cost FROM furniture_and_fixtures WHERE id = " . $_POST['id']);

  $article_id = $con->getData("SELECT id, CONCAT(name) as article_name FROM articles WHERE id = ".$ff_view[0]['article_id']);
  $ff_view[0]['article_id'] = $article_id[0];


  header("Content-Type: application/json");
  echo json_encode($ff_view[0]);

}

?> 