<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$datas = $con->getData("SELECT * FROM par_machinery_equipment WHERE par_id = $_POST[id]");

foreach($datas as $key => $data) {

  $machinery_equipment = $con->getData("SELECT id, property_number, article_id FROM machinery_equipment WHERE id = ".$data['equipment_id']);
  $datas[$key]['machinery_equipment'] = $machinery_equipment[0];

  $datas[$key]['property_number'] = $machinery_equipment[0]['property_number'];
  $datas[$key]['list_no'] = $key+1;

  $article = $con->getData("SELECT * FROM articles WHERE id = ".$machinery_equipment[0]['article_id']);
  $datas[$key]['article'] = $article[0];

}

header("Content-Type: application/json");
echo json_encode($datas);

?> 
