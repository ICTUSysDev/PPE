<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();
session_start();

$user = $con->getData("SELECT id, groups FROM users WHERE id = ".$_SESSION['id']);

if($user[0]['groups'] != 3) {
  $ics_pars = $con->getData("SELECT id, par_no, accountable_officer, office_id, DATE_FORMAT(par_date, '%M %d, %Y') AS par_date, form_type FROM machinery_equipment_pars WHERE form_type ='ICS'");

  foreach($ics_pars as $key => $ics_par) {

    if($ics_par['accountable_officer']!=null) {
      $accountable_officer = $con->getData("SELECT id, CONCAT(last_name,', ',first_name,' ',middle_name) name, office_id FROM users WHERE id = ".$ics_par['accountable_officer']);
      $ics_pars[$key]['accountable_officer'] = $accountable_officer[0];
    };

    if($accountable_officer[0]['office_id']!=null) {
      $office = $con->getData("SELECT id, shortname FROM offices WHERE id = ".$accountable_officer[0]['office_id']);
      $ics_pars[$key]['accountable_officer']['office_id'] = $office[0];
    }

    $ics_pars[$key]['list_no'] = $key+1;

  }
} else {
  $ics_pars = $con->getData("SELECT id, par_no, accountable_officer, office_id, DATE_FORMAT(par_date, '%M %d, %Y') AS par_date, form_type FROM machinery_equipment_pars WHERE form_type ='ICS' AND accountable_officer = ".$user[0]['id']);

  foreach($ics_pars as $key => $ics_par) {

    if($ics_par['accountable_officer']!=null) {
      $accountable_officer = $con->getData("SELECT id, CONCAT(last_name,', ',first_name,' ',middle_name) name, office_id FROM users WHERE id = ".$ics_par['accountable_officer']);
      $ics_pars[$key]['accountable_officer'] = $accountable_officer[0];
    };

    if($accountable_officer[0]['office_id']!=null) {
      $office = $con->getData("SELECT id, shortname FROM offices WHERE id = ".$accountable_officer[0]['office_id']);
      $ics_pars[$key]['accountable_officer']['office_id'] = $office[0];
    }

    $ics_pars[$key]['list_no'] = $key+1;

  }
}
header("Content-Type: application/json");
echo json_encode($ics_pars);

?>