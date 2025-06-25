<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();
ob_start();
header("Content-Type: application/json");

$con = new pdo_db();

$view_notification = $con->getData("SELECT * FROM notifications WHERE id = $_POST[id]");
$view_notification['view_notification'] = $view_notification[0];

$repair_count = $con->getData("SELECT id, COUNT(status) AS repair_count FROM `par_machinery_equipment` WHERE status = 'REPAIR' GROUP BY id");
if(!empty($repair_count[0])){
  $view_notification['repair_count'] = $repair_count[0];
}

if($view_notification[0]['module_name'] == 'PAR' || $view_notification[0]['module_name'] == 'ICS') {

  $par_details = $con->getData("SELECT id, accountable_officer, office_id FROM machinery_equipment_pars WHERE id = ".$view_notification[0]['module_id']);
  
  $accountable_officer = $con->getData("SELECT id, CONCAT(first_name,' ',last_name) as accountable_officer, office_id, position_id FROM users WHERE id = ".$par_details[0]['accountable_officer']);
  $view_notification['par_details'] = $accountable_officer[0];
  
  $office_id = $con->getData("SELECT id, name, shortname FROM offices WHERE id = ".$accountable_officer[0]['office_id']);
  $view_notification['par_details']['office_id'] = $office_id[0];
  
  $position_id = $con->getData("SELECT id, position_description FROM positions WHERE id = ".$accountable_officer[0]['position_id']);
  $view_notification['par_details']['position_id'] = $position_id[0];
  
  $user_id = $con->getData("SELECT id, CONCAT(first_name,' ',last_name) as gso_officer, office_id, position_id FROM users WHERE id = ".$view_notification[0]['user_id']);
  $view_notification['view_notification']['user_id'] = $user_id[0];

  $par_machinery_equipments_mes = $con->getData("SELECT * FROM par_machinery_equipment WHERE equipment_description = 'Machinery Equipment' AND par_id = ".$view_notification[0]['module_id']." AND status = 'PAR'");

  foreach($par_machinery_equipments_mes as $index => $pmem) {
    
  $machinery_equipments = $con->getData("SELECT * FROM machinery_equipment WHERE id = ".$pmem['equipment_id']);
  $par_machinery_equipments_mes[$index] = $machinery_equipments[0];
  
  $article_id = $con->getData("SELECT id, name FROM articles WHERE id = ".$machinery_equipments[0]['article_id']);
  $par_machinery_equipments_mes[$index]['article_id'] = $article_id[0];
  
  $brand_id = $con->getData("SELECT id, name FROM brands WHERE id = ".$machinery_equipments[0]['brand_id']);
  $par_machinery_equipments_mes[$index]['brand_id'] = $brand_id[0];

  }

  $ics_equipment = $con->getData("SELECT * FROM par_machinery_equipment WHERE equipment_description = 'Machinery Equipment' AND par_id = ".$view_notification[0]['module_id']." AND status = 'ICS'");

  foreach($ics_equipment as $index => $ie) {
    
  $machinery_equipments = $con->getData("SELECT * FROM machinery_equipment WHERE id = ".$ie['equipment_id']);
  $ics_equipment[$index] = $machinery_equipments[0];
  
  $article_id = $con->getData("SELECT id, name FROM articles WHERE id = ".$machinery_equipments[0]['article_id']);
  $ics_equipment[$index]['article_id'] = $article_id[0];
  
  $brand_id = $con->getData("SELECT id, name FROM brands WHERE id = ".$machinery_equipments[0]['brand_id']);
  $ics_equipment[$index]['brand_id'] = $brand_id[0];

  }

  $par_machinery_equipments_bss = $con->getData("SELECT * FROM par_machinery_equipment WHERE equipment_description = 'Building and Structures' AND par_id = ".$view_notification[0]['module_id']." AND status = 'PAR'");
  
  foreach($par_machinery_equipments_bss as $index => $pmeb) {
    
    $building_and_structures = $con->getData("SELECT id, CONCAT(building_and_structure_property_no) as property_number, CONCAT(carrying_amount) as acquisition_cost, building_and_structure_component, building_and_structure_id,  remarks FROM building_and_structures WHERE id = ".$pmeb['equipment_id']);
    $par_machinery_equipments_bss[$index] = $building_and_structures[0];

    $par_machinery_equipments_bss[$index]['article_id'] = array(
      "id" => 0,
      "name" => $building_and_structures[0]['building_and_structure_component']
    );
  
    $par_machinery_equipments_bss[$index]['brand_id'] = array(
      "id" => 0,
      "name" => $building_and_structures[0]['building_and_structure_id']
    );
  
  }

  $par_machinery_equipments_ffs = $con->getData("SELECT * FROM par_machinery_equipment WHERE equipment_description = 'Furniture and Fixture' AND par_id = ".$view_notification[0]['module_id']." AND status = 'PAR'");
  
  foreach($par_machinery_equipments_ffs as $index => $pmef) {
    
    $furniture_and_fixtures = $con->getData("SELECT id, property_number, article_id, furniture_and_fixture_condition, CONCAT(carrying_amount) as acquisition_cost, remarks FROM furniture_and_fixtures WHERE id = ".$pmef['equipment_id']);
    $par_machinery_equipments_ffs[$index] = $furniture_and_fixtures[0];
    
    $article_id = $con->getData("SELECT id, name FROM articles WHERE id = ".$furniture_and_fixtures[0]['article_id']);
    $par_machinery_equipments_ffs[$index]['article_id'] = $article_id[0];

    $par_machinery_equipments_ffs[$index]['brand_id'] = array(
      "id" => 0,
      "name" => $furniture_and_fixtures[0]['furniture_and_fixture_condition']
    );
  
  }

  $par_machinery_equipments_ias = $con->getData("SELECT * FROM par_machinery_equipment WHERE equipment_description = 'Infrastructure Assets' AND par_id = ".$view_notification[0]['module_id']." AND status = 'PAR'");

  foreach($par_machinery_equipments_ias as $index => $pmei) {
    
    $infrastructure_assets = $con->getData("SELECT id, CONCAT(component_property_no) as property_number, CONCAT(carrying_amount) as acquisition_cost, type_of_infrastructure, infrastructure_id_number, remarks FROM infrastructure_assets WHERE id = ".$pmei['equipment_id']);
    $par_machinery_equipments_ias[$index] = $infrastructure_assets[0];
    
    $par_machinery_equipments_ias[$index]['article_id'] = array(
      "id" => 0,
      "name" => $infrastructure_assets[0]['type_of_infrastructure']
    );
  
    $par_machinery_equipments_ias[$index]['brand_id'] = array(
      "id" => 0,
      "name" => $infrastructure_assets[0]['infrastructure_id_number']
    );
  
  }

  $par_machinery_equipments_llis = $con->getData("SELECT * FROM par_machinery_equipment WHERE equipment_description = 'Land and Land Improvements' AND par_id = ".$view_notification[0]['module_id']." AND status = 'PAR'");

  foreach($par_machinery_equipments_llis as $index => $pmel) {
    
    $land_and_land_improvements = $con->getData("SELECT id, CONCAT(id_number) as property_number, classification, CONCAT(carrying_amount) as acquisition_cost, land_condition, remarks FROM land_and_land_improvements WHERE id = ".$pmel['equipment_id']);
    $par_machinery_equipments_llis[$index] = $land_and_land_improvements[0];
    
    $par_machinery_equipments_llis[$index]['article_id'] = array(
      "id" => 0,
      "name" => $land_and_land_improvements[0]['classification']
    );

    $par_machinery_equipments_llis[$index]['brand_id'] = array(
      "id" => 0,
      "name" => $land_and_land_improvements[0]['land_condition']
    );
  
  }

  $equipment_list = array_merge(
    $par_machinery_equipments_mes,
    $par_machinery_equipments_bss,
    $par_machinery_equipments_ffs,
    $par_machinery_equipments_ias,
    $par_machinery_equipments_llis,
    $ics_equipment
  );

  $view_notification['equipment_list'] = $equipment_list;

  $view_notifications = array(
    $view_notification,
    $par_details,
    $equipment_list
  );

} else if($view_notification[0]['module_name'] == 'Equipment') {

  $machinery_equipment = $con->getData("SELECT * FROM machinery_equipment WHERE id = ".$view_notification[0]['module_id']);
  $view_notification['machinery_equipment'] = $machinery_equipment[0];

  $office = $con->getData("SELECT id, name, shortname FROM offices WHERE id = ".$machinery_equipment[0]['office_id']);
  $view_notification['machinery_equipment']['office_id'] = $office[0];

  $coa_description = $con->getData("SELECT id, account_title FROM charts_of_account WHERE id = ".$machinery_equipment[0]['coa_description_id']);
  $view_notification['machinery_equipment']['coa_description_id'] = $coa_description[0];

  $article = $con->getData("SELECT id, name FROM articles WHERE id = ".$machinery_equipment[0]['article_id']);
  $view_notification['machinery_equipment']['article_id'] = $article[0];

  if(!empty($machinery_equipment[0]['brand_id'])) {
    $brand = $con->getData("SELECT id, name FROM brands WHERE id = ".$machinery_equipment[0]['brand_id']);
    $view_notification['machinery_equipment']['brand_id'] = $brand[0];
  } else {
    $view_notification['machinery_equipment']['brand_id']['name'] = 'N/A';
  }

  $fund = $con->getData("SELECT id, name FROM funds WHERE id = ".$machinery_equipment[0]['fund_id']);
  $view_notification['machinery_equipment']['fund_id'] = $fund[0];

  $supplier = $con->getData("SELECT id, name FROM suppliers WHERE id = ".$machinery_equipment[0]['supplier_id']);
  $view_notification['machinery_equipment']['supplier_id'] = $supplier[0];

  foreach($machinery_equipment as $key => $me){
    $serial_number = $con->getData("SELECT * FROM parts_serial_number WHERE machinery_equipment_id = ".$me['id']);
    $view_notification['machinery_equipment']['parts_serial_number'] = $serial_number;
  }
  
  $view_notifications = array(
    $view_notification,
  );
} else if($view_notification[0]['module_name'] == 'Furniture and Fixture') {

  $furniture_and_fixtures = $con->getData("SELECT * FROM furniture_and_fixtures WHERE id = ".$view_notification[0]['module_id']);
  $view_notification['furniture_and_fixtures'] = $furniture_and_fixtures[0];

  $coa_description = $con->getData("SELECT id, account_title FROM charts_of_account WHERE id = ".$furniture_and_fixtures[0]['coa_description_id']);
  $view_notification['furniture_and_fixtures']['coa_description_id'] = $coa_description[0];

  $article = $con->getData("SELECT id, name FROM articles WHERE id = ".$furniture_and_fixtures[0]['article_id']);
  $view_notification['furniture_and_fixtures']['article_id'] = $article[0];
  
  $view_notifications = array(
    $view_notification,
  );
} else if($view_notification[0]['module_name'] == 'Land') {

  $land_and_land_improvements = $con->getData("SELECT * FROM land_and_land_improvements WHERE id = ".$view_notification[0]['module_id']);
  $view_notification['other_equipment'] = $land_and_land_improvements[0];
  
  $view_notifications = array(
    $view_notification,
  );
} else if($view_notification[0]['module_name'] == 'Infrastructure Asset') {

  $infrastructure_assets = $con->getData("SELECT * FROM infrastructure_assets WHERE id = ".$view_notification[0]['module_id']);
  $view_notification['other_equipment'] = $infrastructure_assets[0];
  
  $view_notifications = array(
    $view_notification,
  );
} else if($view_notification[0]['module_name'] == 'Building Structures') {

  $building_and_structures = $con->getData("SELECT * FROM building_and_structures WHERE id = ".$view_notification[0]['module_id']);
  $view_notification['other_equipment'] = $building_and_structures[0];
  
  $view_notifications = array(
    $view_notification,
  );
} else if($view_notification[0]['module_name'] == 'REPAR') {

  $par_details = $con->getData("SELECT id, accountable_officer, office_id FROM machinery_equipment_pars WHERE id = ".$view_notification[0]['module_id']);
  
  $accountable_officer = $con->getData("SELECT id, CONCAT(first_name,' ',last_name) as accountable_officer, office_id, position_id FROM users WHERE id = ".$par_details[0]['accountable_officer']);
  $view_notification['par_details'] = $accountable_officer[0];
  
  $office_id = $con->getData("SELECT id, name, shortname FROM offices WHERE id = ".$accountable_officer[0]['office_id']);
  $view_notification['par_details']['office_id'] = $office_id[0];
  
  $position_id = $con->getData("SELECT id, position_description FROM positions WHERE id = ".$accountable_officer[0]['position_id']);
  $view_notification['par_details']['position_id'] = $position_id[0];
  
  $user_id = $con->getData("SELECT id, CONCAT(first_name,' ',last_name) as gso_officer, office_id, position_id FROM users WHERE id = ".$view_notification[0]['user_id']);
  $view_notification['view_notification']['user_id'] = $user_id[0];

  $par_machinery_equipments_mes = $con->getData("SELECT * FROM par_machinery_equipment WHERE equipment_description = 'Machinery Equipment' AND par_id = ".$view_notification[0]['module_id']." AND status = 'PAR'");

  foreach($par_machinery_equipments_mes as $index => $pmem) {
    
  $machinery_equipments = $con->getData("SELECT * FROM machinery_equipment WHERE id = ".$pmem['equipment_id']);
  $par_machinery_equipments_mes[$index] = $machinery_equipments[0];
  
  $article_id = $con->getData("SELECT id, name FROM articles WHERE id = ".$machinery_equipments[0]['article_id']);
  $par_machinery_equipments_mes[$index]['article_id'] = $article_id[0];
  
  $brand_id = $con->getData("SELECT id, name FROM brands WHERE id = ".$machinery_equipments[0]['brand_id']);
  $par_machinery_equipments_mes[$index]['brand_id'] = $brand_id[0];

  }

  $par_machinery_equipments_bss = $con->getData("SELECT * FROM par_machinery_equipment WHERE equipment_description = 'Building and Structures' AND par_id = ".$view_notification[0]['module_id']." AND status = 'PAR'");
  
  foreach($par_machinery_equipments_bss as $index => $pmeb) {
    
    $building_and_structures = $con->getData("SELECT id, CONCAT(building_and_structure_property_no) as property_number, CONCAT(carrying_amount) as acquisition_cost, building_and_structure_component, building_and_structure_id,  remarks FROM building_and_structures WHERE id = ".$pmeb['equipment_id']);
    $par_machinery_equipments_bss[$index] = $building_and_structures[0];

    $par_machinery_equipments_bss[$index]['article_id'] = array(
      "id" => 0,
      "name" => $building_and_structures[0]['building_and_structure_component']
    );
  
    $par_machinery_equipments_bss[$index]['brand_id'] = array(
      "id" => 0,
      "name" => $building_and_structures[0]['building_and_structure_id']
    );
  
  }

  $par_machinery_equipments_ffs = $con->getData("SELECT * FROM par_machinery_equipment WHERE equipment_description = 'Furniture and Fixture' AND par_id = ".$view_notification[0]['module_id']." AND status = 'PAR'");
  
  foreach($par_machinery_equipments_ffs as $index => $pmef) {
    
    $furniture_and_fixtures = $con->getData("SELECT id, property_number, article_id, furniture_and_fixture_condition, CONCAT(carrying_amount) as acquisition_cost, remarks FROM furniture_and_fixtures WHERE id = ".$pmef['equipment_id']);
    $par_machinery_equipments_ffs[$index] = $furniture_and_fixtures[0];
    
    $article_id = $con->getData("SELECT id, name FROM articles WHERE id = ".$furniture_and_fixtures[0]['article_id']);
    $par_machinery_equipments_ffs[$index]['article_id'] = $article_id[0];

    $par_machinery_equipments_ffs[$index]['brand_id'] = array(
      "id" => 0,
      "name" => $furniture_and_fixtures[0]['furniture_and_fixture_condition']
    );
  
  }

  $par_machinery_equipments_ias = $con->getData("SELECT * FROM par_machinery_equipment WHERE equipment_description = 'Infrastructure Assets' AND par_id = ".$view_notification[0]['module_id']." AND status = 'PAR'");

  foreach($par_machinery_equipments_ias as $index => $pmei) {
    
    $infrastructure_assets = $con->getData("SELECT id, CONCAT(component_property_no) as property_number, CONCAT(carrying_amount) as acquisition_cost, type_of_infrastructure, infrastructure_id_number, remarks FROM infrastructure_assets WHERE id = ".$pmei['equipment_id']);
    $par_machinery_equipments_ias[$index] = $infrastructure_assets[0];
    
    $par_machinery_equipments_ias[$index]['article_id'] = array(
      "id" => 0,
      "name" => $infrastructure_assets[0]['type_of_infrastructure']
    );
  
    $par_machinery_equipments_ias[$index]['brand_id'] = array(
      "id" => 0,
      "name" => $infrastructure_assets[0]['infrastructure_id_number']
    );
  
  }

  $par_machinery_equipments_llis = $con->getData("SELECT * FROM par_machinery_equipment WHERE equipment_description = 'Land and Land Improvements' AND par_id = ".$view_notification[0]['module_id']." AND status = 'PAR'");

  foreach($par_machinery_equipments_llis as $index => $pmel) {
    
    $land_and_land_improvements = $con->getData("SELECT id, CONCAT(id_number) as property_number, classification, CONCAT(carrying_amount) as acquisition_cost, land_condition, remarks FROM land_and_land_improvements WHERE id = ".$pmel['equipment_id']);
    $par_machinery_equipments_llis[$index] = $land_and_land_improvements[0];
    
    $par_machinery_equipments_llis[$index]['article_id'] = array(
      "id" => 0,
      "name" => $land_and_land_improvements[0]['classification']
    );

    $par_machinery_equipments_llis[$index]['brand_id'] = array(
      "id" => 0,
      "name" => $land_and_land_improvements[0]['land_condition']
    );
  
  }

  $equipment_list = array_merge(
    $par_machinery_equipments_mes,
    $par_machinery_equipments_bss,
    $par_machinery_equipments_ffs,
    $par_machinery_equipments_ias,
    $par_machinery_equipments_llis
  );

  $view_notification['equipment_list'] = $equipment_list;

  $view_notifications = array(
    $view_notification,
    $par_details,
    $equipment_list
  );

} else if($view_notification[0]['module_name'] == 'TRANSFERRED') {

  $purpose = $view_notification[0]['purpose'];
  
  $par_details = $con->getData("SELECT id, accountable_officer, office_id FROM machinery_equipment_pars WHERE id = ".$view_notification[0]['module_id']);

  $par_machinery_equipments_mes = [];
  $par_machinery_equipments_bss = [];
  $par_machinery_equipments_ffs = [];
  $par_machinery_equipments_ias = [];
  $par_machinery_equipments_llis = [];

  if($purpose != 'DONATION') {
    
    $accountable_officer = $con->getData("SELECT id, CONCAT(first_name,' ',last_name) as accountable_officer, office_id, position_id FROM users WHERE id = ".$par_details[0]['accountable_officer']);
    $view_notification['par_details'] = $accountable_officer[0];
    
    $office_id = $con->getData("SELECT id, name, shortname FROM offices WHERE id = ".$accountable_officer[0]['office_id']);
    $view_notification['par_details']['office_id'] = $office_id[0];
    
    $position_id = $con->getData("SELECT id, position_description FROM positions WHERE id = ".$accountable_officer[0]['position_id']);
    $view_notification['par_details']['position_id'] = $position_id[0];
    
    $user_id = $con->getData("SELECT id, CONCAT(first_name,' ',last_name) as gso_officer, office_id, position_id FROM users WHERE id = ".$view_notification[0]['user_id']);
    $view_notification['view_notification']['user_id'] = $user_id[0];
    
    $par_machinery_equipments_mes = $con->getData("SELECT * FROM par_machinery_equipment WHERE equipment_description = 'Machinery Equipment' AND par_id = ".$view_notification[0]['module_id']." AND status = '$purpose'");

    $par_machinery_equipments_bss = $con->getData("SELECT * FROM par_machinery_equipment WHERE equipment_description = 'Building and Structures' AND par_id = ".$view_notification[0]['module_id']." AND status = '$purpose'");

    $par_machinery_equipments_ffs = $con->getData("SELECT * FROM par_machinery_equipment WHERE equipment_description = 'Furniture and Fixture' AND  par_id = ".$view_notification[0]['module_id']." AND status = '$purpose'");

    $par_machinery_equipments_ias = $con->getData("SELECT * FROM par_machinery_equipment WHERE equipment_description = 'Infrastructure Assets' AND par_id = ".$view_notification[0]['module_id']." AND status = '$purpose'");

    $par_machinery_equipments_llis = $con->getData("SELECT * FROM par_machinery_equipment WHERE equipment_description = 'Land and Land Improvements' AND par_id = ".$view_notification[0]['module_id']." AND status = '$purpose'");

    foreach($par_machinery_equipments_mes as $index => $pmem) {
    
      $machinery_equipments = $con->getData("SELECT * FROM machinery_equipment WHERE id = ".$pmem['equipment_id']);
      $par_machinery_equipments_mes[$index] = $machinery_equipments[0];
      
      $article_id = $con->getData("SELECT id, name FROM articles WHERE id = ".$machinery_equipments[0]['article_id']);
      $par_machinery_equipments_mes[$index]['article_id'] = $article_id[0];
      
      $brand_id = $con->getData("SELECT id, name FROM brands WHERE id = ".$machinery_equipments[0]['brand_id']);
      $par_machinery_equipments_mes[$index]['brand_id'] = $brand_id[0];
    
      }

      foreach($par_machinery_equipments_bss as $index => $pmeb) {
    
        $building_and_structures = $con->getData("SELECT id, CONCAT(building_and_structure_property_no) as property_number, CONCAT(carrying_amount) as acquisition_cost, building_and_structure_component, building_and_structure_id,  remarks FROM building_and_structures WHERE id = ".$pmeb['equipment_id']);
        $par_machinery_equipments_bss[$index] = $building_and_structures[0];
    
        $par_machinery_equipments_bss[$index]['article_id'] = array(
          "id" => 0,
          "name" => $building_and_structures[0]['building_and_structure_component']
        );
      
        $par_machinery_equipments_bss[$index]['brand_id'] = array(
          "id" => 0,
          "name" => $building_and_structures[0]['building_and_structure_id']
        );
      
      }

      foreach($par_machinery_equipments_ffs as $index => $pmef) {
    
        $furniture_and_fixtures = $con->getData("SELECT id, property_number, article_id, furniture_and_fixture_condition, CONCAT(carrying_amount) as acquisition_cost, remarks FROM furniture_and_fixtures WHERE id = ".$pmef['equipment_id']);
        $par_machinery_equipments_ffs[$index] = $furniture_and_fixtures[0];
        
        $article_id = $con->getData("SELECT id, name FROM articles WHERE id = ".$furniture_and_fixtures[0]['article_id']);
        $par_machinery_equipments_ffs[$index]['article_id'] = $article_id[0];
    
        $par_machinery_equipments_ffs[$index]['brand_id'] = array(
          "id" => 0,
          "name" => $furniture_and_fixtures[0]['furniture_and_fixture_condition']
        );
      
      }

      foreach($par_machinery_equipments_ias as $index => $pmei) {
    
        $infrastructure_assets = $con->getData("SELECT id, CONCAT(component_property_no) as property_number, CONCAT(carrying_amount) as acquisition_cost, type_of_infrastructure, infrastructure_id_number, remarks FROM infrastructure_assets WHERE id = ".$pmei['equipment_id']);
        $par_machinery_equipments_ias[$index] = $infrastructure_assets[0];
        
        $par_machinery_equipments_ias[$index]['article_id'] = array(
          "id" => 0,
          "name" => $infrastructure_assets[0]['type_of_infrastructure']
        );
      
        $par_machinery_equipments_ias[$index]['brand_id'] = array(
          "id" => 0,
          "name" => $infrastructure_assets[0]['infrastructure_id_number']
        );
      
      }

      foreach($par_machinery_equipments_llis as $index => $pmel) {
    
        $land_and_land_improvements = $con->getData("SELECT id, CONCAT(id_number) as property_number, classification, CONCAT(carrying_amount) as acquisition_cost, land_condition, remarks FROM land_and_land_improvements WHERE id = ".$pmel['equipment_id']);
        $par_machinery_equipments_llis[$index] = $land_and_land_improvements[0];
        
        $par_machinery_equipments_llis[$index]['article_id'] = array(
          "id" => 0,
          "name" => $land_and_land_improvements[0]['classification']
        );
    
        $par_machinery_equipments_llis[$index]['brand_id'] = array(
          "id" => 0,
          "name" => $land_and_land_improvements[0]['land_condition']
        );
      
      }

  } else {

    $par_details = $con->getData("SELECT id, accountable_officer, office_id FROM machinery_equipment_pars WHERE id = ".$view_notification[0]['module_id']);

    $par_machinery_equipments_mes = $con->getData("SELECT * FROM par_machinery_equipment WHERE equipment_description = 'Machinery Equipment' AND par_id = ".$view_notification[0]['module_id']." AND status = '$purpose'");

    $par_machinery_equipments_bss = $con->getData("SELECT * FROM par_machinery_equipment WHERE equipment_description = 'Building and Structures' AND par_id = ".$view_notification[0]['module_id']." AND status = '$purpose'");

    $par_machinery_equipments_ffs = $con->getData("SELECT * FROM par_machinery_equipment WHERE equipment_description = 'Furniture and Fixture' AND  par_id = ".$view_notification[0]['module_id']." AND status = '$purpose'");

    $par_machinery_equipments_ias = $con->getData("SELECT * FROM par_machinery_equipment WHERE equipment_description = 'Infrastructure Assets' AND par_id = ".$view_notification[0]['module_id']." AND status = '$purpose'");

    $par_machinery_equipments_llis = $con->getData("SELECT * FROM par_machinery_equipment WHERE equipment_description = 'Land and Land Improvements' AND par_id = ".$view_notification[0]['module_id']." AND status = '$purpose'");
    
    $accountable_officer = $con->getData("SELECT id, CONCAT(first_name,' ',last_name) as accountable_officer, office_id, position_id FROM users WHERE id = ".$par_details[0]['accountable_officer']);
    $view_notification['par_details']['accountable_officer'] = 'DONATED';
    
    $user_id = $con->getData("SELECT id, CONCAT(first_name,' ',last_name) as gso_officer, office_id, position_id FROM users WHERE id = ".$view_notification[0]['user_id']);
    $view_notification['view_notification']['user_id'] = $user_id[0];

    foreach($par_machinery_equipments_mes as $index => $pmem) {
    
      $machinery_equipments = $con->getData("SELECT * FROM machinery_equipment WHERE id = ".$pmem['equipment_id']);
      $par_machinery_equipments_mes[$index] = $machinery_equipments[0];
      
      $article_id = $con->getData("SELECT id, name FROM articles WHERE id = ".$machinery_equipments[0]['article_id']);
      $par_machinery_equipments_mes[$index]['article_id'] = $article_id[0];
      
      $brand_id = $con->getData("SELECT id, name FROM brands WHERE id = ".$machinery_equipments[0]['brand_id']);
      $par_machinery_equipments_mes[$index]['brand_id'] = $brand_id[0];
    
      }

      foreach($par_machinery_equipments_bss as $index => $pmeb) {
    
        $building_and_structures = $con->getData("SELECT id, CONCAT(building_and_structure_property_no) as property_number, CONCAT(carrying_amount) as acquisition_cost, building_and_structure_component, building_and_structure_id,  remarks FROM building_and_structures WHERE id = ".$pmeb['equipment_id']);
        $par_machinery_equipments_bss[$index] = $building_and_structures[0];
    
        $par_machinery_equipments_bss[$index]['article_id'] = array(
          "id" => 0,
          "name" => $building_and_structures[0]['building_and_structure_component']
        );
      
        $par_machinery_equipments_bss[$index]['brand_id'] = array(
          "id" => 0,
          "name" => $building_and_structures[0]['building_and_structure_id']
        );
      
      }

      foreach($par_machinery_equipments_ffs as $index => $pmef) {
    
        $furniture_and_fixtures = $con->getData("SELECT id, property_number, article_id, furniture_and_fixture_condition, CONCAT(carrying_amount) as acquisition_cost, remarks FROM furniture_and_fixtures WHERE id = ".$pmef['equipment_id']);
        $par_machinery_equipments_ffs[$index] = $furniture_and_fixtures[0];
        
        $article_id = $con->getData("SELECT id, name FROM articles WHERE id = ".$furniture_and_fixtures[0]['article_id']);
        $par_machinery_equipments_ffs[$index]['article_id'] = $article_id[0];
    
        $par_machinery_equipments_ffs[$index]['brand_id'] = array(
          "id" => 0,
          "name" => $furniture_and_fixtures[0]['furniture_and_fixture_condition']
        );
      
      }

      foreach($par_machinery_equipments_ias as $index => $pmei) {
    
        $infrastructure_assets = $con->getData("SELECT id, CONCAT(component_property_no) as property_number, CONCAT(carrying_amount) as acquisition_cost, type_of_infrastructure, infrastructure_id_number, remarks FROM infrastructure_assets WHERE id = ".$pmei['equipment_id']);
        $par_machinery_equipments_ias[$index] = $infrastructure_assets[0];
        
        $par_machinery_equipments_ias[$index]['article_id'] = array(
          "id" => 0,
          "name" => $infrastructure_assets[0]['type_of_infrastructure']
        );
      
        $par_machinery_equipments_ias[$index]['brand_id'] = array(
          "id" => 0,
          "name" => $infrastructure_assets[0]['infrastructure_id_number']
        );
      
      }

      foreach($par_machinery_equipments_llis as $index => $pmel) {
    
        $land_and_land_improvements = $con->getData("SELECT id, CONCAT(id_number) as property_number, classification, CONCAT(carrying_amount) as acquisition_cost, land_condition, remarks FROM land_and_land_improvements WHERE id = ".$pmel['equipment_id']);
        $par_machinery_equipments_llis[$index] = $land_and_land_improvements[0];
        
        $par_machinery_equipments_llis[$index]['article_id'] = array(
          "id" => 0,
          "name" => $land_and_land_improvements[0]['classification']
        );
    
        $par_machinery_equipments_llis[$index]['brand_id'] = array(
          "id" => 0,
          "name" => $land_and_land_improvements[0]['land_condition']
        );
      
      }

  }

  $equipment_list = array_merge(
    $par_machinery_equipments_mes,
    $par_machinery_equipments_bss,
    $par_machinery_equipments_ffs,
    $par_machinery_equipments_ias,
    $par_machinery_equipments_llis
  );
  
  $view_notification['equipment_list'] = $equipment_list;
  
  $view_notifications = array(
    $view_notification,
    $par_details,
    $equipment_list
  );

} else if($view_notification[0]['module_name'] == 'RETURNED') {

  $par_details = $con->getData("SELECT id, accountable_officer, office_id FROM machinery_equipment_pars WHERE id = ".$view_notification[0]['module_id']);

  $purpose = $view_notification[0]['purpose'];

  $par_machinery_equipments_mes = $con->getData("SELECT * FROM par_machinery_equipment WHERE equipment_description = 'Machinery Equipment' AND par_id = ".$view_notification[0]['module_id']." AND status = '$purpose'");

  $par_machinery_equipments_bss = $con->getData("SELECT * FROM par_machinery_equipment WHERE equipment_description = 'Building and Structures' AND par_id = ".$view_notification[0]['module_id']." AND status = '$purpose'");

  $par_machinery_equipments_ffs = $con->getData("SELECT * FROM par_machinery_equipment WHERE equipment_description = 'Furniture and Fixture' AND  par_id = ".$view_notification[0]['module_id']." AND status = '$purpose'");

  $par_machinery_equipments_ias = $con->getData("SELECT * FROM par_machinery_equipment WHERE equipment_description = 'Infrastructure Assets' AND par_id = ".$view_notification[0]['module_id']." AND status = '$purpose'");

  $par_machinery_equipments_llis = $con->getData("SELECT * FROM par_machinery_equipment WHERE equipment_description = 'Land and Land Improvements' AND par_id = ".$view_notification[0]['module_id']." AND status = '$purpose'");

  $accountable_officer = $con->getData("SELECT id, CONCAT(first_name,' ',last_name) as accountable_officer, office_id, position_id FROM users WHERE id = ".$par_details[0]['accountable_officer']);
  $view_notification['par_details']['accountable_officer'] = 'RETURNED';
  
  $user_id = $con->getData("SELECT id, CONCAT(first_name,' ',last_name) as gso_officer, office_id, position_id FROM users WHERE id = ".$view_notification[0]['user_id']);
  $view_notification['view_notification']['user_id'] = $user_id[0];
  
  foreach($par_machinery_equipments_mes as $index => $pmem) {
    
    $machinery_equipments = $con->getData("SELECT * FROM machinery_equipment WHERE id = ".$pmem['equipment_id']);
    $par_machinery_equipments_mes[$index] = $machinery_equipments[0];
    
    $article_id = $con->getData("SELECT id, name FROM articles WHERE id = ".$machinery_equipments[0]['article_id']);
    $par_machinery_equipments_mes[$index]['article_id'] = $article_id[0];
    
    $brand_id = $con->getData("SELECT id, name FROM brands WHERE id = ".$machinery_equipments[0]['brand_id']);
    $par_machinery_equipments_mes[$index]['brand_id'] = $brand_id[0];
  
    }

    foreach($par_machinery_equipments_bss as $index => $pmeb) {
  
      $building_and_structures = $con->getData("SELECT id, CONCAT(building_and_structure_property_no) as property_number, CONCAT(carrying_amount) as acquisition_cost, building_and_structure_component, building_and_structure_id,  remarks FROM building_and_structures WHERE id = ".$pmeb['equipment_id']);
      $par_machinery_equipments_bss[$index] = $building_and_structures[0];
  
      $par_machinery_equipments_bss[$index]['article_id'] = array(
        "id" => 0,
        "name" => $building_and_structures[0]['building_and_structure_component']
      );
    
      $par_machinery_equipments_bss[$index]['brand_id'] = array(
        "id" => 0,
        "name" => $building_and_structures[0]['building_and_structure_id']
      );
    
    }

    foreach($par_machinery_equipments_ffs as $index => $pmef) {
  
      $furniture_and_fixtures = $con->getData("SELECT id, property_number, article_id, furniture_and_fixture_condition, CONCAT(carrying_amount) as acquisition_cost, remarks FROM furniture_and_fixtures WHERE id = ".$pmef['equipment_id']);
      $par_machinery_equipments_ffs[$index] = $furniture_and_fixtures[0];
      
      $article_id = $con->getData("SELECT id, name FROM articles WHERE id = ".$furniture_and_fixtures[0]['article_id']);
      $par_machinery_equipments_ffs[$index]['article_id'] = $article_id[0];
  
      $par_machinery_equipments_ffs[$index]['brand_id'] = array(
        "id" => 0,
        "name" => $furniture_and_fixtures[0]['furniture_and_fixture_condition']
      );
    
    }

    foreach($par_machinery_equipments_ias as $index => $pmei) {
  
      $infrastructure_assets = $con->getData("SELECT id, CONCAT(component_property_no) as property_number, CONCAT(carrying_amount) as acquisition_cost, type_of_infrastructure, infrastructure_id_number, remarks FROM infrastructure_assets WHERE id = ".$pmei['equipment_id']);
      $par_machinery_equipments_ias[$index] = $infrastructure_assets[0];
      
      $par_machinery_equipments_ias[$index]['article_id'] = array(
        "id" => 0,
        "name" => $infrastructure_assets[0]['type_of_infrastructure']
      );
    
      $par_machinery_equipments_ias[$index]['brand_id'] = array(
        "id" => 0,
        "name" => $infrastructure_assets[0]['infrastructure_id_number']
      );
    
    }

    foreach($par_machinery_equipments_llis as $index => $pmel) {
  
      $land_and_land_improvements = $con->getData("SELECT id, CONCAT(id_number) as property_number, classification, CONCAT(carrying_amount) as acquisition_cost, land_condition, remarks FROM land_and_land_improvements WHERE id = ".$pmel['equipment_id']);
      $par_machinery_equipments_llis[$index] = $land_and_land_improvements[0];
      
      $par_machinery_equipments_llis[$index]['article_id'] = array(
        "id" => 0,
        "name" => $land_and_land_improvements[0]['classification']
      );
  
      $par_machinery_equipments_llis[$index]['brand_id'] = array(
        "id" => 0,
        "name" => $land_and_land_improvements[0]['land_condition']
      );
    
    }

    $equipment_list = array_merge(
      $par_machinery_equipments_mes,
      $par_machinery_equipments_bss,
      $par_machinery_equipments_ffs,
      $par_machinery_equipments_ias,
      $par_machinery_equipments_llis
    );
    
    $view_notification['equipment_list'] = $equipment_list;
    
    $view_notifications = array(
      $view_notification,
      $par_details,
      $equipment_list
    );

} else if($view_notification[0]['module_name'] == 'USER') {

  $user_details = $con->getData("SELECT id, employee_id, CONCAT(first_name,' ',last_name) AS name, email, office_id, position_id, groups FROM users WHERE id = ".$view_notification[0]['module_id']);
  
  $office = $con->getData("SELECT id, name FROM offices WHERE id = ".$user_details[0]['office_id']);
  $user_details[0]['office_id'] = $office[0];

  $position = $con->getData("SELECT id, position_description FROM positions WHERE id = ".$user_details[0]['position_id']);
  $user_details[0]['position_id'] = $position[0];
  
  $group = $con->getData("SELECT id, name FROM groups WHERE id = ".$user_details[0]['groups']);
  $user_details[0]['groups'] = $group[0];

  $view_notifications = array(
    $user_details[0]
  );

}

$con = new pdo_db("notifications");

// $sql = "UPDATE notifications SET dismiss = 1 WHERE id = $_POST[id]";
// $con->query($sql);

echo json_encode($view_notifications[0]);

ob_end_flush();
?>