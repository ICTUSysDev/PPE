<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

session_start();

$session_id = $_SESSION['id'];

$year_list = $_POST['start'];

$building_and_structures = $con->getData("SELECT COUNT(*) total FROM building_and_structures");

$furniture_and_fixtures = $con->getData("SELECT COUNT(*) total FROM furniture_and_fixtures");

$infrastructure_assets = $con->getData("SELECT COUNT(*) total FROM infrastructure_assets");

$land_and_land_improvements = $con->getData("SELECT COUNT(*) total FROM land_and_land_improvements");

$machinery_equipment = $con->getData("SELECT COUNT(*) total FROM machinery_equipment WHERE acquisition_cost >= 50000");

$machinery_equipment_ics = $con->getData("SELECT COUNT(*) total FROM machinery_equipment WHERE acquisition_cost <= 49999");

$machinery_equipment_total_par = $con->getData("SELECT COUNT(*) AS total_par FROM par_machinery_equipment WHERE equipment_description IN ('Machinery Equipment','Furniture and Fixture') AND status IN ('PAR','REASSIGN','RELOCATE')");
$machinery_equipment_total_repar = $con->getData("SELECT COUNT(*) AS total_retransfer FROM par_machinery_equipment WHERE equipment_description IN ('Machinery Equipment','Furniture and Fixture') AND status IN ('REASSIGN','RELOCATE','DONATION')");
$machinery_equipment_total_returned = $con->getData("SELECT COUNT(*) AS total_returned FROM par_machinery_equipment WHERE equipment_description IN ('Machinery Equipment','Furniture and Fixture') AND status IN ('DISPOSAL','RETURN TO STOCK')");
$machinery_equipment_total_ics = $con->getData("SELECT COUNT(*) AS total_ics FROM par_machinery_equipment WHERE equipment_description IN ('Machinery Equipment','Furniture and Fixture') AND status = 'ICS'");

$machinery_equipment_serviceable = $con->getData("SELECT COUNT(*) AS total_serviceable FROM machinery_equipment WHERE equipment_condition = 'SERVICEABLE'");
$machinery_equipment_unserviceable = $con->getData("SELECT COUNT(*) AS total_serviceable FROM machinery_equipment WHERE equipment_condition = 'UNSERVICEABLE'");
$furniture_fixture_serviceable = $con->getData("SELECT COUNT(*) AS total_serviceable FROM furniture_and_fixtures WHERE equipment_condition = 'SERVICEABLE'");
$furniture_fixture_unserviceable = $con->getData("SELECT COUNT(*) AS total_serviceable FROM furniture_and_fixtures WHERE equipment_condition = 'UNSERVICEABLE'");

$machinery_equipment_available = $con->getData("SELECT COUNT(*) AS total_available FROM machinery_equipment WHERE status = 'Available'");
$machinery_equipment_notavailable = $con->getData("SELECT COUNT(*) AS total_not_available FROM machinery_equipment WHERE status = 'Not Available'");
$furniture_fixture_available = $con->getData("SELECT COUNT(*) AS total_available FROM furniture_and_fixtures WHERE status = 'Available'");
$furniture_fixture_notavailable = $con->getData("SELECT COUNT(*) AS total_available FROM furniture_and_fixtures WHERE status = 'Not Available'");

$total_fixtures = $con->getData("SELECT COUNT(*) AS total_furniture FROM furniture_and_fixtures WHERE status = 'Not Available' AND carrying_amount >= 50000");
$total_machinery = $con->getData("SELECT COUNT(*) AS total_equipment FROM machinery_equipment WHERE status = 'Not Available' AND acquisition_cost >= 50000");
$sum_total_m_f = $total_fixtures[0]['total_furniture'] + $total_machinery[0]['total_equipment'];

$total_land = $con->getData("SELECT COUNT(*) AS total_land FROM land_and_land_improvements");
$total_infrastructure = $con->getData("SELECT COUNT(*) AS total_infrastructure FROM infrastructure_assets");
$total_building = $con->getData("SELECT COUNT(*) AS total_building FROM building_and_structures");

