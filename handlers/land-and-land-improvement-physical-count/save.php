<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

$con = new pdo_db("physical_inventory");

date_default_timezone_set('Asia/Manila');
session_start();

$session_user_id = $_SESSION['id'];
$lali_physical_count = $_POST['laliPhysicalCount'];
$equipment_details = $_POST['equipmentDetails'];

$inventory_date =  $lali_physical_count['inventory_date'];
$new_inventory_date = new DateTime($inventory_date);
$lali_physical_count['inventory_date'] = $new_inventory_date->format('Y-m-d H:i:s'); // MySQL DATETIME format

$lali_physical_count['inventory_module'] = 'LAND AND LAND IMPROVEMENTS';

if($lali_physical_count['id']) {

	$lali_physical_count['equipment_id']=$equipment_details['id'];
	$lali_physical_count['inventory_by']=$_SESSION['id'];
	$inventory_module = "LAND AND LAND IMPROVEMENTS PHYSICAL INVENTORY";
	$id = $lali_physical_count['id'];
	$lali_physical_count = $con->updateObj($lali_physical_count,'id');

} else {

	$lali_physical_count['equipment_id']=$equipment_details['id'];
	$lali_physical_count['inventory_by']=$_SESSION['id'];
	$inventory_module = "LAND AND LAND IMPROVEMENTS PHYSICAL INVENTORY";
	
	$lali_physical_count = $con->insertObj($lali_physical_count);
	$id = $con->insertId;

}
	
// History
$con->table = "history";
$history = array (
  "user_id"=>$session_user_id,
  "module_id"=>$id,
  "description"=>"Added physical inventory",
	"action_name"=>"ADDED",
  "module_name"=>$inventory_module,
  "action_data"=>$equipment_details['land_code'],
);
$con->insertData($history);

echo $id;

?>