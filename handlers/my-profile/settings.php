<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

session_start();

$session_id = $_SESSION['id'];

$profile_settings = $con->getData("SELECT * FROM users WHERE id = $session_id");
unset($profile_settings[0]['password']);

$office = $con->getData("SELECT id, name FROM offices WHERE id = ".$profile_settings[0]['office_id']);
$profile_settings[0]['office_id'] = $office[0];

$position = $con->getData("SELECT id, position_description AS position_name FROM positions WHERE id = ".$profile_settings[0]['position_id']);
$profile_settings[0]['position_id'] = $position[0];

echo json_encode($profile_settings[0]);

?>