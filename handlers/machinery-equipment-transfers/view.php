<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$machinery_equipment_transfers = $con->getData("SELECT * FROM machinery_equipment_pars WHERE id = $_POST[id]");

if($machinery_equipment_transfers[0]['accountable_officer'] !== 0) {
  $accountable_officer = $con->getData("SELECT id, CONCAT(last_name,', ',first_name,' ',middle_name) name, office_id FROM users WHERE id = ".$machinery_equipment_transfers[0]['accountable_officer']);
  $machinery_equipment_transfers[0]['accountable_officer'] = $accountable_officer[0];
} else {

  $machinery_equipment_transfers[0]['accountable_officer'] = array(
    'id' => 0,
    'name' => 'N/A'
  );

}

unset($machinery_equipment_transfers[0]['note']);
unset($machinery_equipment_transfers[0]['par_date']);

header("Content-Type: application/json");
echo json_encode($machinery_equipment_transfers[0]);

?> 
