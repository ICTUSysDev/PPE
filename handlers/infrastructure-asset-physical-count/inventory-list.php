<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$physical_inventory = $con->getData("SELECT * FROM physical_inventory WHERE equipment_id = $_POST[equipment_id] AND inventory_module = 'INFRASTRUCTURE ASSET' ORDER BY id DESC");

foreach($physical_inventory as $key => $pi) {

    $inventory_by = $con->getData("SELECT id, CONCAT(last_name,',',' ', first_name,' ', middle_name) fullname FROM users WHERE id = ".$pi['inventory_by']);
    $physical_inventory[$key]['inventory_by'] = $inventory_by[0];

    $physical_inventory[$key]['list_no'] = $key+1;

}

header("Content-Type: application/json");
echo json_encode($physical_inventory);

?>