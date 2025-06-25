<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$start_date = $_POST['start'];
$end_date = $_POST['end'];

$transfer_log = $con->getData("SELECT id, ptr_no, office_id, par_date, form_type FROM machinery_equipment_pars WHERE form_type IN('TRANSFERRED/REPAR', 'DONATION') AND par_date BETWEEN '$start_date' AND '$end_date'");

foreach($transfer_log as $key => $rl) {
  
  $par_machinery_equipment = $con->getData("SELECT id, par_id, equipment_id, prev_accountable_officer FROM par_machinery_equipment WHERE par_id = ".$rl['id']);

  foreach($par_machinery_equipment as $i => $pme) {

    $machinery_equipment = $con->getData("SELECT id, office_id, article_id FROM machinery_equipment WHERE id = ".$pme['equipment_id']);
    
    $accountable_officer = $con->getData("SELECT id, CONCAT(last_name,', ',first_name,' ',middle_name) accountable_officer FROM users WHERE id = ".$pme['prev_accountable_officer']);
    $transfer_log[$key]['accountable_officer'] = $accountable_officer[0]['accountable_officer'];

    foreach($machinery_equipment as $index => $me) {
        
      $article_id = $con->getData("SELECT id, name FROM articles WHERE id = ".$me['article_id']);
      $machinery_equipment[$index]['article_id'] = $article_id[0];

      $office_id = $con->getData("SELECT id, name FROM offices WHERE id = ".$me['office_id']);
      $transfer_log[$key]['office_id'] = $office_id[0];

    }

    $par_machinery_equipment[$i]['machinery_equipment'] = $machinery_equipment[0];

  }

  $transfer_log[$key]['par_machinery_equipment'] = $par_machinery_equipment;

  $transfer_log[$key]['list_no'] = $key+1;

}

header("Content-Type: application/json");
echo json_encode($transfer_log);

?>