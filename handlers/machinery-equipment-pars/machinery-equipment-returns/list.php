<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../../db.php';

$con = new pdo_db();

$machinery_equipment_repars = $con->getData("SELECT id, par_no, accountable_officer, office_id, par_date FROM machinery_equipment_pars WHERE accountable_officer NOT IN(0) AND form_type NOT IN('RETURNED', 'ICS','DONATION')");

foreach($machinery_equipment_repars as $key => $machinery_equipment_repar) {

  $total_equipments = $con->getData("SELECT COUNT(id) AS total_equipment FROM par_machinery_equipment WHERE status IN('PAR', 'RELOCATE', 'REASSIGN') AND equipment_description IN('Machinery Equipment', 'Furniture and Fixture') AND par_id = ".$machinery_equipment_repar['id']);
  $machinery_equipment_repars[$key]['total_equipments'] = $total_equipments[0];

  if($total_equipments[0]['total_equipment'] == 0) {
    $machinery_equipment_repars[$key]['disable_view'] = true;
    $machinery_equipment_repars[$key]['color_view'] = 'danger';
  } else {
    $machinery_equipment_repars[$key]['disable_view'] = false;
    $machinery_equipment_repars[$key]['color_view'] = 'info';
  }

  $accountable_officer = $con->getData("SELECT id, CONCAT(last_name,', ',first_name,' ',middle_name) name, office_id, employee_id FROM users WHERE id = ".$machinery_equipment_repar['accountable_officer']);
  $machinery_equipment_repars[$key]['accountable_officer'] = $accountable_officer[0];

  $office = $con->getData("SELECT id, name FROM offices WHERE id = ".$accountable_officer[0]['office_id']);
  $machinery_equipment_repars[$key]['accountable_officer']['office_id'] = $office[0];

  $machinery_equipment_repars[$key]['list_no'] = $key+1;

}

header("Content-Type: application/json");
echo json_encode($machinery_equipment_repars);

?>