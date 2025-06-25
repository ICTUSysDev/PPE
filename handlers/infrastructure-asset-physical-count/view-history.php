<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$infrastructure_assets = $con->getData("SELECT * FROM infrastructure_assets WHERE id = $_POST[id]");

foreach($infrastructure_assets as $key => $infrastructure_asset) {

    $physical_count_list = $con->getData("SELECT * FROM physical_inventory WHERE inventory_module = 'INFRASTRUCTURE ASSET' AND equipment_id = $infrastructure_asset[id] ORDER BY id DESC LIMIT 5");

    foreach($physical_count_list as $i => $pcl) {

        $inventory_by = $con->getData("SELECT id, CONCAT(first_name, ' ', last_name) as name FROM users WHERE id = ".$pcl['inventory_by']);
        $physical_count_list[$i]['inventory_by'] = $inventory_by[0];
  
      }
  
      $infrastructure_assets[$key]['physical_count_list'] = $physical_count_list;

}

header("Content-Type: application/json");
echo json_encode($infrastructure_assets[0]);
?>