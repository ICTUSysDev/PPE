<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$infrastructure_assets = $con->getData("SELECT id, infrastructure_id_number, type_of_infrastructure, infrastructure_location, infrastructure_condition, remarks FROM infrastructure_assets");

foreach($infrastructure_assets as $key => $infrastructure_asset) {

  if($infrastructure_assets[$key]['infrastructure_location'] == null) {
    $infrastructure_assets[$key]['infrastructure_location'] = 'N/A';
  }

  $infrastructure_assets[$key]['list_no'] = $key+1;

}

header("Content-Type: application/json");
echo json_encode($infrastructure_assets);

?>