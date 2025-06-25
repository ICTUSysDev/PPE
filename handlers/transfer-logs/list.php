<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$transfer_logs = $con->getData("SELECT id, par_no, DATE_FORMAT(par_date,'%M %d, %Y') par_date, form_type, accountable_officer FROM machinery_equipment_pars WHERE form_type = 'TRANSFERRED' ORDER BY id DESC");

foreach($transfer_logs as $key => $tl) {
  
  $accountable_officers = $con->getData("SELECT id, CONCAT(last_name,', ',first_name,' ',middle_name) accountable_officer FROM users WHERE id = ".$tl['accountable_officer']);
  $transfer_logs[$key]['accountable_officer'] = $accountable_officers[0];

  $transfer_logs[$key]['list_no'] = $key+1;

}

header("Content-Type: application/json");
echo json_encode($transfer_logs);

?>