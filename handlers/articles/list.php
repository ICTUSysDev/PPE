<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$articles = $con->getData("SELECT * FROM articles");

foreach($articles as $key => $article) {

  $coa_code = $con->getData("SELECT id, code, account_title FROM charts_of_account WHERE code = ".$article['coa_code']);
  $articles[$key]['coa_code'] = $coa_code[0];

  $articles[$key]['list_no'] = $key+1;

}

header("Content-Type: application/json");
echo json_encode($articles);

?>