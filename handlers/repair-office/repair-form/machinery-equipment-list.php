<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../../db.php';

$con = new pdo_db();

if($_POST['propertyType'] == 'Machinery and Equipment') {
  $ppe_datas = $con->getData("SELECT id, property_number, article_id FROM machinery_equipment WHERE status = 'NOT AVAILABLE'");
} else {
  $ppe_datas = $con->getData("SELECT id, property_number, article_id FROM furniture_and_fixtures WHERE status = 'NOT AVAILABLE'");
}

foreach($ppe_datas as $key => $ff) {
    
  $article = $con->getData("SELECT id, name FROM articles WHERE id = ".$ff['article_id']);
  $ppe_datas[$key]['article'] = $article[0];

}

header("Content-Type: application/json");
echo json_encode($ppe_datas);

?>