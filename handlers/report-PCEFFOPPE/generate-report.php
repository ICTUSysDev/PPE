<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';
session_start();
date_default_timezone_set('Asia/Manila');


// date_default_timezone_set("Asia/Manila");




$con = new pdo_db();

$PCEFFOPPE=array();
$counter1=0;

$equipment_type = $_POST['PCEFFOPPEs']['equipment_type'];

$fund_id = empty($_POST['PCEFFOPPEs']['fund']['id'])? : $_POST['PCEFFOPPEs']['fund']['id'];
$inventory_year = $_POST['PCEFFOPPEs']['year']['year'];

$accountable_officer = $con->getData("SELECT *, CONCAT(first_name,' ', last_name) as accountable_officer FROM  signatories WHERE code = 'Accountable Officer'");

if($equipment_type == 'MACHINERY AND EQUIPMENT') {

    $check_latests =$con->getData("SELECT distinct pi.equipment_id FROM machinery_equipment as me, physical_inventory as pi WHERE pi.equipment_id = me.id AND me.fund_id = $fund_id AND YEAR(pi.inventory_date) = $inventory_year AND pi.inventory_module = 'MACHINERY AND EQUIPMENT' ");

    foreach($check_latests as $key => $ids){
        // CONCAT('P ', FORMAT(me.acquisition_cost,2)) AS acquisition_cost
        $machinery_equipments = $con->getData("SELECT me.id, me.article_id, me.description, me.property_number, CONCAT('P ', FORMAT(me.acquisition_cost,2)) AS acquisition_cost, me.fund_id, pi.equipment_id, pi.location, pi.equipment_condition, pi.remarks FROM machinery_equipment as me, physical_inventory as pi WHERE pi.equipment_id = me.id AND me.fund_id = $fund_id AND YEAR(pi.inventory_date) = $inventory_year AND pi.inventory_module = 'MACHINERY AND EQUIPMENT'  AND pi.equipment_id = ". $ids['equipment_id'] ." ORDER BY pi.inventory_date, pi.id DESC LIMIT 1");

        foreach($machinery_equipments as $index => $machinery_equipment) {

            $article_id = $con->getData("SELECT id, name FROM articles WHERE id = ".$machinery_equipment['article_id']);
            $machinery_equipment['article_id'] = $article_id[0];
    
            $fund_name = $con->getData("SELECT id, name FROM funds WHERE id = ".$machinery_equipment['fund_id']);
            $accountable_officer[0]['fund_name'] = $fund_name[0];
        }

        $accountable_officer[0]['machinery_equipment'][$key] = $machinery_equipment;
        $accountable_officer[0]['as_of_date'] = date('F d, Y');

    }

    $check_latests_ff =$con->getData("SELECT distinct pi.equipment_id FROM furniture_and_fixtures as ff, physical_inventory as pi WHERE pi.equipment_id = ff.id AND ff.fund_id = $fund_id AND YEAR(pi.inventory_date) = $inventory_year AND pi.inventory_module = 'FURNITURE AND FIXTURES'");

    foreach($check_latests_ff as $key => $ids_ff){

    $furnitrure_fixtures = $con->getData("SELECT ff.id, ff.article_id, ff.description, ff.property_number, ff.carrying_amount, ff.fund_id, pi.equipment_id, pi.location, pi.equipment_condition, pi.remarks FROM furniture_and_fixtures as ff, physical_inventory as pi WHERE pi.equipment_id = ff.id AND ff.fund_id = $fund_id AND YEAR(pi.inventory_date) = $inventory_year AND pi.inventory_module = 'FURNITURE AND FIXTURES'  AND pi.equipment_id = ". $ids_ff['equipment_id'] ." ORDER BY pi.inventory_date DESC LIMIT 1");

    foreach($furnitrure_fixtures as $index => $furniture_fixture) {

        $article_id = $con->getData("SELECT id, name FROM articles WHERE id = ".$furniture_fixture['article_id']);
        $furniture_fixture['article_id'] = $article_id[0];

        $fund_name = $con->getData("SELECT id, name FROM funds WHERE id = ".$furniture_fixture['fund_id']);
        $accountable_officer[0]['fund_name'] = $fund_name[0];

    }

    $accountable_officer[0]['furniture_fixture'][$key] = $furniture_fixture;
    $accountable_officer[0]['as_of_date'] = date('F d, Y');

    }
    
$accountable_officer[0]['userFullName']=$_SESSION['userFullName'];
$accountable_officer[0]['reportDate']=date("m-d-Y h:ia");
header("Content-Type: application/json");
echo json_encode($accountable_officer[0]);

} else if($equipment_type == 'BUILDING AND OTHER STRUCTURES')  {

    $check_latests_bs =$con->getData("SELECT distinct pi.equipment_id FROM building_and_structures as bs, physical_inventory as pi WHERE pi.equipment_id = bs.id AND YEAR(pi.inventory_date) = $inventory_year AND pi.inventory_module = 'BUILDING AND OTHER STRUCTURES'");

    foreach($check_latests_bs as $key => $ids_bs){

        $building_structures = $con->getData("SELECT bs.id, bs.building_and_structure_id, bs.building_and_structure_location, bs.building_and_structure_component, bs.building_and_structure_property_no, bs.carrying_amount, pi.equipment_condition, pi.remarks FROM building_and_structures as bs, physical_inventory as pi WHERE pi.equipment_id = bs.id AND YEAR(pi.inventory_date) = $inventory_year AND pi.inventory_module = 'BUILDING AND OTHER STRUCTURES'  AND pi.equipment_id = ". $ids_bs['equipment_id'] ." ORDER BY pi.inventory_date DESC LIMIT 1");

        $accountable_officer[0]['building_structure'][$key] = $building_structures[0];
        $accountable_officer[0]['as_of_date'] = date('F d, Y');

    }

$accountable_officer[0]['userFullName']=$_SESSION['userFullName'];
$accountable_officer[0]['reportDate']=date("m-d-Y h:ia");
header("Content-Type: application/json");
echo json_encode($accountable_officer[0]);

} else if($equipment_type == 'INFRASTRUCTURE ASSET') {

    $check_latests_ia =$con->getData("SELECT distinct pi.equipment_id FROM infrastructure_assets as ia, physical_inventory as pi WHERE pi.equipment_id = ia.id AND YEAR(pi.inventory_date) = $inventory_year AND pi.inventory_module = 'INFRASTRUCTURE ASSET'");

    foreach($check_latests_ia as $key => $ids_ia){

        $infrastructure_assets = $con->getData("SELECT ia.id, ia.infrastructure_id_number, ia.type_of_infrastructure, ia.infrastructure_location, ia.infrastructure_component, ia.component_property_no, ia.carrying_amount, pi.equipment_condition, pi.remarks FROM infrastructure_assets as ia, physical_inventory as pi WHERE pi.equipment_id = ia.id AND YEAR(pi.inventory_date) = $inventory_year AND pi.inventory_module = 'INFRASTRUCTURE ASSET'  AND pi.equipment_id = ". $ids_ia['equipment_id'] ." ORDER BY pi.inventory_date DESC LIMIT 1");

        $accountable_officer[0]['infrastructure_asset'][$key] = $infrastructure_assets[0];
        $accountable_officer[0]['as_of_date'] = date('F d, Y');

    }

$accountable_officer[0]['userFullName']=$_SESSION['userFullName'];
$accountable_officer[0]['reportDate']=date("m-d-Y h:ia");
header("Content-Type: application/json");
echo json_encode($accountable_officer[0]);

} else if($equipment_type == 'LAND AND LAND IMPROVEMENTS') {

    $check_latests_li =$con->getData("SELECT distinct pi.equipment_id FROM land_and_land_improvements as li, physical_inventory as pi WHERE pi.equipment_id = li.id AND YEAR(pi.inventory_date) = $inventory_year AND pi.inventory_module = 'LAND AND LAND IMPROVEMENTS'");

    foreach($check_latests_li as $key => $ids_li) {

        $land_and_land_improvements = $con->getData("SELECT li.id, li.id_number, li.classification, li.location, li.description, li.carrying_amount, pi.equipment_condition, pi.remarks FROM land_and_land_improvements as li, physical_inventory as pi WHERE pi.equipment_id = li.id AND YEAR(pi.inventory_date) = $inventory_year AND pi.inventory_module = 'LAND AND LAND IMPROVEMENTS'  AND pi.equipment_id = ". $ids_li['equipment_id'] ." ORDER BY pi.inventory_date DESC LIMIT 1");

        foreach($land_and_land_improvements as $i =>  $land_and_land_improvement) {

            $land_and_land_improvements[$i]['land_improvements'] = "";

            if($land_and_land_improvement['classification']=="Land") {
                $land_and_land_improvements[$i]['land_improvements'] = "";
            }

            if($land_and_land_improvement['classification']=="Land Improvements") {
                $land_and_land_improvements[$i]['land_improvements'] = "Land Improvements";
                $land_and_land_improvements[$i]['classification'] = "";
            }

        }

        $accountable_officer[0]['land_and_land_improvement'][$key] = $land_and_land_improvements[0];
        $accountable_officer[0]['as_of_date'] = date('F d, Y');

    }


$accountable_officer[0]['userFullName']=$_SESSION['userFullName'];
$accountable_officer[0]['reportDate']=date("m-d-Y h:ia");
header("Content-Type: application/json");
echo json_encode($accountable_officer[0]);

}

?>