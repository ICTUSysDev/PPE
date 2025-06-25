<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$users = $con->getData("SELECT id, CONCAT(first_name,' ',last_name) fullname, employee_id, office_id, status, groups FROM users ORDER BY groups ASC");

foreach($users as $key => $user) {

  if($user['office_id'] != null) {
    $office = $con->getData("SELECT id, shortname FROM offices WHERE id = ".$user['office_id']);
    $users[$key]['office'] = $office[0];
  }

  if($user['status'] == 1) {
    $users[$key]['status']  = 'Activated';
  } else {
    $users[$key]['status']  = 'Not Activated';
  }

  $group = $con->getData("SELECT id, name FROM groups WHERE id = ".$user['groups']);
  $users[$key]['groups'] = $group[0];

  $users[$key]['list_no'] = $key+1;

}

header("Content-Type: application/json");
echo json_encode($users);

?>