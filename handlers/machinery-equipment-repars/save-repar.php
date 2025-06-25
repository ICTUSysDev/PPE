<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

session_start();

$con = new pdo_db("par_machinery_equipment");

$session_user_id = $_SESSION['id'];

$repar_machinery_equipment = $_POST['reparMachineryEquipment'];
var_dump($repar_machinery_equipment['property_number']);exit();
$repar_note = $_POST['reparNote']['note'];

if ($repar_machinery_equipment['id']) {
	
	unset($repar_machinery_equipment['article_id']);
	unset($repar_machinery_equipment['brand_id']);
	unset($repar_machinery_equipment['property_number']);
	unset($repar_machinery_equipment['list_no']);
	
	$sql = "UPDATE machinery_equipment SET status = 'Available' WHERE id = ".$repar_machinery_equipment['equipment_id'];
	$con->query($sql);
	
	$sql = "UPDATE machinery_equipment_pars SET note = '$repar_note' WHERE id = ".$repar_machinery_equipment['par_id'];
	$con->query($sql);

	$repar_machinery_equipment['status'] = 'REPAR';
	$repar_machinery_equipment['created_by'] = $session_user_id;
	$repar_machinery_equipment = $con->updateObj($repar_machinery_equipment,'id');

} else {

}

?>