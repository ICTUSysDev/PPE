<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

$con = new pdo_db("profile_picture");

session_start();

$session_id = $_SESSION['id'];

$profile_settings = $con->getData("SELECT id, groups FROM users WHERE id = $session_id");

$group = $con->getData("SELECT id, name FROM groups WHERE id = ".$profile_settings[0]['groups']);
$profile_settings[0]['groups'] = $group[0];

$files_arr = array();
$file_generated = sprintf(str_replace(' ','-',$group[0]['name']).'-'.'%04X%04X', mt_rand(0, 65535), mt_rand(0, 65535));
$filename = str_replace(' ', '', $_FILES['file']['name']);
$ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));

$valid_ext = array("png","jpeg","jpg","pdf");

if(in_array($ext, $valid_ext)){

$path = "../../assets/images/profiles/$file_generated.$ext";

  if(move_uploaded_file($_FILES['file']['tmp_name'],$path)){
  $files_arr['name'] = basename($path);

  }
}

  
	$con->table = "profile_picture";
	$profile_picture = array (
		"user_id" => $session_id,
		"img_name" => $file_generated.'.'.$ext,
	);
	$con->insertObj($profile_picture);

echo json_encode($files_arr);

die;

?>
