<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$ics_par = $con->getData("SELECT * FROM machinery_equipment_pars WHERE id = $_POST[id]");

$accountable_officer = $con->getData("SELECT id, CONCAT(last_name,', ',first_name) name FROM users WHERE id = ".$ics_par[0]['accountable_officer']);
$ics_par[0]['accountable_officer'] = $accountable_officer[0];

$office_id = $con->getData("SELECT * FROM offices WHERE id =".$ics_par[0]['office_id']);
$ics_par[0]['office_id'] = $office_id[0];

header("Content-Type: application/json");
echo json_encode($ics_par[0]);

?> 
