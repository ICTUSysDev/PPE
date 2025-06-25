<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

$con = new pdo_db("physical_inventory");

date_default_timezone_set('Asia/Manila');
session_start();

$session_user_id = $_SESSION['id'];
$baos_physical_count = $_POST['baosPhysicalCount'];
$equipment_details = $_POST['equipmentDetails'];

$baos_physical_count['inventory_module']="BUILDING AND OTHER STRUCTURES";

$inventory_date =  $baos_physical_count['inventory_date'];
$new_inventory_date = new DateTime($inventory_date);
$baos_physical_count['inventory_date'] = $new_inventory_date->format('Y-m-d'); // MySQL DATETIME format

$baos_physical_count['location'] = $equipment_details['building_and_structure_location'];

if($baos_physical_count['id']) {

	$baos_physical_count['equipment_id']=$equipment_details['id'];
	$baos_physical_count['inventory_by']=$_SESSION['id'];
	$inventory_module = "BUILDING AND OTHER STRUCTURE PHYSICAL INVENTORY";
	$id = $baos_physical_count['id'];
	$baos_physical_count = $con->updateObj($baos_physical_count,'id');

} else {

	$baos_physical_count['equipment_id']=$equipment_details['id'];
	$baos_physical_count['inventory_by']=$_SESSION['id'];
	$inventory_module = "BUILDING AND OTHER STRUCTURE PHYSICAL INVENTORY";
	
	$baos_physical_count = $con->insertObj($baos_physical_count);
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
  "action_data"=>$equipment_details['building_and_structure_location'],
);
$con->insertData($history);

echo $id;

?>