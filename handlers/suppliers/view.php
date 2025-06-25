<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$supplier = $con->getData("SELECT * FROM suppliers WHERE id = $_POST[id]");

header("Content-Type: application/json");
echo json_encode($supplier[0]);

?> 
