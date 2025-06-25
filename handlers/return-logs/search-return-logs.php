<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

session_start();

$session_id = $_SESSION['id'];
// $search_purpose = $_POST['searchPurpose'];

$search_office = $_POST['searchOffice'];

$s = $_POST['start'];
$e = $_POST['end'];

$start = date('Y-m-d', strtotime($s. '+1 day'));
$end = date('Y-m-d', strtotime($e));

if($search_office == 'ALL') {

  $return_logs = $con->getData("SELECT id, par_no, accountable_officer, par_date, form_type FROM machinery_equipment_pars WHERE form_type ='RETURNED' AND par_date BETWEEN '$start' AND '$end'");

} else {

  $search_office = $_POST['searchOffice']['id'];

  $return_logs = $con->getData("SELECT id, par_no, par_date, form_type FROM machinery_equipment_pars WHERE form_type ='RETURNED' AND office_id = $search_office AND par_date BETWEEN '$start' AND '$end'");
  
}

foreach($return_logs as $key => $rl) {

  $par_machinery_equipment = $con->getData("SELECT id, par_id, equipment_id, status, prev_accountable_officer FROM par_machinery_equipment WHERE par_id = ".$rl['id']);

  foreach($par_machinery_equipment as $i => $pme) {

    $machinery_equipment = $con->getData("SELECT id, office_id, article_id FROM machinery_equipment WHERE id = ".$pme['equipment_id']);

    $accountable_officer = $con->getData("SELECT id, CONCAT(last_name,', ',first_name,' ',middle_name) accountable_officer, office_id FROM users WHERE id = ".$pme['prev_accountable_officer']);
    $return_logs[$key]['accountable_officer'] = $accountable_officer[0];
    
    $office_id = $con->getData("SELECT id, name FROM offices WHERE id = ".$accountable_officer[0]['office_id']);
    $return_logs[$key]['office_id'] = $office_id[0];

    $par_machinery_equipment[$i]['machinery_equipment'] = $machinery_equipment[0];

  }

  $return_logs[$key]['par_machinery_equipment'] = $par_machinery_equipment[0];
  
  $return_logs[$key]['list_no'] = $key+1;

}

echo json_encode($return_logs);

?>