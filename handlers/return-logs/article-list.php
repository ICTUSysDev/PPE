<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$article_list = $con->getData("SELECT id, name FROM articles");

header("Content-Type: application/json");
echo json_encode($article_list);

?> 
