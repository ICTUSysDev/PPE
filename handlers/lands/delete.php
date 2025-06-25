<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$session_user_id = $_SESSION['id'];

$con = new pdo_db("land_and_land_improvements");

$action_data = $con->getData("SELECT id, land_code FROM land_and_land_improvements WHERE id = ".$_POST['id'][0]);

// History
$con->table = "history";
$history = array (
  "user_id"=>$session_user_id,
  "module_id"=>$_POST['id'][0],
  "description"=>"Removed a land",
  "action_name"=>"REMOVED",
  "module_name"=>"LAND",
  "action_data"=>$action_data[0]['land_code'],
);
$con->insertData($history);


?>

<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$session_user_id = $_SESSION['id'];

$con = new pdo_db("land_and_land_improvements");

$delete = $con->deleteData(array("id"=>implode(",",$_POST['id'])));

?>