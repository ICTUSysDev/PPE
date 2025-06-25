<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$barangay_id = $_POST['barangay_id'];

$barangays = $con->getData("SELECT * FROM barangays WHERE municipality_id = $barangay_id ORDER BY barangay");

echo json_encode($barangays);

?>