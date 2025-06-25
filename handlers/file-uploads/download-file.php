<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$download_file = $con->getData("SELECT id, file_name FROM upload_files WHERE id = $_POST[id]");

header("Content-Type: application/json");
echo json_encode($download_file[0]);

?>