<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$session_user_id = $_SESSION['id'];

$con = new pdo_db("machinery_equipment");

$action_data = $con->getData("SELECT id, property_number FROM machinery_equipment WHERE id = ".$_POST['id'][0]);

// History
$con->table = "history";
$history = array (
  "user_id"=>$session_user_id,
  "module_id"=>$_POST['id'][0],
  "description"=>"Removed a machinery equipment (ICS)",
  "action_name"=>"REMOVED",
  "module_name"=>"MACHINERY AND EQUIPMENT ICS",
  "action_data"=>$action_data[0]['property_number'],
);
$con->insertData($history);

?>

<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$session_user_id = $_SESSION['id'];

$con = new pdo_db("machinery_equipment");

$delete = $con->deleteData(array("id"=>implode(",",$_POST['id'])));

?>