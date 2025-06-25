<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

session_start();

$check_user = $con->getData("SELECT id, groups, office_id FROM users WHERE id = ".$_SESSION['id']);

if($check_user[0]['groups'] == 1 || $check_user[0]['groups'] == 2) {
  $par_machinery_equipment = $con->getData("SELECT id, coa_description_id, property_number, article_id, brand_id, status, useful_life FROM machinery_equipment WHERE status NOT IN('DONATED') AND acquisition_cost <=49999 ORDER BY id DESC");

  foreach($par_machinery_equipment as $key => $machinery_equipment) {

    $charts_of_account = $con->getData("SELECT id, code, account_title FROM charts_of_account WHERE id = ".$machinery_equipment['coa_description_id']);
    $par_machinery_equipment[$key]['charts_of_account'] = $charts_of_account[0];
  
    $article = $con->getData("SELECT id, name FROM articles WHERE id = ".$machinery_equipment['article_id']);
    $par_machinery_equipment[$key]['article'] = $article[0];
  
    if(!empty($machinery_equipment[$key]['brand_id'])) {
      $brand = $con->getData("SELECT id, name FROM brands WHERE id = ".$machinery_equipment['brand_id']);
      $par_machinery_equipment[$key]['brand'] = $brand[0];
    } else {
      $par_machinery_equipment[$key]['brand'] = 'N/A';
    }
    
    if($par_machinery_equipment[$key]['status'] == 'Not Available') {
      $par_machinery_equipment[$key]['status'] = 'Assigned';
      $par_machinery_equipment[$key]['status_color'] = 'success';
      $par_machinery_equipment[$key]['status_hide_button'] = true;
    } else if($par_machinery_equipment[$key]['status'] == 'PRI') {
      $par_machinery_equipment[$key]['status'] = 'Pending PRI Request';
      $par_machinery_equipment[$key]['status_color'] = 'warning';
      $par_machinery_equipment[$key]['status_hide_button'] = false;
    } else if($par_machinery_equipment[$key]['status'] == 'APPROVED') {
      $par_machinery_equipment[$key]['status'] = 'PRI Request Approved';
      $par_machinery_equipment[$key]['status_color'] = 'info';
      $par_machinery_equipment[$key]['status_hide_button'] = false;
    } else {
      $par_machinery_equipment[$key]['status'] = 'Available';
      $par_machinery_equipment[$key]['status_color'] = 'primary';
      $par_machinery_equipment[$key]['status_hide_button'] = false;
    }
  
    $par_machinery_equipment[$key]['list_no'] = $key+1;
  
  }

} else if($check_user[0]['groups'] == 4) {

  $par_machinery_equipment = $con->getData("SELECT id, equipment_id, office_id FROM par_machinery_equipment WHERE status = 'ICS' AND office_id = " .$check_user[0]['office_id']);

  foreach($par_machinery_equipment as $index => $pme) {

    $machinery_equipmentss = $con->getData("SELECT id, coa_description_id, property_number, article_id, brand_id, status, useful_life FROM machinery_equipment WHERE id = ".$pme['equipment_id']." AND status NOT IN('DONATED') AND acquisition_cost <=49999 ORDER BY id DESC");

      $charts_of_account = $con->getData("SELECT id, code, account_title FROM charts_of_account WHERE id = ".$machinery_equipmentss[0]['coa_description_id']);
      $par_machinery_equipment[$index]['charts_of_account'] = $charts_of_account[0];

      $article = $con->getData("SELECT id, name FROM articles WHERE id = ".$machinery_equipmentss[0]['article_id']);
      $par_machinery_equipment[$index]['article'] = $article[0];

      if(!empty($machinery_equipment[0]['brand_id'])) {
        $brand = $con->getData("SELECT id, name FROM brands WHERE id = ".$machinery_equipment[0]['brand_id']);
        $par_machinery_equipment[$index]['brand'] = $brand[0];
      } else {
        $par_machinery_equipment[$index]['brand'] = 'N/A';
      }
      
    if($machinery_equipmentss[0]['status'] == 'Not Available') {
      $par_machinery_equipment[$index]['status'] = 'Assigned';
    } else {
      $par_machinery_equipment[$index]['status'] = 'Available';
    }
    if($machinery_equipmentss[$index]['status'] == 'Not Available') {
      $par_machinery_equipment[$index]['status'] = 'Assigned';
      $par_machinery_equipment[$index]['status_color'] = 'success';
      $par_machinery_equipment[$index]['status_hide_button'] = true;
    } else if($machinery_equipmentss[$index]['status'] == 'PRI') {
      $par_machinery_equipment[$index]['status'] = 'Pending PRI Request';
      $par_machinery_equipment[$index]['status_color'] = 'warning';
      $par_machinery_equipment[$index]['status_hide_button'] = false;
    } else if($machinery_equipmentss[$index]['status'] == 'APPROVED') {
      $par_machinery_equipment[$index]['status'] = 'PRI Request Approved';
      $par_machinery_equipment[$index]['status_color'] = 'info';
      $par_machinery_equipment[$index]['status_hide_button'] = false;
    } else {
      $par_machinery_equipment[$index]['status'] = 'Available';
      $par_machinery_equipment[$index]['status_color'] = 'primary';
      $par_machinery_equipment[$index]['status_hide_button'] = false;
    }

    $par_machinery_equipment[$index]['machinery_equipments'] = $machinery_equipmentss[0];
    $par_machinery_equipment[$index]['property_number'] = $machinery_equipmentss[0]['property_number'];

    $par_machinery_equipment[$index]['list_no'] = $index+1;
  }
  
}


header("Content-Type: application/json");
echo json_encode($par_machinery_equipment);

?>