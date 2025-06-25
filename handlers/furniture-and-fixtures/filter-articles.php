<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$coa_code = $_POST['coaCodeArticle'];

$filter_articles = $con->getData("SELECT id, coa_code, name FROM articles WHERE coa_code = $coa_code ORDER BY name");

echo json_encode($filter_articles);

?>