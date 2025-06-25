<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$par_machinery_equipment = $con->getData("SELECT id, par_id, accountable_officer, equipment_id FROM par_machinery_equipment WHERE id = $_POST[id]");

$office_id = $con->getData("SELECT id, office_id FROM machinery_equipment_pars WHERE accountable_officer = ".$par_machinery_equipment[0]['accountable_officer']);
$par_machinery_equipment[0]['office_id'] = $office_id[0];

header("Content-Type: application/json");
echo json_encode($par_machinery_equipment[0]);

?> 
