<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

$con = new pdo_db("physical_inventory");

session_start();

$session_user_id = $_SESSION['id'];

$physical_inventory = $_POST['PPEphysicalCount'];
$equipment_description = $_POST['equipment_description'];

//add date to inventory date
$inventory_date =  strtotime($physical_inventory['inventory_date']);
$date_of_inventory = date('Y-m-d H:i:s',strtotime("+1 day",$inventory_date));

if ($equipment_description == 'Machinery Equipment') {
	
	$PPE_inventory['equipment_id']=$physical_inventory['id'];
	$PPE_inventory['location']=$physical_inventory['location'];
	$PPE_inventory['equipment_condition']=$physical_inventory['equipment_condition'];
	$PPE_inventory['remarks']=$physical_inventory['remarks'];
	$PPE_inventory['inventory_by']=$_SESSION['id'];
	$PPE_inventory['inventory_date']=$date_of_inventory;
	$PPE_inventory['inventory_module']="MACHINERY AND EQUIPMENT";
	
	$PPE_inventory = $con->insertObj($PPE_inventory);
	$id = $con->insertId;
} else {

	$PPE_inventory['equipment_id']=$physical_inventory['id'];
	$PPE_inventory['location']=$physical_inventory['location'];
	$PPE_inventory['equipment_condition']=$physical_inventory['equipment_condition'];
	$PPE_inventory['remarks']=$physical_inventory['remarks'];
	$PPE_inventory['inventory_by']=$_SESSION['id'];
	$PPE_inventory['inventory_date']=$date_of_inventory;
	$PPE_inventory['inventory_module']="FURNITURE AND FIXTURES";
	
	$PPE_inventory = $con->insertObj($PPE_inventory);
	$id = $con->insertId;
}

// History
$con->table = "history";
$history = array (
  "user_id"=>$session_user_id,
  "module_id"=>$id,
  "description"=>"QR Generated for Machinery/Furniture Physical Count",
  "module_name"=>"QR Code",
);
$con->insertData($history);

?>