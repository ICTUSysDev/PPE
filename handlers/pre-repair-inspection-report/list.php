<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$start_date = $_POST['start'];
$end_date = $_POST['end'];

$repairs_offices = $con->getData("SELECT * FROM pre_repair_inspection WHERE created_at BETWEEN '$start_date' AND '$end_date'");

foreach($repairs_offices as $key => $ro) {

  $machinery_equipment = $con->getData("SELECT id, coa_description_id, property_number, brand_id, article_id FROM machinery_equipment WHERE id = ".$ro['equipment_id']);
  $repairs_offices[$key]['machinery_equipment'] = $machinery_equipment[0];

  $coa_description = $con->getData("SELECT id, account_title FROM charts_of_account WHERE id = ".$machinery_equipment[0]['coa_description_id']);
  $repairs_offices[$key]['machinery_equipment']['coa_description'] = $coa_description[0];

  if(!empty($machinery_equipment[0]['brand_id'])) {
    $brands = $con->getData("SELECT id, name FROM brands WHERE id = ".$machinery_equipment[0]['brand_id']);
    $repairs_offices[$key]['machinery_equipment']['brands'] = $brands[0];
  }

  $articles = $con->getData("SELECT id, name FROM articles WHERE id = ".$machinery_equipment[0]['article_id']);
  $repairs_offices[$key]['machinery_equipment']['articles'] = $articles[0];

  // var_dump($ro['job_order_no']);
  if($ro['job_order_no'] == NULL) {
    $repairs_offices[$key]['job_order_no'] = 'N/A';
  }

  $repairs_offices[$key]['list_no'] = $key+1;

}

header("Content-Type: application/json");
echo json_encode($repairs_offices);

?>