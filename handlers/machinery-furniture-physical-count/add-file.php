<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$machinery_equipment_pi = $con->getData("SELECT * FROM par_machinery_equipment WHERE id = ".$_POST['id']);

$machinery_equipment = $con->getData("SELECT id, property_number, article_id, description, acquisition_cost FROM machinery_equipment WHERE id = ".$machinery_equipment_pi[0]['equipment_id']);
$machinery_equipment_pi[0]['machinery_equipment'] = $machinery_equipment[0];

$article_id = $con->getData("SELECT id, CONCAT(name) as article_name FROM articles WHERE id = ".$machinery_equipment[0]['article_id']);
$machinery_equipment_pi[0]['article_id'] = $article_id[0];

header("Content-Type: application/json");
echo json_encode($machinery_equipment_pi[0]);

?> 
