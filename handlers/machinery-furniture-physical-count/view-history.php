<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$me_physical_counts = $con->getData("SELECT * FROM par_machinery_equipment WHERE id = $_POST[id] AND status IN('PAR','REASSIGN', 'RELOCATE') AND equipment_description = 'Machinery Equipment' ORDER BY id DESC LIMIT 1");

foreach($me_physical_counts as $key => $me_physical_count) {
    
    $machinery_equipments = $con->getData("SELECT id, property_number, article_id, brand_id, acquisition_date, description FROM machinery_equipment WHERE id = ".$me_physical_count['equipment_id']);
    $me_physical_counts[$key]['machinery_equipment'] = $machinery_equipments[0];

    foreach($machinery_equipments as $index => $machinery_equipment) {

        if($machinery_equipment['brand_id'] != null) {
            $brand_id = $con->getData("SELECT id, name FROM brands WHERE id = ".$machinery_equipment['brand_id']);
            $me_physical_counts[$key]['brand_id'] = $brand_id[0];
        } else {
            $me_physical_counts[$key]['brand_id'] = array(
                'id' => 0,
                'name' => 'N/A'
            );
        }

        $article_id = $con->getData("SELECT id, name FROM articles WHERE id = ".$machinery_equipment['article_id']);
        $me_physical_counts[$key]['article_id'] = $article_id[0];
    
    }
    
    $accountable_officer = $con->getData("SELECT id, employee_id, CONCAT(first_name,' ',last_name) as name FROM users WHERE id = ".$me_physical_count['accountable_officer']);
    $me_physical_counts[$key]['accountable_officer'] = $accountable_officer[0];

    $physical_count_list = $con->getData("SELECT * FROM physical_inventory WHERE inventory_module = 'MACHINERY AND EQUIPMENT' AND equipment_id = $me_physical_count[equipment_id] ORDER BY id DESC LIMIT 5");
   
    foreach($physical_count_list as $i => $pcl) {

      $inventory_by = $con->getData("SELECT id, CONCAT(first_name, ' ', last_name) as name FROM users WHERE id = ".$pcl['inventory_by']);
      $physical_count_list[$i]['inventory_by'] = $inventory_by[0];

    }

    $me_physical_counts[$key]['physical_count_list'] = $physical_count_list;

}

$ff_physical_counts = $con->getData("SELECT * FROM par_machinery_equipment WHERE id = $_POST[id] AND status = 'PAR' AND equipment_description = 'Furniture and Fixture'");

foreach($ff_physical_counts as $key => $ff_physical_count) {

    $furniture_and_fixtures = $con->getData("SELECT id, property_number, article_id, coa_description_id, acquisition_date, description FROM furniture_and_fixtures WHERE id = ".$ff_physical_count['equipment_id']);
    $ff_physical_counts[$key]['machinery_equipment'] = $furniture_and_fixtures[0];

    foreach($furniture_and_fixtures as $index => $furniture_and_fixture) {
        
        $article_id = $con->getData("SELECT id, name FROM articles WHERE id = ".$furniture_and_fixture['article_id']);
        $ff_physical_counts[$key]['article_id'] = $article_id[0];
        
        $brand_id = $con->getData("SELECT id, CONCAT(account_title) as name FROM charts_of_account WHERE id = ".$furniture_and_fixture['coa_description_id']);
        $ff_physical_counts[$key]['brand_id'] = $brand_id[0];

    }

    $accountable_officer = $con->getData("SELECT id, employee_id, CONCAT(first_name,' ',last_name) as name FROM users WHERE id = ".$ff_physical_count['accountable_officer']);
    $ff_physical_counts[$key]['accountable_officer'] = $accountable_officer[0];

    $physical_count_list = $con->getData("SELECT * FROM physical_inventory WHERE inventory_module = 'FURNITURE AND FIXTURES' AND equipment_id = $ff_physical_count[equipment_id] ORDER BY id DESC LIMIT 5");

    foreach($physical_count_list as $i => $pcl) {

        $inventory_by = $con->getData("SELECT id, CONCAT(first_name, ' ', last_name) as name FROM users WHERE id = ".$pcl['inventory_by']);
        $physical_count_list[$i]['inventory_by'] = $inventory_by[0];

    }

    $ff_physical_counts[$key]['physical_count_list'] = $physical_count_list;


}

$physical_counts = array_merge(
    $me_physical_counts,
    $ff_physical_counts
);

header("Content-Type: application/json");
echo json_encode($physical_counts[0]);
?>