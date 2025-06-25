<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../../db.php';

$con = new pdo_db();

session_start();

$start_date = $_POST['start'];
$end_date = $_POST['end'];

$return_to_stock = $con->getData("SELECT p.id, p.par_id, p.equipment_id, p.status, p.accountable_officer, m.id, m.par_no, m.beneficiary, m.par_date FROM par_machinery_equipment AS p, machinery_equipment_pars AS m WHERE status IN('REPAIR', 'REPAIRED') AND m.par_date BETWEEN '$start_date' AND '$end_date' AND m.id = p.par_id");

foreach($return_to_stock as $key => $mep) {
    
  $machinery_equipment = $con->getData("SELECT id, article_id, acquisition_cost, property_number FROM machinery_equipment WHERE id = ".$mep['equipment_id']);
  
    $article_id = $con->getData("SELECT id, name FROM articles WHERE id = ".$machinery_equipment[0]['article_id']);
    $return_to_stock[$key]['article_id'] = $article_id[0];
    
  $return_to_stock[$key]['return_to_stock'] = $machinery_equipment[0];
  
  $par_details = $con->getData("SELECT id, par_no, beneficiary, par_date FROM machinery_equipment_pars WHERE id = ".$mep['par_id']);
  $return_to_stock[$key]['par_details'] = $par_details[0];
  
  $accountable_officer = $con->getData("SELECT id, CONCAT(first_name,' ', last_name) AS name FROM users WHERE id = ".$mep['accountable_officer']);
  $return_to_stock[$key]['accountable_officer'] = $accountable_officer[0];

  $return_to_stock[$key]['list_no'] = $key+1;
}

header("Content-Type: application/json");
echo json_encode($return_to_stock);

?>