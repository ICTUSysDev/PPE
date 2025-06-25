<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

$con = new pdo_db("upload_files");

session_start();

$countfiles = count($_FILES['files']['name']);

$files_arr = array();

for($index = 0;$index < $countfiles;$index++){

  $file_generated = sprintf('Infrastructure-Assets-'.'%04X%04X', mt_rand(0, 65535), mt_rand(0, 65535));
    
  if(isset($_FILES['files']['name'][$index]) && $_FILES['files']['name'][$index] != ''){
    
    $filename = str_replace(' ', '', $_FILES['files']['name'][$index]);

    $ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));

    $valid_ext = array("png","jpeg","jpg","pdf");

    if(in_array($ext, $valid_ext)){

    $path = "../../assets/files/infrastructure-assets/".basename($filename, ".$ext").'-'.$file_generated.'.'.$ext;

      if(move_uploaded_file($_FILES['files']['tmp_name'][$index],$path)){
      $files_arr[$index]['name'] = basename($path);

      $filesize = $_FILES['files']['size'][$index];
      $files_arr[$index]['size'] = $filesize;
      }
    }
    
  }
}

echo json_encode($files_arr);

die;

?>
