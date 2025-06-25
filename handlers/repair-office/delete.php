<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$session_user_id = $_SESSION['id'];

$con = new pdo_db("pre_repair_inspection");

$action_data = $con->getData("SELECT id, job_order_no FROM pre_repair_inspection WHERE id = ".$_POST['id'][0]);

if($action_data[0]['job_order_no'] != null) {
  $action_data = $action_data[0]['job_order_no'];
} else {
  $action_data = 'N/A';
}

// History
$con->table = "history";
$history = array (
  "user_id"=>$session_user_id,
  "module_id"=>$_POST['id'][0],
  "description"=>"Removed a pre-repair inspection form",
  "action_name"=>"REMOVED",
  "module_name"=>"REPAIR FORM",
  "action_data"=>$action_data,
);
$con->insertData($history);

$delete = $con->deleteData(array("id"=>implode(",",$_POST['id'])));

?>

<?php

// header("Content-Type: application/json");

// $_POST = json_decode(file_get_contents('php://input'), true);

// require_once '../../db.php';

// $session_user_id = $_SESSION['id'];

?>
