<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

$con = new pdo_db("physical_inventory");

date_default_timezone_set('Asia/Manila');
session_start();

$session_user_id = $_SESSION['id'];
$ia_physical_count = $_POST['iaPhysicalCount'];
$equipment_details = $_POST['equipmentDetails'];

$ia_physical_count['inventory_module'] = 'INFRASTRUCTURE ASSET';

$inventory_date =  $ia_physical_count['inventory_date'];
$new_inventory_date = new DateTime($inventory_date);
$ia_physical_count['inventory_date'] = $new_inventory_date->format('Y-m-d'); // MySQL DATETIME format

$ia_physical_count['location'] = $equipment_details['infrastructure_location'];

if($ia_physical_count['id']) {

	$ia_physical_count['equipment_id']=$equipment_details['id'];
	$ia_physical_count['inventory_by']=$_SESSION['id'];
	$inventory_module = "INFRASTRUCTURE ASSET PHYSICAL INVENTORY";
	$id = $ia_physical_count['id'];
	$ia_physical_count = $con->updateObj($ia_physical_count,'id');

} else {

	$ia_physical_count['equipment_id']=$equipment_details['id'];
	$ia_physical_count['inventory_by']=$_SESSION['id'];
	$inventory_module = "INFRASTRUCTURE ASSET PHYSICAL INVENTORY";
	
	$ia_physical_count = $con->insertObj($ia_physical_count);
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
  "action_data"=>$equipment_details['infrastructure_id_number'],
);
$con->insertData($history);

echo $id;

?>