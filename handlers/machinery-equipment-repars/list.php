<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$machinery_equipment_repars = $con->getData("SELECT id, par_no, accountable_officer, office_id, par_date FROM machinery_equipment_pars WHERE form_type NOT IN('RETURNED', 'TRANSFERRED', 'ICS')");

foreach($machinery_equipment_repars as $key => $machinery_equipment_repar) {

  $accountable_officer = $con->getData("SELECT id, CONCAT(last_name,', ',first_name,' ',middle_name) name, office_id FROM users WHERE id = ".$machinery_equipment_repar['accountable_officer']);
  $machinery_equipment_repars[$key]['accountable_officer'] = $accountable_officer[0];

  $office = $con->getData("SELECT id, shortname FROM offices WHERE id = ".$accountable_officer[0]['office_id']);
  $machinery_equipment_repars[$key]['accountable_officer']['office_id'] = $office[0];

  $machinery_equipment_repars[$key]['list_no'] = $key+1;

}

header("Content-Type: application/json");
echo json_encode($machinery_equipment_repars);

?>