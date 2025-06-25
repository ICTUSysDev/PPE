<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../../db.php';

$con = new pdo_db("par_machinery_equipment");

session_start();

$session_user_id = $_SESSION['id'];
$office_equipment = $_POST['officeEquipment'];
$note = $_POST['note'];
$equipment_id = $office_equipment['id'];

// var_dump($equipment_id); exit();

$par_data = $con->getData("SELECT id, par_id, accountable_officer, equipment_id FROM par_machinery_equipment WHERE equipment_id = ".$equipment_id." AND status IN('PAR', 'RELOCATE', 'REASSIGNMENT') ORDER BY id DESC");

$get_equipment_status = $con->getData("SELECT pme.id, pme.equipment_id, prr.id, prr.equipment_id, prr.status_approve FROM par_machinery_equipment AS pme, pre_repair_requests AS prr WHERE prr.status_approve = 1 AND prr.equipment_id = " .$equipment_id);

// var_dump($get_equipment_status[0]['equipment_id']); exit();
// if($get_equipment_status != null) {

  if(isset($get_equipment_status[0]['equipment_id']) != $equipment_id) {
  
    $con->table = "pre_repair_requests";
      $pre_repair_requests = array (
        "par_id"=>$par_data[0]['par_id'],
        "accountable_officer"=>$par_data[0]['accountable_officer'],
        "equipment_id"=>$par_data[0]['equipment_id'],
        "remarks"=>$note,
        "status_approve"=>1,
        "requested_by"=>$session_user_id,
      );
    $con->insertData($pre_repair_requests);

    
    $sql = "UPDATE machinery_equipment SET status = 'PRI' WHERE id = ".$par_data[0]['equipment_id'];
    $con->query($sql);

    $errorMsg['errorMsg'] = "success";
  } else {
    $errorMsg['errorMsg'] = "error";
  }

// } 

// var_dump($get_equipment_status[0]['asdsd']); exit();


// $get_par_no = $con->getData("SELECT id, par_no FROM machinery_equipment_pars WHERE id = " .$office_equipment['par_id']);

// $con->table = "machinery_equipment_pars";
// $machinery_equipment_pars = array (
//   "par_no"=>$get_par_no[0]['par_no'],
//   "accountable_officer"=>$office_equipment['accountable_officer'],
//   "office_id"=>$office_equipment['office_id'],
//   "par_date"=>$currentDateTime = date("Y-m-d"),
//   "note"=>"Request for Pre-repair Inspection",
//   "form_type"=>"RETURNED",
//   "added_by"=>$session_user_id,
// );
// $con->insertData($machinery_equipment_pars);
// $par_id = $con->insertId;

// $con->table = "par_machinery_equipment";
// $par_machinery_equipment = array (
//   "par_id"=>$par_id,
//   "accountable_officer"=>$office_equipment['accountable_officer'],
//   "prev_accountable_officer"=>$office_equipment['accountable_officer'],
//   "office_id"=>$office_equipment['office_id'],
//   "equipment_id"=>$office_equipment['equipment_id'],
//   "equipment_description"=>"Machinery Equipment",
//   "status"=>"REPAIR",
//   "created_by"=>$session_user_id,
// );
// $con->insertData($par_machinery_equipment);

// History
$con->table = "history";
$history = array (
  "user_id"=>$session_user_id,
  "module_id"=>$office_equipment['id'],
  "description"=>"Requested a Pre-repair Inspection",
  "module_name"=>"REPAIR",
);
$con->insertData($history);

header("Content-Type: application/json");
echo json_encode($errorMsg);

?>
