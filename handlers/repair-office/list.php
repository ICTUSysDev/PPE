<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$repairs_offices = $con->getData("SELECT id, par_id, accountable_officer, equipment_id, remarks, status_approve, status_release FROM pre_repair_requests WHERE status_approve = 0 ORDER BY status_approve ASC");

foreach($repairs_offices as $key => $ro) {

  $machinery_equipment = $con->getData("SELECT id, coa_description_id, property_number, article_id, brand_id, remarks FROM machinery_equipment WHERE id = ".$ro['equipment_id']);
  $repairs_offices[$key]['machinery_equipment'] = $machinery_equipment[0];

  foreach($machinery_equipment as $index => $me) {

    $charts_of_account = $con->getData("SELECT id, code, account_title FROM charts_of_account WHERE id = ".$me['coa_description_id']);
    $repairs_offices[$key]['charts_of_account'] = $charts_of_account[0];
    
    $article = $con->getData("SELECT id, name FROM articles WHERE id = ".$me['article_id']);
    $repairs_offices[$key]['article'] = $article[0];
    if($me['brand_id'] != null) {
      $brand = $con->getData("SELECT id, name FROM brands WHERE id = ".$me['brand_id']);
      $repairs_offices[$key]['brand'] = $brand[0];
    } else {
      $repairs_offices[$key]['brand'] = array(
        "id" => 0,
        "name" => 'N/A'
      );
    }

  }
    
  $requested_by = $con->getData("SELECT id, CONCAT(first_name,' ',last_name) AS fullname, office_id FROM users WHERE id = ".$ro['accountable_officer']);
  $repairs_offices[$key]['requested_by'] = $requested_by[0];

  $repairs_offices[$key]['list_no'] = $key+1;

  if($ro['status_release'] == 0) {
    $repairs_offices[$key]['pri_status'] = 'Not Release';
    $repairs_offices[$key]['pri_status_color'] = 'danger';
  } else {
    $repairs_offices[$key]['pri_status'] = 'Released';
    $repairs_offices[$key]['pri_status_color'] = 'primary';
  }

}

header("Content-Type: application/json");
echo json_encode($repairs_offices);

?>