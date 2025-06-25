<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$machinery_equipment_id = $_POST['machineryEquipmentId'];

$part_serial_numbers = $con->getData("SELECT id, part, serial_number FROM parts_serial_number WHERE machinery_equipment_id = $machinery_equipment_id");

foreach($part_serial_numbers as $key => $part_serial_number) {

  $part_serial_numbers[$key]['list_no'] = $key+1;

}


header("Content-Type: application/json");
echo json_encode($part_serial_numbers);

?>