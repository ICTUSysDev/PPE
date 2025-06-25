<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

$con = new pdo_db("physical_inventory");

date_default_timezone_set('Asia/Manila');
session_start();

$session_user_id = $_SESSION['id'];

$physical_inventory = $_POST['PPEphysicalCount'];
$equipment_details = $_POST['equipmentDetails'];
$equipment_description = $_POST['equipment_description'];

$inventory_date =  $physical_inventory['inventory_date'];
$new_inventory_date = new DateTime($inventory_date);
$physical_inventory['inventory_date'] = $new_inventory_date->format('Y-m-d H:i:s'); // MySQL DATETIME format

if ($equipment_description == 'Machinery Equipment') {

	if($physical_inventory['id']) {

		$physical_inventory['equipment_id']=$equipment_details['id'];
		$physical_inventory['inventory_by']=$_SESSION['id'];
		$physical_inventory['inventory_module']="MACHINERY AND EQUIPMENT";
		$inventory_module = "MACHINERY AND EQUIPMENT PHYSICAL INVENTORY";
		$id = $physical_inventory['id'];
		$physical_inventory = $con->updateObj($physical_inventory,'id');

	} else {

		$physical_inventory['equipment_id']=$equipment_details['id'];
		$physical_inventory['inventory_by']=$_SESSION['id'];
		$physical_inventory['inventory_module']="MACHINERY AND EQUIPMENT";
		$inventory_module = "MACHINERY AND EQUIPMENT PHYSICAL INVENTORY";
		
		$physical_inventory = $con->insertObj($physical_inventory);
		$id = $con->insertId;

	}
	
} else {

	if($physical_inventory['id']) {

		$physical_inventory['equipment_id']=$equipment_details['id'];
		$physical_inventory['inventory_by']=$_SESSION['id'];
		$physical_inventory['inventory_module']="FURNITURE AND FIXTURES";
		$inventory_module = "FURNITURE AND FIXTURES PHYSICAL INVENTORY";
		$id = $physical_inventory['id'];
		$physical_inventory = $con->updateObj($physical_inventory,'id');

	} else {

		$physical_inventory['equipment_id']=$equipment_details['id'];
		$physical_inventory['inventory_by']=$_SESSION['id'];
		$physical_inventory['inventory_module']="MACHINERY AND EQUIPMENT";
		$inventory_module = "MACHINERY AND EQUIPMENT PHYSICAL INVENTORY";
		
		$physical_inventory = $con->insertObj($physical_inventory);
		$id = $con->insertId;

	}

}

// History
$con->table = "history";
$history = array (
  "user_id"=>$session_user_id,
  "module_id"=>$id,
  "description"=>"Added physical inventory",
	"action_name"=>"ADDED",
  "module_name"=>$inventory_module,
  "action_data"=>$equipment_details['property_number'],
);
$con->insertData($history);

echo $physical_inventory;

?>