<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$building_and_structures = $con->getData("SELECT * FROM building_and_structures WHERE id = $_POST[id]");

foreach($building_and_structures as $key => $building_and_structure) {

    $physical_count_list = $con->getData("SELECT * FROM physical_inventory WHERE inventory_module = 'BUILDING AND OTHER STRUCTURES' AND equipment_id = $building_and_structure[id] ORDER BY id DESC LIMIT 5");

    foreach($physical_count_list as $i => $pcl) {

        $inventory_by = $con->getData("SELECT id, CONCAT(first_name, ' ', last_name) as name FROM users WHERE id = ".$pcl['inventory_by']);
        $physical_count_list[$i]['inventory_by'] = $inventory_by[0];
  
      }
  
      $building_and_structures[$key]['physical_count_list'] = $physical_count_list;

}

header("Content-Type: application/json");
echo json_encode($building_and_structures[0]);
?>