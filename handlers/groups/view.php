<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$group = $con->getData("SELECT * FROM groups WHERE id = $_POST[id]");

header("Content-Type: application/json");
echo json_encode($group[0]);

?> 
