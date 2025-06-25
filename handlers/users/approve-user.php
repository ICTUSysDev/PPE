<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

$con = new pdo_db("users");

session_start();

$session_user_id = $_SESSION['id'];
$id = $_POST['id'];

$sql = "UPDATE users SET status = 1 WHERE id = $id";
$con->query($sql);

// History
$con->table = "history";
$history = array (
  "user_id"=>$session_user_id,
  "module_id"=>$id,
  "description"=>"Updated a user",
  "module_name"=>"USER",
);
$con->insertData($history);

?>