<?php

$_POST = json_decode(file_get_contents('php://input'), true);
require_once '../../db.php';

$con = new pdo_db();

$equipment_history = $con->getData("SELECT *, DATE_FORMAT(created_at,'%b %d, %Y') history_date FROM equipment_history WHERE equipment_id = ".$_POST['equipmentId']);

foreach($equipment_history as $index => $eh) {

  if(!empty($eh['accountable_officer'])) {
    $accountable_officer = $con->getData("SELECT id, CONCAT(last_name,', ',first_name,' ',middle_name) name FROM users WHERE id = ".$eh['accountable_officer']);
    $equipment_history[$index]['accountable_officer'] = $accountable_officer[0];
  }

  $office_id = $con->getData("SELECT id, name FROM offices WHERE id = ".$eh['office_id']);
  $equipment_history[$index]['office_id'] = $office_id[0];

}

// header("Content-Type: application/json");
echo json_encode($equipment_history);
?>