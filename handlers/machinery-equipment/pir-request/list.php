<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

session_start();

$session_user_id = $_SESSION['id'];

$user = $con->getData("SELECT id, office_id FROM users WHERE id = $session_user_id");

$office_id = $con->getData("SELECT id, name, shortname FROM offices WHERE id = ".$user[0]['office_id']);

$office_equipments = $con->getData("SELECT id, par_id, accountable_officer, office_id, equipment_id, equipment_description, status FROM par_machinery_equipment WHERE status = 'PAR' AND equipment_description = 'Machinery Equipment' AND office_id = " .$office_id[0]['id']);

foreach($office_equipments as $key => $office_equipment) {

  $machinery_equipments = $con->getData("SELECT id, coa_description_id, property_number, article_id, brand_id FROM machinery_equipment WHERE id = ".$office_equipment['equipment_id']);

    foreach($machinery_equipments as $index => $machinery_equipment) {

      $article_id = $con->getData("SELECT id, name FROM articles WHERE id = " .$machinery_equipment['article_id']);
      $machinery_equipments[$index]['article_id'] = $article_id[0];

      if($machinery_equipment['brand_id'] != null) {
        $brand_id = $con->getData("SELECT id, name FROM brands WHERE id = " .$machinery_equipment['brand_id']);
        $machinery_equipments[$index]['brand_id'] = $brand_id[0];
      } else {
        $machinery_equipments[$index]['brand_id'] = array(
          'id' => 0,
          'name' => 'N/A'
        );
      }

      $coa_description_id = $con->getData("SELECT id, code_id, account_title FROM charts_of_account WHERE id = " .$machinery_equipment['coa_description_id']);
      $machinery_equipments[$index]['coa_description_id'] = $coa_description_id[0];

    }

  $office_equipments[$key]['machinery_equipment'] = $machinery_equipments[0];

  $office_equipments[$key]['list_no'] = $key+1;

  $check_if_request = $con->getData("SELECT pme.id, pme.equipment_id, prr.id, prr.equipment_id, prr.status FROM par_machinery_equipment AS pme, pre_repair_requests AS prr WHERE prr.status = 1 AND prr.equipment_id = " .$office_equipment['equipment_id']);
  if($check_if_request != null) {
    $office_equipments[$key]['status_request'] = true;
    $office_equipments[$key]['request_status'] = 'Pending PIR';
    $office_equipments[$key]['status_color'] = 'warning';
  } else {
    $office_equipments[$key]['status_request'] = false;
    $office_equipments[$key]['request_status'] = 'Assigned';
    $office_equipments[$key]['status_color'] = 'primary';
  }

}

header("Content-Type: application/json");
echo json_encode($office_equipments);

?>