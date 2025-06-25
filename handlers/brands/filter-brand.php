<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$filtered_brands = $con->getData("SELECT * FROM brands WHERE article_id = $_POST[article_id]");

foreach($filtered_brands as $key => $filtered_brand) {

  $filtered_brands[$key]['list_no'] = $key+1;

}
header("Content-Type: application/json");
echo json_encode($filtered_brands);

?>