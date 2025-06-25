<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../../db.php';

$con = new pdo_db();

session_start();

$start_date = $_POST['start'];
$end_date = $_POST['end'];

$donated_equipment = $con->getData("SELECT p.id, p.par_id, p.equipment_id, p.status, m.id, m.ptr_no, m.beneficiary, m.par_date FROM par_machinery_equipment AS p, machinery_equipment_pars AS m WHERE status = 'DONATION' AND m.par_date BETWEEN '$start_date' AND '$end_date' AND m.id = p.par_id");

foreach($donated_equipment as $key => $mep) {
    
  $machinery_equipment = $con->getData("SELECT id, article_id, acquisition_cost, property_number FROM machinery_equipment WHERE id = ".$mep['equipment_id']);
  
    $article_id = $con->getData("SELECT id, name FROM articles WHERE id = ".$machinery_equipment[0]['article_id']);
    $donated_equipment[$key]['article_id'] = $article_id[0];
    
  $donated_equipment[$key]['donated_equipment'] = $machinery_equipment[0];
  
  $par_details = $con->getData("SELECT id, ptr_no, beneficiary, par_date FROM machinery_equipment_pars WHERE id = ".$mep['par_id']);
  $donated_equipment[$key]['par_details'] = $par_details[0];

  $donated_equipment[$key]['list_no'] = $key+1;
}

header("Content-Type: application/json");
echo json_encode($donated_equipment);

?>