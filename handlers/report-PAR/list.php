<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();
session_start();

$user = $con->getData("SELECT id, groups FROM users WHERE id = ".$_SESSION['id']);

$start_date = $_POST['start'];
$end_date = $_POST['end'];

if($user[0]['groups'] != 3) {
    $PAR = $con->getData("SELECT machinery_equipment_pars.id, machinery_equipment_pars.par_no, machinery_equipment_pars.par_date, offices.name as officeName, CONCAT(users.first_name,' ', users.last_name) AS accountable_officer   FROM machinery_equipment_pars  INNER JOIN offices ON machinery_equipment_pars.office_id = offices.id
    INNER JOIN users ON machinery_equipment_pars.accountable_officer = users.id WHERE machinery_equipment_pars.form_type IN ('PAR', 'TRANSFERRED/REPAR') AND machinery_equipment_pars.par_date BETWEEN '$start_date' AND '$end_date' ORDER BY machinery_equipment_pars.par_no desc");

    foreach($PAR as $key => $listofPAR) {
        $PAR[$key]['list_no']=$key+1;
    }
} else {
    $PAR = $con->getData("SELECT machinery_equipment_pars.id, machinery_equipment_pars.par_no, machinery_equipment_pars.par_date, offices.name as officeName, CONCAT(users.first_name,' ', users.last_name) AS accountable_officer   FROM machinery_equipment_pars  INNER JOIN offices ON machinery_equipment_pars.office_id = offices.id
    INNER JOIN users ON machinery_equipment_pars.accountable_officer = users.id WHERE machinery_equipment_pars.form_type IN ('PAR', 'TRANSFERRED/REPAR') AND machinery_equipment_pars.par_date BETWEEN '$start_date' AND '$end_date' AND machinery_equipment_pars.accountable_officer = ".$user[0]['id']." ORDER BY machinery_equipment_pars.par_no  desc");

    foreach($PAR as $key => $listofPAR) {
        $PAR[$key]['list_no']=$key+1;
    }
}
header("Content-Type: application/json");
echo json_encode($PAR);

?>