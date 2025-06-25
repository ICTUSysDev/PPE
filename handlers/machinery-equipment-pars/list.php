<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

session_start();

$user = $con->getData("SELECT id, office_id, groups FROM users WHERE id = ".$_SESSION['id']);

// var_dump($user); exit();

if($user[0]['groups'] == 1 || $user[0]['groups'] == 2) {

  $machinery_equipment_pars = $con->getData("SELECT id, par_no, accountable_officer, office_id, DATE_FORMAT(par_date, '%M %d, %Y') AS par_date, form_type FROM machinery_equipment_pars WHERE form_type NOT IN('RETURNED','DONATION', 'ICS', 'TRANSFER/REASSIGN ICS')");

  foreach($machinery_equipment_pars as $key => $machinery_equipment_par) {
    
    $par_machinery_equipment = $con->getData("SELECT id, par_id FROM par_machinery_equipment WHERE status IN('PAR', 'RELOCATE', 'REASSIGN', 'ICS') AND par_id = ".$machinery_equipment_par['id']);
    $machinery_equipment_pars[$key]['par_machinery_equipment'] = count($par_machinery_equipment);

    if($machinery_equipment_pars[$key]['par_machinery_equipment'] == 0) {
      $machinery_equipment_pars[$key]['availability'] = 'Unassigned';
      $machinery_equipment_pars[$key]['color'] = 'danger';
    } else {
      $machinery_equipment_pars[$key]['availability'] = 'Available';
      $machinery_equipment_pars[$key]['color'] = 'success';
    }

    if($machinery_equipment_par['accountable_officer'] !== 0) {

      $accountable_officer = $con->getData("SELECT id, CONCAT(last_name,', ',first_name,' ',middle_name) name, office_id FROM users WHERE id = ".$machinery_equipment_par['accountable_officer']);
      $machinery_equipment_pars[$key]['accountable_officer'] = $accountable_officer[0];

    } else {

      $machinery_equipment_pars[$key]['accountable_officer'] = array(
        'id' => 0,
        'name' => 'N/A'
      );

    }


    $office = $con->getData("SELECT id, shortname FROM offices WHERE id = ".$machinery_equipment_par['office_id']);
    $machinery_equipment_pars[$key]['office_id'] = $office[0];

    $machinery_equipment_pars[$key]['list_no'] = $key+1;

  }
} else if($user[0]['groups'] == 4){
  $machinery_equipment_pars = $con->getData("SELECT id, par_no, accountable_officer, office_id, DATE_FORMAT(par_date, '%M %d, %Y') AS par_date, form_type FROM machinery_equipment_pars WHERE form_type NOT IN('RETURNED','DONATION', 'ICS', 'TRANSFER/REASSIGN ICS') AND  office_id = ".$user[0]['office_id']);

  foreach($machinery_equipment_pars as $key => $machinery_equipment_par) {

    $par_machinery_equipment = $con->getData("SELECT id, par_id FROM par_machinery_equipment WHERE status IN('PAR', 'RELOCATE', 'REASSIGN', 'ICS') AND par_id = ".$machinery_equipment_par['id']);
    $machinery_equipment_pars[$key]['par_machinery_equipment'] = count($par_machinery_equipment);

    if($machinery_equipment_pars[$key]['par_machinery_equipment'] == 0) {
      $machinery_equipment_pars[$key]['availability'] = 'No Available';
      $machinery_equipment_pars[$key]['color'] = 'danger';
    } else {
      $machinery_equipment_pars[$key]['availability'] = 'Available';
      $machinery_equipment_pars[$key]['color'] = 'success';
    }
    
    if($machinery_equipment_par['accountable_officer'] !== 0) {

      $accountable_officer = $con->getData("SELECT id, CONCAT(last_name,', ',first_name,' ',middle_name) name, office_id FROM users WHERE id = ".$machinery_equipment_par['accountable_officer']);
      $machinery_equipment_pars[$key]['accountable_officer'] = $accountable_officer[0];

    } else {

      $machinery_equipment_pars[$key]['accountable_officer'] = array(
        'id' => 0,
        'name' => 'N/A'
      );

    }


    $office = $con->getData("SELECT id, shortname FROM offices WHERE id = ".$machinery_equipment_par['office_id']);
    $machinery_equipment_pars[$key]['office_id'] = $office[0];

    $machinery_equipment_pars[$key]['list_no'] = $key+1;

  }
} else if($user[0]['groups'] == 3){
  $machinery_equipment_pars = $con->getData("SELECT id, par_no, accountable_officer, office_id, DATE_FORMAT(par_date, '%M %d, %Y') AS par_date, form_type FROM machinery_equipment_pars WHERE form_type NOT IN('RETURNED','DONATION', 'ICS', 'TRANSFER/REASSIGN ICS') AND accountable_officer = ".$user[0]['id']);

  foreach($machinery_equipment_pars as $key => $machinery_equipment_par) {

    $par_machinery_equipment = $con->getData("SELECT id, par_id FROM par_machinery_equipment WHERE status IN('PAR', 'RELOCATE', 'REASSIGN', 'ICS') AND par_id = ".$machinery_equipment_par['id']);
    $machinery_equipment_pars[$key]['par_machinery_equipment'] = count($par_machinery_equipment);

    if($machinery_equipment_pars[$key]['par_machinery_equipment'] == 0) {
      $machinery_equipment_pars[$key]['availability'] = 'No Available';
      $machinery_equipment_pars[$key]['color'] = 'danger';
    } else {
      $machinery_equipment_pars[$key]['availability'] = 'Available';
      $machinery_equipment_pars[$key]['color'] = 'success';
    }
    
    if($machinery_equipment_par['accountable_officer'] !== 0) {

      $accountable_officer = $con->getData("SELECT id, CONCAT(last_name,', ',first_name,' ',middle_name) name, office_id FROM users WHERE id = ".$machinery_equipment_par['accountable_officer']);
      $machinery_equipment_pars[$key]['accountable_officer'] = $accountable_officer[0];

    } else {

      $machinery_equipment_pars[$key]['accountable_officer'] = array(
        'id' => 0,
        'name' => 'N/A'
      );

    }


    $office = $con->getData("SELECT id, shortname FROM offices WHERE id = ".$machinery_equipment_par['office_id']);
    $machinery_equipment_pars[$key]['office_id'] = $office[0];

    $machinery_equipment_pars[$key]['list_no'] = $key+1;

  }
}

usort($machinery_equipment_pars, function($a, $b) {
  return strcmp($a['availability'], $b['availability']);
});

header("Content-Type: application/json");
echo json_encode($machinery_equipment_pars);

?>