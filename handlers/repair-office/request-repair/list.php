<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../../db.php';

header("Content-Type: application/json");

$con = new pdo_db();

$repairs = $con->getData("SELECT id, par_id, accountable_officer, equipment_id, remarks, status_approve FROM pre_repair_requests WHERE status_approve = 1");

foreach($repairs as $key => $repair) {

  $machinery_equipment = $con->getData("SELECT id, coa_description_id, property_number, article_id, brand_id, remarks FROM machinery_equipment WHERE id = ".$repair['equipment_id']);

  foreach($machinery_equipment as $m => $me) {
    
    $charts_of_account = $con->getData("SELECT id, code, account_title FROM charts_of_account WHERE id = ".$me['coa_description_id']);
    $machinery_equipment[$m]['charts_of_account'] = $charts_of_account[0];
    
    $article = $con->getData("SELECT id, name FROM articles WHERE id = ".$me['article_id']);
    $machinery_equipment[$m]['article_id'] = $article[0];
    
    if($me['brand_id'] != null) {
      $brand = $con->getData("SELECT id, name FROM brands WHERE id = ".$me['brand_id']);
      $machinery_equipment[$m]['brand_id'] = $brand[0];
    } else {
      $machinery_equipment[$m]['brand_id'] = array(
        "id" => 0,
        "name" => 'N/A'
      );
    }

  }

  $repairs[$key]['ppe_data'] = $machinery_equipment[0];

  if($repair['status_approve'] == 1) {
    $repairs[$key]['color_status'] = 'danger';
    $repairs[$key]['disable_button'] = false;
    $repairs[$key]['status'] = 'Pending';
  } else {
    $repairs[$key]['color_status'] = 'primary';
    $repairs[$key]['disable_button'] = true;
    $repairs[$key]['status_approve'] = 'Aprroved';
  }
  
  $repairs[$key]['list_no'] = $key+1;
  
  }
  
echo json_encode($repairs);

?>