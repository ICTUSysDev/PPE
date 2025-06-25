<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$assign_to = $con->getData("SELECT id, par_id, accountable_officer, office_id, equipment_id, status IN('REASSIGN', 'PAR', 'RELOCATE', 'REPAIR') FROM par_machinery_equipment WHERE equipment_id = $_POST[id] AND equipment_description = 'Furniture and Fixture' ORDER BY id DESC LIMIT 1");

if(isset($assign_to[0])) {
  
  $machinery_equipment_pars = $con->getData("SELECT id, par_date FROM machinery_equipment_pars WHERE id = ".$assign_to[0]['par_id']);
  $assign_to[0]['par_date'] = isset($machinery_equipment_pars[0])?$machinery_equipment_pars[0]:null;
  
  $office = $con->getData("SELECT id, name FROM offices WHERE id = ".$assign_to[0]['office_id']);
  $assign_to[0]['office'] = isset($office[0])?$office[0]:null;
  
  $accountable_officer = $con->getData("SELECT id, CONCAT(last_name,', ',first_name) name FROM users WHERE id = ".$assign_to[0]['accountable_officer']);
  $assign_to[0]['accountable_officer'] = isset($accountable_officer[0])?$accountable_officer[0]:null;
}


// $article = $con->getData("SELECT *, CONCAT(coa_code) code FROM articles WHERE id = ".$machinery_equipment[0]['article_id']);
// $machinery_equipment[0]['article_id'] = $article[0];

// if($machinery_equipment[0]['brand_id']=null){
//   $brand = $con->getData("SELECT * FROM brands WHERE id = ".$machinery_equipment[0]['brand_id']);
//   $machinery_equipment[0]['brand_id'] = $brand[0];
// }

// $fund = $con->getData("SELECT id, name FROM funds WHERE id = ".$machinery_equipment[0]['fund_id']);
// $machinery_equipment[0]['fund_id'] = $fund[0];

// $supplier = $con->getData("SELECT id, name FROM funds WHERE id = ".$machinery_equipment[0]['supplier_id']);
// $machinery_equipment[0]['supplier_id'] = $supplier[0];

header("Content-Type: application/json");
echo json_encode(isset($assign_to[0])?$assign_to[0]:null);

?> 
