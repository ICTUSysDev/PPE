<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$repair_history = $con->getData("SELECT * FROM repair_history WHERE equipment_id = ".$_POST['equipmentId']);

foreach($repair_history as $key => $rh) {

  $machinery_equipment = $con->getData("SELECT * FROM machinery_equipment WHERE id = ".$rh['equipment_id']);
  $repair_history[$key]['machinery_equipment'] = $machinery_equipment[0];

  $waste_materials = $con->getData("SELECT id, SUM(amount) AS total_amount FROM waste_materials WHERE pre_repair_id = ".$rh['pri_id']." GROUP BY id");
  if(!empty($waste_materials[0])) {
    $repair_history[$key]['waste_materials'] = $waste_materials[0];
  }

  $repair_history[$key]['list_no'] = $key+1;

$acquisition_year = (int)substr($machinery_equipment[0]['acquisition_date'], 0, 4);
$release_year = isset($rh['date_release']) ? (int)substr($rh['date_release'], 0, 4) : 0; // Default to 0 or handle accordingly
  
  $repair_history[$key]['property_life_remaining'] = $release_year - $acquisition_year;

  if($repair_history[$key]['property_life_remaining'] == 5) {
    $repair_history[$key]['property_life'] = 100;
    $repair_history[$key]['property_life_color'] = 'primary';
  } else if($repair_history[$key]['property_life_remaining'] == 4) {
    $repair_history[$key]['property_life'] = 75;
    $repair_history[$key]['property_life_color'] = 'primary';
  } else if($repair_history[$key]['property_life_remaining'] == 3) {
    $repair_history[$key]['property_life'] = 50;
    $repair_history[$key]['property_life_color'] = 'primary';
  } else if($repair_history[$key]['property_life_remaining'] == 2) {
    $repair_history[$key]['property_life'] = 25;
    $repair_history[$key]['property_life_color'] = 'warning';
  } else if($repair_history[$key]['property_life_remaining'] == 1) {    
    $repair_history[$key]['property_life'] = 1;
    $repair_history[$key]['property_life_color'] = 'warning';
  } else if($repair_history[$key]['property_life_remaining'] == 0) {    
    $repair_history[$key]['property_life'] = 0;
    $repair_history[$key]['property_life_color'] = 'danger';
  }

}

// header("Content-Type: application/json");
echo json_encode($repair_history);
?>
