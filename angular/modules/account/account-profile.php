<?php

require_once '../../../db.php';
require_once '../../../system_privileges.php';
require_once '../../../classes.php';

session_start();

if (!isset($_SESSION['id'])) header('X-Error-Message: Session timeout', true, 500);

$con = new pdo_db("users");
// sql "CONCAT(first_name,' ',last_name) 'names', 'groups', 'email' ";
// echo "<br>";
$account = $con->get(["id"=>$_SESSION['id']],["CONCAT(first_name,' ',last_name) names, groups, email "]);

// $avatar = "angular/modules/account/avatar.png";

$session_user_id = $_SESSION['id'];

$profile_picture = $con->getData("SELECT * FROM profile_picture WHERE user_id = $session_user_id ORDER BY id DESC LIMIT 1");
if(!empty($profile_picture[0])) {
  $profile_picture[0]['profile_picture'] = $profile_picture[0];
} else {
  $profile_picture[0]['profile_picture'] = array(
    "id" => 1,
    "img_name" => '300-2.jpg'
  );
}

$con->table = "groups";

$group_privileges = $con->get(array("id"=>$account[0]['groups']),["privileges"]);

$pages_access = [];
if (count($group_privileges)) {
	if ($group_privileges[0]['privileges']!=NULL) {

		$privileges_obj = new privileges(system_privileges,$group_privileges[0]['privileges']);
		$pages_access = $privileges_obj->getPagesPrivileges();

	};
}

$account[0]['pages_access'] = $pages_access;

$group = $con->getData("SELECT id, name FROM groups WHERE id = ".$account[0]['groups']);
$account[0]['as'] = $group[0];

// if($account[0]['unit_id']!=null){
// 	$get_unit = $con->getData("SELECT id, unit_name, unit_shortname FROM units WHERE id = ".$account[0]['unit_id']);
// 	$unit = $get_unit[0];
// }

$profile = array(
	"groups"=>$account[0]['groups'],
	"account_profile"=>$account[0],
	"pages_access"=>$pages_access,
	"profile_picture"=>$profile_picture[0]['profile_picture'],
);

echo json_encode($profile);

?>