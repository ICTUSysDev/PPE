<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$session_user_id = $_SESSION['id'];

$con = new pdo_db("building_and_structures");

$action_data = $con->getData("SELECT id, building_and_structure_id FROM building_and_structures WHERE id = ".$_POST['id'][0]);

// History
$con->table = "history";
$history = array (
  "user_id"=>$session_user_id,
  "module_id"=>$_POST['id'][0],
  "description"=>"Removed a building and structures",
  "action_name"=>"REMOVED",
  "module_name"=>"BUILDING AND OTHER STRUCTURE",
  "action_data"=>$action_data[0]['building_and_structure_id'],
);
$con->insertData($history);


?>

<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$session_user_id = $_SESSION['id'];

$con = new pdo_db("building_and_structures");

$delete = $con->deleteData(array("id"=>implode(",",$_POST['id'])));


?>