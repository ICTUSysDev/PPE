<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$offices = $con->getData("SELECT offices.id, offices.name AS office_name, offices.shortname, users.employee_id, CONCAT(users.first_name, ' ', users.last_name) AS head_of_office, positions.position_description  FROM offices INNER JOIN users on offices.head_of_office = users.id INNER JOIN positions ON users.position_id = positions.id ORDER BY office_name");

foreach($offices as $key => $listofoffice) {
    $offices[$key]['list_no']=$key+1;
}


header("Content-Type: application/json");
echo json_encode($offices);

?>