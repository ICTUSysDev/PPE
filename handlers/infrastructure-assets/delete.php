<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$session_user_id = $_SESSION['id'];

$con = new pdo_db("infrastructure_assets");

$action_data = $con->getData("SELECT id, infrastructure_id_number FROM infrastructure_assets WHERE id = ".$_POST['id'][0]);

// History
$con->table = "history";
$history = array (
  "user_id"=>$session_user_id,
  "module_id"=>$_POST['id'][0],
  "description"=>"Removed an Infrastructure Asset",
  "action_name"=>"REMOVED",
  "module_name"=>"INFRASTRUCTURE ASSET",
  "action_data"=>$action_data[0]['infrastructure_id_number'],
);
$con->insertData($history);


?>

<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$session_user_id = $_SESSION['id'];

$con = new pdo_db("infrastructure_assets");

$delete = $con->deleteData(array("id"=>implode(",",$_POST['id'])));

?>