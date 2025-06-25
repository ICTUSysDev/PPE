<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$notification = $con->getData("SELECT *, DATE_FORMAT(created_at,'%M %d, %Y |  %h:%i %p') created_at FROM notifications WHERE id = $_POST[id]");

$user = $con->getData("SELECT id, CONCAT(employee_id,' ',firstname,' ',lastname) fullname, office_id FROM users WHERE id = ".$notification[0]['user_id']);
    
    $unit = $con->getData("SELECT id, shortname FROM offices WHERE id = ".$user[0]['office_id']);
    $user[0]['unit_id'] = $unit[0];

$notification[0]['user_id'] = $user[0];

$con->table = "notifications";

$dismiss = $con->updateData(array("id"=>$_POST['id'],"dismiss"=>1),'id');

header("Content-Type: application/json");
echo json_encode($notification[0]);

?>