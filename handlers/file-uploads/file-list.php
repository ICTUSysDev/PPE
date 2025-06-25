<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$module_name = $_POST['module_name'];

if($module_name == 'LAND') {
  $module_pathname = 'lands';
} else if($module_name == 'LAND IMPROVEMENT') {
  $module_pathname = 'land-improvements';
} else if($module_name == 'INFRASTRUCTURE ASSET') {
  $module_pathname = 'infrastructure-assets';
} else if($module_name == 'BUILDING AND OTHER STRUCTURE') {
  $module_pathname = 'building-and-other-structures';
} else if($module_name == 'MACHINERY AND EQUIPMENT') {
  $module_pathname = 'machinery-equipment';
} else if($module_name == 'FURNITURE AND FIXTURE') {
  $module_pathname = 'furniture-and-fixtures';
} else if($module_name == 'MACHINERY AND EQUIPMENT ICS') {
  $module_pathname = 'machinery-equipment-ics';
} else if($module_name == 'PAR') {
  $module_pathname = 'machinery-equipment-pars';
} else if($module_name == 'REPAIR OFFICE') {
  $module_pathname = 'repair-office';
} else if($module_name == 'ICS PAR') {
  $module_pathname = 'ics-pars';
} else if($module_name == 'MACHINERY AND EQUIPMENT PHYSICAL INVENTORY MACHINERY EQUIPMENT') {
  $module_pathname = 'machinery-equipment-pi';
} else if($module_name == 'MACHINERY AND EQUIPMENT PHYSICAL INVENTORY FURNITURE AND FIXTURE') {
  $module_pathname = 'machinery-equipment-pi';
} else if($module_name == 'LAND AND LAND IMPROVEMENT PHYSICAL INVENTORY') {
  $module_pathname = 'land-and-land-improvements-pi';
} else if($module_name == 'INFRASTRUCTURE ASSET PHYSICAL INVENTORY') {
  $module_pathname = 'infrastructure-assets-pi';
} else if($module_name == 'BUILDING AND OTHER STRUCTURE PHYSICAL INVENTORY') {
  $module_pathname = 'building-and-structures-pi';
}

$upload_files = $con->getData("SELECT *, DATE_FORMAT(upload_date,'%M %d, %Y') as upload_date FROM upload_files WHERE ppe_id = $_POST[id] AND module_name = '$module_name'");

foreach($upload_files as $key => $upload_file) {

  $file_extension = strtolower(pathinfo($upload_file['file_name'], PATHINFO_EXTENSION));

  if($file_extension == 'pdf') {
    $upload_files[$key]['file_icon'] = '../../assets/files/icons/pdf.png';
  } else {
    $upload_files[$key]['file_icon'] = '../../assets/files/'.$module_pathname.'/'.$upload_file['file_name'];
  }

  $upload_files[$key]['list_no'] = $key+1;

}

header("Content-Type: application/json");
echo json_encode($upload_files);

?>