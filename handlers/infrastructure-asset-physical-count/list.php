<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$infrastructure_assets = $con->getData("SELECT * FROM infrastructure_assets");

foreach($infrastructure_assets as $key => $infrastructure_asset) {

  $infrastructure_assets[$key]['list_no'] = $key+1;

}

header("Content-Type: application/json");
echo json_encode($infrastructure_assets);

?>