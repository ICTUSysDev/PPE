<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../../db.php';

$username = isset($_POST['username']) ? $_POST['username'] : "";
$password = isset($_POST['password']) ? $_POST['password'] : "";

$uname = htmlentities($username, ENT_QUOTES);

$con = new pdo_db();

$hashed = hash('sha512', $password);

$sql = "SELECT id, status FROM users WHERE username = '$uname' AND password = '$hashed'";
$account = $con->getData($sql);

if (!empty($account)) { //  Check if user exists
    if ($account[0]['status'] == 0) { 
        echo json_encode(array("login" => "not_activated")); //  Send 'not_activated' status
    } else {
        session_start();
        $_SESSION['id'] = $account[0]['id'];
        echo json_encode(array("login" => true));
    }
} else {
    echo json_encode(array("login" => false));
}

?>