$sum_physical_inventory = $total_land[0] + $total_infrastructure[0] + $total_building[0];

$total_equipment_inventory = $con->getData("SELECT COUNT(DISTINCT equipment_id) AS total_equipment_inventory FROM physical_inventory WHERE inventory_module = 'MACHINERY AND EQUIPMENT' AND YEAR(inventory_date) = $year_list");
$total_land_inventory = $con->getData("SELECT COUNT(DISTINCT equipment_id) AS total_land_inventory FROM physical_inventory WHERE inventory_module = 'LAND AND LAND IMPROVEMENTS' AND YEAR(inventory_date) = $year_list");
$total_infrastructure_inventory = $con->getData("SELECT COUNT(DISTINCT equipment_id) AS total_infrastructure_inventory FROM physical_inventory WHERE inventory_module = 'INFRASTRUCTURE ASSET' AND YEAR(inventory_date) = $year_list");
$total_building_inventory = $con->getData("SELECT COUNT(DISTINCT equipment_id) AS total_building_inventory FROM physical_inventory WHERE inventory_module = 'BUILDING AND OTHER STRUCTURES' AND YEAR(inventory_date) = $year_list");

// $total_inventoried = array_merge(
//   $total_equipment_inventory[0],
//   $total_land_inventory[0],
//   $total_infrastructure_inventory[0],
//   $total_building_inventory[0]
// );


$dashboard = array(

  "building_and_structures"=>$building_and_structures[0],
  "furniture_and_fixtures"=>$furniture_and_fixtures[0],
  "infrastructure_assets"=>$infrastructure_assets[0],
  "land_and_land_improvements"=>$land_and_land_improvements[0],
  "machinery_equipment"=>$machinery_equipment[0],
  "machinery_equipment_ics"=>$machinery_equipment_ics[0],

  "machinery_equipment_total_par"=>isset($machinery_equipment_total_par[0]) ? $machinery_equipment_total_par[0] : 0,
  "machinery_equipment_total_repar"=>isset($machinery_equipment_total_repar[0]) ? $machinery_equipment_total_repar[0] : 0,
  "machinery_equipment_total_returned"=>isset($machinery_equipment_total_returned[0]) ? $machinery_equipment_total_returned[0]: 0,
  "machinery_equipment_total_ics"=> isset($machinery_equipment_total_ics[0]) ? $machinery_equipment_total_ics[0] : 0,

  "machinery_equipment_serviceable" => isset($machinery_equipment_serviceable[0]) ? $machinery_equipment_serviceable[0] : 0,
  "machinery_equipment_unserviceable" => isset($machinery_equipment_unserviceable[0]) ? $machinery_equipment_unserviceable[0] : 0,
  "furniture_fixture_serviceable" => isset($furniture_fixture_serviceable[0]) ? $furniture_fixture_serviceable[0] : 0,
  "furniture_fixture_unserviceable" => isset($furniture_fixture_unserviceable[0]) ? $furniture_fixture_unserviceable[0] : 0,

  "machinery_equipment_available" => isset($machinery_equipment_available[0]) ? $machinery_equipment_available[0] : 0,
  "machinery_equipment_notavailable" => isset($machinery_equipment_notavailable[0]) ? $machinery_equipment_notavailable[0] : 0,
  "furniture_fixture_available" => isset($furniture_fixture_available[0]) ? $furniture_fixture_available[0] : 0,
  "furniture_fixture_notavailable" => isset($furniture_fixture_notavailable[0]) ? $furniture_fixture_notavailable[0] : 0,

  "sum_physical_inventory" => $sum_physical_inventory,
  "sum_total_m_f" => $sum_total_m_f,
  // "total_inventoried" => $total_inventoried,
  "year_list" => $year_list,
  "total_equipment_inventory" => $total_equipment_inventory[0],
  "total_land_inventory" => $total_land_inventory[0],
  "total_infrastructure_inventory" => $total_infrastructure_inventory[0],
  "total_building_inventory" => $total_building_inventory[0],
);

echo json_encode($dashboard);

?>