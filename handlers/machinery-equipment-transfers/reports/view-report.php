<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../../db.php';

$con = new pdo_db();

$report_transfer = $con->getData("SELECT * FROM machinery_equipment_pars WHERE id = $_POST[id]");

$signatory = $con->getData("SELECT id, CONCAT(first_name,' ',last_name) AS signatory_name, position FROM signatories");
$report_transfer[0]['signatory'] = $signatory[0];

$approved_by = $con->getData("SELECT id, CONCAT(first_name,' ',last_name) AS signatory_name, position FROM signatories WHERE code = 'PGSO' LIMIT 1");
$report_transfer[0]['approved_by'] = $approved_by[0];

foreach($report_transfer as $index => $rt) {

  $par_machinery_equipment = $con->getData("SELECT id, par_id, accountable_officer, prev_accountable_officer, equipment_id, equipment_description, status FROM par_machinery_equipment WHERE par_id = ".$rt['id']);

  foreach($par_machinery_equipment as $key => $pme) {

    if($pme['equipment_description'] == 'Machinery Equipment') {
      $machinery_equipment = $con->getData("SELECT id, property_number, description, acquisition_date, acquisition_cost, equipment_condition FROM machinery_equipment WHERE id = ". $pme['equipment_id']);
      $par_machinery_equipment[$key]['machinery_equipment'] = $machinery_equipment[0];
    } else {
      $machinery_equipment = $con->getData("SELECT id, property_number, description, acquisition_date, carrying_amount AS acquisition_cost, furniture_and_fixture_condition AS equipment_condition FROM furniture_and_fixtures WHERE id = ". $pme['equipment_id']);
      $par_machinery_equipment[$key]['machinery_equipment'] = $machinery_equipment[0];
    }

    if($rt['form_type'] != 'DONATION') {
      $accountable_officer = $con->getData("SELECT id, CONCAT(first_name,' ',last_name) AS accountable_officer, position_id FROM users WHERE id = ".$pme['accountable_officer']);
      $report_transfer[0]['accountable_officer'] = $accountable_officer[0];
    } else {
      $report_transfer[0]['accountable_officer'] = array(
        'id' => 0,
        'accountable_officer' => $rt['beneficiary']
      );
    }

      $prev_accountable_officer = $con->getData("SELECT id, CONCAT(first_name,' ',last_name) AS prev_accountable_officer, position_id FROM users WHERE id = ".$pme['prev_accountable_officer']);
      $report_transfer[0]['prev_accountable_officer'] = $prev_accountable_officer[0];

    if($rt['form_type'] != 'DONATION') {
      $position = $con->getData("SELECT id, position_description FROM positions WHERE id = ". $accountable_officer[0]['position_id']);
      $report_transfer[0]['accountable_officer']['position'] = $position[0];
    } else {
      $report_transfer[0]['accountable_officer']['position'] = array(
        'id' => 0,
        'position_description' => 'N/A'
      );
    }

  }
  $report_transfer[0]['status'] = $par_machinery_equipment[0]['status'];
  $report_transfer[$index]['par_machinery_equipment'] = $par_machinery_equipment;

}

header("Content-Type: application/json");
echo json_encode($report_transfer[0]);

?>