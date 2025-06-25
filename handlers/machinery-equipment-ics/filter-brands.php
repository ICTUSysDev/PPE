<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$article_id = $_POST['article_id'];

$filter_brands = $con->getData("SELECT id, name FROM brands WHERE article_id = $article_id ORDER BY name");

foreach($filter_brands as $key => $filter_brand) {
  
  $filter_brands[$key]['list_no'] = $key+1;

}

echo json_encode($filter_brands);

?>