<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$brands = $con->getData("SELECT * FROM brands");

foreach($brands as $key => $brand) {

  $article = $con->getData("SELECT id, name FROM articles WHERE id = ".$brand['article_id']);
  $brands[$key]['articles'] = $article[0];

  $brands[$key]['list_no'] = $key+1;

}

header("Content-Type: application/json");
echo json_encode($brands);

?>