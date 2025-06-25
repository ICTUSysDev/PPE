<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$audit_trails = $con->getData("SELECT * FROM history ORDER BY id DESC");

foreach($audit_trails as $key => $audit_trail) {
  
  $accountable_officer = $con->getData("SELECT id, CONCAT(last_name,', ',first_name,' ',middle_name) name, office_id, employee_id FROM users WHERE id = ".$audit_trail['user_id']);
  $audit_trails[$key]['accountable_officer'] = $accountable_officer[0];

  $audit_trails[$key]['list_no'] = $key+1;

}

header("Content-Type: application/json");
echo json_encode($audit_trails);

?>