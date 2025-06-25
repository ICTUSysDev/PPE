<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$suppliers = $con->getData("SELECT * FROM suppliers");

foreach($suppliers as $key => $supplier) {

  $suppliers[$key]['list_no'] = $key+1;

}

header("Content-Type: application/json");
echo json_encode($suppliers);

?>