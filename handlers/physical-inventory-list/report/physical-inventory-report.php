<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../../db.php';

$con = new pdo_db();

session_start();

$start_date = $_POST['start'];
$end_date = $_POST['end'];

$search_inventer = isset($_POST['inventory_by']['user_id']) ? $_POST['inventory_by']['user_id'] : 'ALL';
$inventer_value = ($search_inventer == 'ALL' || $search_inventer == '') ? " AND pi.inventory_by = u.id" : " AND pi.inventory_by = '$search_inventer' AND pi.inventory_by = u.id";

$search_type = isset($_POST['ppe_type']) ? $_POST['ppe_type'] : 'ALL';
$type_value = ($search_type == 'ALL' || $search_type == '') ? "" : " AND pi.inventory_module = '$search_type'";

$physical_inventory_me = $con->getData("SELECT pi.id AS physical_inventory_id, pi.equipment_id, pi.location, pi.equipment_condition, pi.remarks, pi.inventory_by, pi.inventory_date, pi.inventory_module, me.id AS machinery_equipment_id, me.property_number, me.brand_id, me.article_id, me.description, me.acquisition_cost, a.id AS article_id, a.name AS article_name, b.id AS brand_id, b.name AS brand_name, u.id AS user_id, CONCAT(u.first_name,' ', u.last_name) AS accountable_officer  FROM physical_inventory AS pi, machinery_equipment AS me, articles AS a, brands AS b, users AS u
WHERE pi.inventory_module = 'MACHINERY AND EQUIPMENT' AND me.brand_id = b.id AND me.article_id = a.id AND pi.equipment_id = me.id $inventer_value $type_value AND pi.inventory_date BETWEEN '$start_date' AND '$end_date'
GROUP BY pi.id");

// var_dump($physical_inventory_me); exit();

$physical_inventory_ff = $con->getData("SELECT pi.id AS physical_inventory_id, pi.equipment_id, pi.inventory_by, pi.inventory_date, pi.location, pi.equipment_condition, pi.remarks, ff.id AS ff_id, ff.property_number, ff.article_id, ff.brand_id, ff.description, ff.carrying_amount AS acquisition_cost, a.id AS a_id, a.name AS article_name, b.id AS b_id, b.name AS brand_name, CONCAT(u.first_name,' ',u.last_name) AS inventory_by_name
FROM physical_inventory AS pi, furniture_and_fixtures AS ff, articles AS a, brands AS b, users AS u
WHERE pi.inventory_module = 'FURNITURE AND FIXTURES' AND pi.equipment_id = ff.id $inventer_value $type_value AND ff.article_id = a.id AND ff.brand_id = b.id AND pi.inventory_by = u.id AND pi.inventory_date BETWEEN '$start_date' AND '$end_date'
GROUP BY pi.id");

$physical_inventory['physical_inventory'] = [
  "as_of_date" => date('F d, Y'),
  "inventory_module" => ($search_type == "") ? 'ALL' : $search_type,
  "inventory_by_name" => isset($_POST['inventory_by']['inventory_by']) ? $_POST['inventory_by']['inventory_by'] : 'ALL'
];
  
$physical_inventory_me_ff = array_merge(
  $physical_inventory_me,
  $physical_inventory_ff,
);

foreach($physical_inventory_me_ff as $key => $ml) {

  $physical_inventory_me_ff[$key]['list_no'] = $key+1;
}

$datas =  array_merge(
  $physical_inventory_me_ff,
  $physical_inventory
);

echo json_encode($datas);

?>