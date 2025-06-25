<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$session_user_id = $_SESSION['id'];

$con = new pdo_db("parts_serial_number");

$action_data = $con->getData("SELECT id, serial_number FROM parts_serial_number WHERE id = ".$_POST['id'][0]);

// History
$con->table = "history";
$history = array (
  "user_id"=>$session_user_id,
  "module_id"=>$_POST['id'][0],
  "description"=>"Removed a serial number",
  "action_name"=>"REMOVED",
  "module_name"=>"SERIAL NUMBER",
  "action_data"=>$action_data[0]['serial_number'],
);
$con->insertData($history);


?>

<?php

// header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$session_user_id = $_SESSION['id'];

$con = new pdo_db("parts_serial_number");

$delete = $con->deleteData(array("id"=>implode(",",$_POST['id'])));

?>