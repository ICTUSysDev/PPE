<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$session_user_id = $_SESSION['id'];

$con = new pdo_db("upload_files");

$data_file = $_POST['dataFile'];
$module_name = $_POST['module_name'];

if($module_name == 'LAND') {
  $module_pathname = 'lands';
} else if($module_name == 'LAND IMPROVEMENT') {
  $module_pathname = 'land-improvements';
} else if($module_name == 'INFRASTRUCTURE ASSET') {
  $module_pathname = 'infrastructure-assets';
} else if($module_name == 'BUILDING AND OTHER STRUCTURE') {
  $module_pathname = 'building-and-other-structures';
} else if($module_name == 'MACHINERY AND EQUIPMENT') {
  $module_pathname = 'machinery-equipment';
} else if($module_name == 'FURNITURE AND FIXTURE') {
  $module_pathname = 'furniture-and-fixtures';
} else if($module_name == 'MACHINERY AND EQUIPMENT ICS') {
  $module_pathname = 'machinery-equipment-ics';
} else if($module_name == 'PAR') {
  $module_pathname = 'machinery-equipment-pars';
} else if($module_name == 'REPAIR OFFICE') {
  $module_pathname = 'repair-office';
} else if($module_name == 'ICS PAR') {
  $module_pathname = 'ics-pars';
} else if($module_name == 'MACHINERY AND EQUIPMENT PHYSICAL INVENTORY MACHINERY EQUIPMENT') {
  $module_pathname = 'machinery-equipment-pi';
} else if($module_name == 'MACHINERY AND EQUIPMENT PHYSICAL INVENTORY FURNITURE AND FIXTURE') {
  $module_pathname = 'machinery-equipment-pi';
} else if($module_name == 'LAND AND LAND IMPROVEMENT PHYSICAL INVENTORY') {
  $module_pathname = 'land-and-land-improvements-pi';
} else if($module_name == 'INFRASTRUCTURE ASSET PHYSICAL INVENTORY') {
  $module_pathname = 'infrastructure-assets-pi';
} else if($module_name == 'BUILDING AND OTHER STRUCTURE PHYSICAL INVENTORY') {
  $module_pathname = 'building-and-structures-pi';
}

// History
$con->table = "history";
$history = array (
  "user_id"=>$session_user_id,
  "module_id"=>$data_file['id'],
  "description"=>"Deleted a File in ".$module_name,
  "action_name"=>"REMOVED",
  "module_name"=>$module_name,
  "action_data"=>$data_file['file_name'],
);
$con->insertData($history);

$sql = "DELETE FROM upload_files WHERE id = ".$data_file['id'];
$con->query($sql);

$path='../../assets/files/'. $module_pathname .'/'.$data_file['file_name'];
unlink($path);

header("Content-Type: application/json");
echo json_encode($data_file);

?>