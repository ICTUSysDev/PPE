<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();
session_start();

$user = $con->getData("SELECT id, groups FROM users WHERE id = ".$_SESSION['id']);

if($user[0]['groups'] != 3) {
    $employees = $con->getData("SELECT users.id, CONCAT(users.last_name, ', ', users.first_name) AS employee_name, users.employee_id, offices.name as office_name, offices.shortname as office_shortname FROM users INNER JOIN offices ON users.office_id = offices.id  ORDER BY employee_name");

    foreach($employees as $key => $listOfEmployees) {
        $employees[$key]['list_no']=$key+1;
    }
} else {
    $employees = $con->getData("SELECT users.id, CONCAT(users.last_name, ', ', users.first_name) AS employee_name, users.employee_id, offices.name as office_name, offices.shortname as office_shortname FROM users INNER JOIN offices ON users.office_id = offices.id  AND users.id = ".$user[0]['id']." ORDER BY employee_name");

    foreach($employees as $key => $listOfEmployees) {
        $employees[$key]['list_no']=$key+1;
    }
}

header("Content-Type: application/json");
echo json_encode($employees);

?>