<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$repair_history = $con->getData("SELECT * FROM repair_history WHERE id = ".$_POST['id']);

$machinery_equipment = $con->getData("SELECT * FROM machinery_equipment WHERE id = ".$repair_history[0]['equipment_id']);

$accountable_officer = $con->getData("SELECT id, CONCAT(first_name,' ',last_name) employee, office_id FROM users WHERE id = ".$repair_history[0]['accountable_officer']);
$repair_history[0]['accountable_officer'] = $accountable_officer[0];

$office = $con->getData("SELECT id, name, shortname FROM offices WHERE id = ".$accountable_officer[0]['office_id']);
$repair_history[0]['office_id'] = $office[0];

$fund = $con->getData("SELECT id, name FROM funds WHERE id = ".$machinery_equipment[0]['fund_id']);
$repair_history[0]['fund_id'] = $fund[0];

$par_no = $con->getData("SELECT id, par_no FROM machinery_equipment_pars WHERE id = ".$repair_history[0]['par_id']);
$repair_history[0]['par_id'] = $par_no[0];

$viewEquipmentHistory = array(

  "repair_history" => $repair_history[0],
  "machinery_equipment" => $machinery_equipment[0],

);

header("Content-Type: application/json");
echo json_encode($viewEquipmentHistory);

?> 
