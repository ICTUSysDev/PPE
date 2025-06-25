<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$signatories = $con->getData("SELECT id, code, module, CONCAT(first_name, ' ', last_name) as `name`, office, position, date_of_assumption  FROM signatories ORDER BY first_name ASC");

foreach($signatories as $key => $signatory) {

  $signatories[$key]['list_no'] = $key+1;

}

header("Content-Type: application/json");
echo json_encode($signatories);

?>