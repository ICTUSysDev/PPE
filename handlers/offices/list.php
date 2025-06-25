<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$offices = $con->getData("SELECT id, name, shortname, head_of_office FROM offices");

foreach($offices as $key => $office) {
  
  if($office['head_of_office'] != null) {
    $head_of_offices = $con->getData("SELECT id, CONCAT(last_name,',',' ', first_name,' ', middle_name) fullname FROM users WHERE id = ".$office['head_of_office']);
    $offices[$key]['head_of_office'] = $head_of_offices[0];
  } else {
    $offices[$key]['head_of_office']['fullname'] = 'N/A';
  }

  $offices[$key]['list_no'] = $key+1;

}

header("Content-Type: application/json");
echo json_encode($offices);

?>