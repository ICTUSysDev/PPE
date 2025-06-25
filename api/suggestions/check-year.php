<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$check_year = $_POST['checkYear']['year']['year'];
$check_equipment_type = $_POST['checkYear']['equipment_type'];

  $check_years = $con->getData("SELECT id, inventory_date, inventory_module FROM physical_inventory WHERE YEAR(inventory_date) = $check_year AND inventory_module = '$check_equipment_type'");

header("Content-Type: application/json");
echo json_encode($check_years);

?>