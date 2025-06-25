<?php
header("Content-Type: application/json");
$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';
require_once '../../system_privileges.php';
require_once '../../classes.php';

$con = new pdo_db();

$con = new pdo_db("groups");

$groups = $con->getData("SELECT * FROM groups");

foreach($groups as $key => $group) {

  
  $users_count = $con->getData("SELECT id, COUNT(groups) as user_count FROM users WHERE groups = ".$group['id']." GROUP BY id");
  // Check if there is any result
  if (!empty($users_count)) {
      $groups[$key]['users_count'] = $users_count[0]['user_count']; // Access user_count if it exists
  } else {
      $groups[$key]['users_count'] = 0; // Default value if no users are found
  }

  $group_privileges = $con->get(array("id"=>$group['id']),["privileges"]);

  $privileges_obj = new privileges(system_privileges,$group_privileges[0]['privileges']);
  $groups[$key]['is_show'] = $privileges_obj->getPrivileges();

  $groups[$key]['list_no'] = $key+1;

}

echo json_encode($groups);

?>