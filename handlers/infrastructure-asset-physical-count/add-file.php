<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$ia_view = $con->getData("SELECT id, infrastructure_id_number, infrastructure_location, infrastructure_component FROM infrastructure_assets WHERE id = $_POST[id]");

header("Content-Type: application/json");
echo json_encode($ia_view[0]);

?> 