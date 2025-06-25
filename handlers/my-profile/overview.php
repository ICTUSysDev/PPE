<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

session_start();

$session_id = $_SESSION['id'];

$profile_overview = $con->getData("SELECT id, employee_id, CONCAT(last_name,', ',first_name,' ',middle_name) AS fullname, email, office_id, position_id, employment_status, contact_number FROM users WHERE id = $session_id");

$profile_picture = $con->getData("SELECT * FROM profile_picture WHERE user_id = $session_id ORDER BY id DESC LIMIT 1");
if(!empty($profile_picture[0])) {
  $profile_overview[0]['profile_picture'] = $profile_picture[0];
} else {
  $profile_overview[0]['profile_picture'] = array(
    "id" => 1,
    "img_name" => '300-2.jpg'
  );
}

$office = $con->getData("SELECT id, name AS office_name FROM offices WHERE id = ".$profile_overview[0]['office_id']);
$profile_overview[0]['office_id'] = $office[0];

$position = $con->getData("SELECT id, position_description AS position_name FROM positions WHERE id = ".$profile_overview[0]['position_id']);
$profile_overview[0]['position_id'] = $position[0];


echo json_encode($profile_overview[0]);

?>