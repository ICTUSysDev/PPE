<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../../db.php';

$con = new pdo_db();

$inventory_by = $con->getData("SELECT pi.id, pi.inventory_by AS inventory_by_id, u.id AS user_id, CONCAT(u.first_name, ' ', u.last_name) AS inventory_by FROM physical_inventory AS pi JOIN users AS u ON pi.inventory_by = u.id GROUP BY pi.id, pi.inventory_by, u.id");

header("Content-Type: application/json");
echo json_encode($inventory_by);

?>