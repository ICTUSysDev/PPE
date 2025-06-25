<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../../../db.php';

$con = new pdo_db();

$return_logs = $con->getData("SELECT id, note FROM machinery_equipment_pars WHERE id = $_POST[id]");

foreach($return_logs as $key => $rl) {
  
  $par_machinery_equipment = $con->getData("SELECT id, par_id, equipment_id, equipment_description, prev_accountable_officer, status FROM par_machinery_equipment WHERE par_id = ".$rl['id']);

  foreach($par_machinery_equipment as $i => $pme) {

    if($pme['equipment_description'] == 'Machinery Equipment') {
      $machinery_equipment = $con->getData("SELECT id, office_id, description, property_number, acquisition_date, acquisition_cost FROM machinery_equipment WHERE id = ".$pme['equipment_id']);
    } else {
      $machinery_equipment = $con->getData("SELECT id, office_id, description, property_number, acquisition_date, carrying_amount AS acquisition_cost FROM furniture_and_fixtures WHERE id = ".$pme['equipment_id']);
    }

    foreach($machinery_equipment as $index => $me) {

      // $office_id = $con->getData("SELECT id, name FROM offices WHERE id = ".$me['office_id']);      
      // $return_logs[0]['office_name'] = $office_id[0]['name'];

      $accountable_officers = $con->getData("SELECT id, CONCAT(last_name,', ',first_name,' ',middle_name) accountable_officer, office_id FROM users WHERE id = ".$pme['prev_accountable_officer']);
      $machinery_equipment[$index]['accountable_officer'] = $accountable_officers[0];

      $office_head = $con->getData("SELECT id, name, head_of_office FROM offices WHERE id = ".$accountable_officers[0]['office_id']);
      $return_logs[0]['office'] = $office_head[0];

      $office_head_name = $con->getData("SELECT id, CONCAT(last_name,', ',first_name,' ',middle_name) office_head_name, position_id FROM users WHERE id = ".$office_head[0]['head_of_office']);
      $return_logs[0]['office']['office_head_name'] = $office_head_name[0];

      $position_name = $con->getData("SELECT id, position_description FROM positions WHERE id = ".$office_head_name[0]['position_id']);
      $return_logs[0]['office']['office_head_name']['position_name'] = $position_name[0]['position_description'];

    }

    $par_machinery_equipment[$i]['machinery_equipment'] = $machinery_equipment[0];

    
    if($par_machinery_equipment[0]['status'] == 'DISPOSAL') {

      $return_logs[0]['for_disposal'] = 'X';
      $return_logs[0]['for_repair'] = ' ';
      $return_logs[0]['for_return_to_stock'] = ' ';
      $return_logs[0]['for_others'] = ' ';

    } else if($par_machinery_equipment[0]['status'] == 'REPAIR') {
      
      $return_logs[0]['for_disposal'] = ' ';
      $return_logs[0]['for_repair'] = 'X';
      $return_logs[0]['for_return_to_stock'] = ' ';
      $return_logs[0]['for_others'] = ' ';

    } else if($par_machinery_equipment[0]['status'] == 'RETURN TO STOCK') {

      $return_logs[0]['for_disposal'] = ' ';
      $return_logs[0]['for_repair'] = ' ';
      $return_logs[0]['for_return_to_stock'] = 'X';
      $return_logs[0]['for_others'] = ' ';

    } else if($par_machinery_equipment[0]['status'] == 'OTHERS') {

      $return_logs[0]['for_disposal'] = ' ';
      $return_logs[0]['for_repair'] = ' ';
      $return_logs[0]['for_return_to_stock'] = ' ';
      $return_logs[0]['for_others'] = 'X';

    }
  }

  $return_logs[$key]['par_machinery_equipment'] = $par_machinery_equipment;

}

$return_logs[0]['current_date'] = date("jS");
$return_logs[0]['current_month'] = date("F");
$return_logs[0]['current_year'] = date("Y");

header("Content-Type: application/json");
echo json_encode($return_logs[0]);

?>