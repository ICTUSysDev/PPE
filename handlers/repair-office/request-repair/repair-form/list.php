<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../../db.php';

$con = new pdo_db();

$par_id = $_POST['repairId']['par_id']['id'];
$equipment_id = $_POST['repairId']['equipment_id'];

$repair_history = $con->getData("SELECT *, DATE_FORMAT(repair_date, '%M %d, %Y') AS repair_date  FROM repair_history WHERE equipment_id = $equipment_id  AND par_id = $par_id AND DATE(repair_date) = CURDATE()");

foreach($repair_history as $key => $ri) {

  $repair_history[$key]['list_no'] = $key+1;

}


header("Content-Type: application/json");
echo json_encode($repair_history);

?>