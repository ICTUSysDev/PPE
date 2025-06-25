<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$employees = $con->getData("SELECT id, CONCAT(first_name,' ',last_name) fullname, email, office_id, employment_status, groups FROM users WHERE groups = 3");

foreach($employees as $key => $employee) {

  if(!empty($employee['office_id'])) {
    $office = $con->getData("SELECT id, shortname FROM offices WHERE id = ".$employee['office_id']);
    $employees[$key]['office'] = $office[0];
  } else {
    $employees[$key]['office']['shortname'] = 'N/A';
  }

  $group = $con->getData("SELECT id, name FROM groups WHERE id = ".$employee['groups']);
  $employees[$key]['groups'] = $group[0];

  $employees[$key]['list_no'] = $key+1;

}

header("Content-Type: application/json");
echo json_encode($employees);

?>