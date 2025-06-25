<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

session_start();

$check_user = $con->getData("SELECT id, groups, office_id FROM users WHERE id = ".$_SESSION['id']);

if($check_user[0]['groups'] == 1 || $check_user[0]['groups'] == 2) {

  $furniture_and_fixtures = $con->getData("SELECT * FROM furniture_and_fixtures WHERE status NOT IN('DONATED') AND carrying_amount >=50000 ORDER BY id DESC");

  foreach($furniture_and_fixtures as $key => $furniture_and_fixture) {
  
    $article = $con->getData("SELECT id, name FROM articles WHERE id = ".$furniture_and_fixture['article_id']);
    $furniture_and_fixtures[$key]['article_id'] = $article[0];
  
    $location = $con->getData("SELECT id, building_and_structure_id, building_and_structure_location FROM building_and_structures WHERE id = ".$furniture_and_fixture['furniture_and_fixture_location']);
    if(!empty($location)) {
      $furniture_and_fixtures[$key]['location'] = $location[0];
    } else {
      $furniture_and_fixtures[$key]['location'] =  array('id'=>0, 'building_and_structure_location'=>'N/A');
    }
    
  
    $furniture_and_fixtures[$key]['list_no'] = $key+1;
  
    if($furniture_and_fixtures[$key]['status'] == 'Not Available') {
      $furniture_and_fixtures[$key]['status'] = 'Assigned';
      $furniture_and_fixtures[$key]['status_color'] = 'success';
    } else if($furniture_and_fixtures[$key]['status'] == 'DISPOSED'){
      $furniture_and_fixtures[$key]['status'] = 'DISPOSED';
      $furniture_and_fixtures[$key]['status_color'] = 'danger';
    } else {
      $furniture_and_fixtures[$key]['status'] = 'Available';
      $furniture_and_fixtures[$key]['status_color'] = 'primary';
    }
  }

} else if($check_user[0]['groups'] == 3) {

  $furniture_and_fixtures = $con->getData("SELECT * FROM par_machinery_equipment WHERE equipment_description = 'Furniture and Fixture' AND status = 'PAR' AND accountable_officer = ".$check_user[0]['id']." office_id = ".$check_user[0]['office_id']);

  foreach($furniture_and_fixtures as $key => $furniture_and_fixture) {
  
    $article = $con->getData("SELECT id, name FROM articles WHERE id = ".$furniture_and_fixture['article_id']);
    $furniture_and_fixtures[$key]['article_id'] = $article[0];
  
    $furniture_and_fixtures[$key]['list_no'] = $key+1;
  
    if($furniture_and_fixtures[$key]['status'] == 'Not Available') {
      $furniture_and_fixtures[$key]['status'] = 'Assigned';
      $furniture_and_fixtures[$key]['status_color'] = 'success';
    } else if($furniture_and_fixtures[$key]['status'] == 'DISPOSED'){
      $furniture_and_fixtures[$key]['status'] = 'DISPOSED';
      $furniture_and_fixtures[$key]['status_color'] = 'danger';
    } else {
      $furniture_and_fixtures[$key]['status'] = 'Available';
      $furniture_and_fixtures[$key]['status_color'] = 'primary';
    }
  }

} else if($check_user[0]['groups'] == 4) {

  $furniture_and_fixtures = $con->getData("SELECT * FROM par_machinery_equipment WHERE equipment_description = 'Furniture and Fixture' AND status = 'PAR' AND office_id = ".$check_user[0]['office_id']);

  foreach($furniture_and_fixtures as $index => $furniture_and_fixture) {
    
    $get_furniture_and_fixtures = $con->getData("SELECT * FROM furniture_and_fixtures WHERE id = ".$furniture_and_fixture['equipment_id']);

    // var_dump($get_furniture_and_fixtures); exit();
  
    $article = $con->getData("SELECT id, name FROM articles WHERE id = ".$get_furniture_and_fixtures[0]['article_id']);
    $furniture_and_fixtures[$index]['article_id'] = $article[0];
  
    $furniture_and_fixtures[$index] = $get_furniture_and_fixtures[0];
    $furniture_and_fixtures[$index]['property_number'] = $get_furniture_and_fixtures[0]['property_number'];
    
    if($furniture_and_fixtures[$index]['status'] == 'Not Available') {
      $furniture_and_fixtures[$index]['status'] = 'Assigned';
      $furniture_and_fixtures[$index]['status_color'] = 'success';
    } else if($furniture_and_fixtures[$index]['status'] == 'DISPOSED'){
      $furniture_and_fixtures[$index]['status'] = 'DISPOSED';
      $furniture_and_fixtures[$index]['status_color'] = 'danger';
    } else {
      $furniture_and_fixtures[$index]['status'] = 'Available';
      $furniture_and_fixtures[$index]['status_color'] = 'primary';
    }

    $furniture_and_fixtures[$index]['list_no'] = $index+1;
  }

}

header("Content-Type: application/json");
echo json_encode($furniture_and_fixtures);

?>