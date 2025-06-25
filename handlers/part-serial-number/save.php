<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

$con = new pdo_db("parts_serial_number");

session_start();

$session_user_id = $_SESSION['id'];
$part_serial_number = $_POST['partSerialNumber'];
$machinery_equipmentId = $_POST['machineryEquipmentId'];

if ($part_serial_number['id']) {

	$wording = 'Updated';
	$action_data = $part_serial_number['serial_number'];
	$part_serial_number['machinery_equipment_id'] = $_POST['machineryEquipmentId'];
	$id = $part_serial_number['id'];
	$part_serial_number = $con->updateObj($part_serial_number,'id');

} else {

	$wording = 'Added';
	$action_data = $part_serial_number['serial_number'];

	$part_serial_number['machinery_equipment_id'] = $_POST['machineryEquipmentId'];
	$part_serial_number = $con->insertObj($part_serial_number);
	$id = $con->insertId;

}

// History
$con->table = "history";
$history = array (
  "user_id"=>$session_user_id,
  "module_id"=>$machinery_equipmentId,
  "description"=>"$wording a serial number",
	"action_name"=>strtoupper($wording),
  "module_name"=>"SERIAL NUMBER",
	"action_data"=>$action_data,
);
$con->insertData($history);


?>