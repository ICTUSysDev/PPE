<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$machinery_equipment_pars = $con->getData("SELECT * FROM machinery_equipment_pars WHERE id = $_POST[id]");

$accountable_officer = $con->getData("SELECT id, CONCAT(first_name,' ',last_name) name FROM users WHERE id = ".$machinery_equipment_pars[0]['accountable_officer']);
$machinery_equipment_pars[0]['accountable_officer'] = $accountable_officer[0];

$office = $con->getData("SELECT id, name, shortname FROM offices WHERE id = ".$machinery_equipment_pars[0]['office_id']);
$machinery_equipment_pars[0]['office_id'] = $office[0];


$par_machinery_equipment = $con->getData("SELECT * FROM par_machinery_equipment WHERE par_id = ".$machinery_equipment_pars[0]['id']);

foreach($par_machinery_equipment as $key => $pme) {

  $machinery_equipment = $con->getData("SELECT * FROM machinery_equipment WHERE id = ".$pme['equipment_id']);
  $par_machinery_equipment[$key]['par_machinery_equipment'] = $machinery_equipment[0];

}

$total = 0;

// Total
foreach($par_machinery_equipment as $i => $tots) {

  $total += $tots['par_machinery_equipment']['acquisition_cost'];

}


$viewPAR = array(

  "machinery_equipment_pars" => $machinery_equipment_pars[0],
  "par_machinery_equipment" => $par_machinery_equipment,
  "total" => number_format($total),

);

header("Content-Type: application/json");
echo json_encode($viewPAR);

?> 
