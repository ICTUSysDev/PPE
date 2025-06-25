<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$article_id = $_POST['item']['article_id']['id'];
$brand_name = $_POST['item']['name'];

$check_brand = $con->getData("SELECT * FROM brands WHERE article_id = $article_id AND name = '$brand_name'");

header("Content-Type: application/json");
echo json_encode($check_brand);

?>