<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$articles = $con->getData("SELECT id, name, coa_code FROM articles ORDER BY name");

foreach($articles as $key => $article) {

  $chart_of_accounts = $con->getData("SELECT id, code, account_title FROM charts_of_account WHERE code = ".$article['coa_code']);
  $articles[$key]['chart_of_account'] = $chart_of_accounts[0];

}

header("Content-Type: application/json");
echo json_encode($articles);

?>