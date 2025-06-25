<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$land_and_land_improvements = $con->getData("SELECT * FROM land_and_land_improvements WHERE id = $_POST[id]");

foreach($land_and_land_improvements as $key => $land_and_land_improvement) {

    $physical_count_list = $con->getData("SELECT * FROM physical_inventory WHERE inventory_module = 'LAND AND LAND IMPROVEMENTS' AND equipment_id = $land_and_land_improvement[id] ORDER BY id DESC LIMIT 5");

    foreach($physical_count_list as $i => $pcl) {

        $inventory_by = $con->getData("SELECT id, CONCAT(first_name, ' ', last_name) as name FROM users WHERE id = ".$pcl['inventory_by']);
        $physical_count_list[$i]['inventory_by'] = $inventory_by[0];
  
      }
  
      $land_and_land_improvements[$key]['physical_count_list'] = $physical_count_list;

}

header("Content-Type: application/json");
echo json_encode($land_and_land_improvements[0]);
?>