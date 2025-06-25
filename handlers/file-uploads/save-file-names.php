<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

$con = new pdo_db("upload_files");

session_start();

$session_user_id = $_SESSION['id'];
$file_names = $_POST['fileNames'];
$module_name = $_POST['module_name'];
$land_id = $_POST['landId'];

// History
$con->table = "history";
$history = array (
  "user_id"=>$session_user_id,
  "module_id"=>$land_id,
  "description"=>"Uploaded a File",
	"action_name"=>"UPLOADED",
  "module_name"=>$module_name,
);
$con->insertData($history);
$history_id = $con->insertId;

try {

	foreach($file_names as $key => $file_name) {

		$con->table = "upload_files";
		$t = array(
			"ppe_id"=>$land_id,
			"history_id"=>$history_id,
			"file_name"=>$file_name['name'],
			"file_size_kb"=>FileSizeConvert($file_name['size'], 2),
			"module_name"=>$module_name
			
		);
		$con->insertData($t);
	
	}

} catch (PDOException $e) {

	echo 'Caught exception: ',  $e->getMessage(), "\n";

}

function FileSizeConvert($bytes)
{
	$bytes = floatval($bytes);
	$arBytes = array(
		1 => array(
			"UNIT" => "MB",
			"VALUE" => pow(1024, 2)
		),
		2 => array(
			"UNIT" => "KB",
			"VALUE" => 1024
		),
	);
	foreach($arBytes as $arItem)
	{
			if($bytes >= $arItem["VALUE"])
			{
					$result = $bytes / $arItem["VALUE"];
					$result = str_replace(".", "," , strval(round($result, 2)))." ".$arItem["UNIT"];
					break;
			}
	}
	return $result;
}

?>
