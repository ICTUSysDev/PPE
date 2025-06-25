<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$brand = $con->getData("SELECT * FROM brands WHERE id = $_POST[id]");

$article = $con->getData("SELECT * FROM articles WHERE id = ".$brand[0]['article_id']);
$brand[0]['article_id'] = $article[0];

header("Content-Type: application/json");
echo json_encode($brand[0]);

?> 
