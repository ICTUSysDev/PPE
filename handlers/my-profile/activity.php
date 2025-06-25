<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

session_start();

$session_id = $_SESSION['id'];

$date_today = date('Y-m-d'); //'2024-01-11';
$word_date = date('M d, Y');

$profile_activity_today = $con->getData("SELECT *, DATE(created_at) AS date_today FROM history WHERE user_id = $session_id AND DATE(created_at) = '$date_today' ORDER BY id DESC");

foreach($profile_activity_today as $index => $pat) {
  
  // var_dump($pat); exit();

  if($pat['action_name'] == 'ADDED') {
    if($pat['module_name'] == 'LAND') {
      $activities = $con->getData("SELECT id, land_code AS ppe_code FROM land_and_land_improvements WHERE id = ".$pat['module_id']);
      $profile_activity_today[$index]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'LAND IMPROVEMENT') {
      $activities = $con->getData("SELECT id, land_code AS ppe_code FROM land_and_land_improvements WHERE id = ".$pat['module_id']);
      $profile_activity_today[$index]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'INFRASTRUCTURE ASSET') {
      $activities = $con->getData("SELECT id, infrastructure_id_number AS ppe_code FROM infrastructure_assets WHERE id = ".$pat['module_id']);
      $profile_activity_today[$index]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'BUILDING AND OTHER STRUCTURE') {
      $activities = $con->getData("SELECT id, building_and_structure_id AS ppe_code FROM building_and_structures WHERE id = ".$pat['module_id']);
      $profile_activity_today[$index]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'MACHINERY AND EQUIPMENT') {
      $activities = $con->getData("SELECT id, property_number AS ppe_code FROM machinery_equipment WHERE id = ".$pat['module_id']);
      $profile_activity_today[$index]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'SERIAL NUMBER') {
      $activities = $con->getData("SELECT id, serial_number AS ppe_code FROM parts_serial_number WHERE machinery_equipment_id = ".$pat['module_id']);
      $profile_activity_today[$index]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'FURNITURE AND FIXTURE') {
      $activities = $con->getData("SELECT id, property_number AS ppe_code FROM furniture_and_fixtures WHERE id = ".$pat['module_id']);
      $profile_activity_today[$index]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'MACHINERY AND EQUIPMENT ICS') {
      $activities = $con->getData("SELECT id, property_number AS ppe_code FROM machinery_equipment WHERE id = ".$pat['module_id']);
      $profile_activity_today[$index]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'MACHINERY AND EQUIPMENT PHYSICAL INVENTORY') {
      $activities = $con->getData("SELECT id, property_number AS ppe_code FROM machinery_equipment WHERE id = ".$pat['module_id']);
      $profile_activity_today[$index]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'FURNITURE AND FIXTURES PHYSICAL INVENTORY') {
      $activities = $con->getData("SELECT id, property_number AS ppe_code FROM furniture_and_fixtures WHERE id = ".$pat['module_id']);
      $profile_activity_today[$index]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'LAND AND LAND IMPROVEMENT PHYSICAL INVENTORY') {
      $activities = $con->getData("SELECT id, land_code AS ppe_code FROM land_and_land_improvements WHERE id = ".$pat['module_id']);
      $profile_activity_today[$index]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'INFRASTRUCTURE ASSET PHYSICAL INVENTORY') {
      $activities = $con->getData("SELECT id, infrastructure_id_number AS ppe_code FROM infrastructure_assets WHERE id = ".$pat['module_id']);
      $profile_activity_today[$index]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'BUILDING AND OTHER STRUCTURE PHYSICAL INVENTORY') {
      $activities = $con->getData("SELECT id, building_and_structure_id AS ppe_code FROM building_and_structures WHERE id = ".$pat['module_id']);
      $profile_activity_today[$index]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'WASTE MATERIAL') {
      $activities = $con->getData("SELECT id, receipt_number AS ppe_code FROM waste_materials WHERE id = ".$pat['module_id']);
      $profile_activity_today[$index]['activities'] = isset($activities[0]) ? $activities[0] : null;
    }
  } else if($pat['action_name'] == 'UPDATED') {
    if($pat['module_name'] == 'LAND') {
      $activities = $con->getData("SELECT id, land_code AS ppe_code FROM land_and_land_improvements WHERE id = ".$pat['module_id']);
      $profile_activity_today[$index]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'LAND IMPROVEMENT') {
      $activities = $con->getData("SELECT id, land_code AS ppe_code FROM land_and_land_improvements WHERE id = ".$pat['module_id']);
      $profile_activity_today[$index]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'INFRASTRUCTURE ASSET') {
      $activities = $con->getData("SELECT id, infrastructure_id_number AS ppe_code FROM infrastructure_assets WHERE id = ".$pat['module_id']);
      $profile_activity_today[$index]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'BUILDING AND OTHER STRUCTURE') {
      $activities = $con->getData("SELECT id, building_and_structure_id AS ppe_code FROM building_and_structures WHERE id = ".$pat['module_id']);
      $profile_activity_today[$index]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'MACHINERY AND EQUIPMENT') {
      $activities = $con->getData("SELECT id, property_number AS ppe_code FROM machinery_equipment WHERE id = ".$pat['module_id']);
      $profile_activity_today[$index]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'SERIAL NUMBER') {
      $activities = $con->getData("SELECT id, serial_number AS ppe_code FROM parts_serial_number WHERE machinery_equipment_id = ".$pat['module_id']);
      $profile_activity_today[$index]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'FURNITURE AND FIXTURE') {
      $activities = $con->getData("SELECT id, property_number AS ppe_code FROM furniture_and_fixtures WHERE id = ".$pat['module_id']);
      $profile_activity_today[$index]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'MACHINERY AND EQUIPMENT ICS') {
      $activities = $con->getData("SELECT id, property_number AS ppe_code FROM machinery_equipment WHERE id = ".$pat['module_id']);
      $profile_activity_today[$index]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'WASTE MATERIAL') {
      $activities = $con->getData("SELECT id, receipt_number AS ppe_code FROM waste_materials WHERE id = ".$pat['module_id']);
      $profile_activity_today[$index]['activities'] = isset($activities[0]) ? $activities[0] : null;
    }
  } else if($pat['action_name'] == 'REPAIRED') {
    if($pat['module_name'] == 'MACHINERY EQUIPMENT') {
      $activities = $con->getData("SELECT id, property_number AS ppe_code FROM machinery_equipment WHERE id = ".$pat['module_id']);
      $profile_activity_today[$index]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'FURNITURE AND FIXTURE') {
      $activities = $con->getData("SELECT id, property_number AS ppe_code FROM furniture_and_fixtures WHERE id = ".$pat['module_id']);
      $profile_activity_today[$index]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'MACHINERY AND EQUIPMENT') {
      $activities = $con->getData("SELECT id, property_number AS ppe_code FROM machinery_equipment WHERE id = ".$pat['module_id']);
      $profile_activity_today[$index]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'FURNITURE AND FIXTURES') {
      $activities = $con->getData("SELECT id, property_number AS ppe_code FROM furniture_and_fixtures WHERE id = ".$pat['module_id']);
      $profile_activity_today[$index]['activities'] = isset($activities[0]) ? $activities[0] : null;
    }
  }

  if($pat['module_name'] == 'PAR' || $pat['module_name'] == 'TRANSFER' || $pat['module_name'] == 'RETURN' || $pat['module_name'] == 'ICS PAR') {

    $par_machinery_equipment = $con->getData("SELECT * FROM par_machinery_equipment WHERE par_id = ".$pat['module_id']);

    foreach($par_machinery_equipment as $i => $a) {
    
      if($a['equipment_description'] == 'Machinery Equipment') {
        $machinery_equipment = $con->getData("SELECT * FROM machinery_equipment WHERE id = ".$a['equipment_id']);

        foreach($machinery_equipment as $m => $me) {
          $article = $con->getData("SELECT * FROM articles WHERE id = ".$me['article_id']);
          $machinery_equipment[$m]['machinery_equipment_data'] = $article[0];
        }

        $par_machinery_equipment[$i]['machinery_equipment'] = $machinery_equipment[0];
      } else {
        $machinery_equipment = $con->getData("SELECT * FROM furniture_and_fixtures WHERE id = ".$a['equipment_id']);

        foreach($machinery_equipment as $m => $me) {
          $article = $con->getData("SELECT * FROM articles WHERE id = ".$me['article_id']);
          $machinery_equipment[$m]['machinery_equipment_data'] = $article[0];
        }

        $par_machinery_equipment[$i]['machinery_equipment'] = $machinery_equipment[0];
      }

    }

    $profile_activity_today[$index]['activities'] = $par_machinery_equipment;

  }

  if($pat['action_name'] == 'UPLOADED') {

    $activities = $con->getData("SELECT * FROM upload_files WHERE history_id = ".$pat['id']);
    
      foreach($activities as $key => $a) {
        if (str_contains($a['file_name'], '.')) {
          $parts = explode('.', $a['file_name']);
          $extension = end($parts);
        }
      
        if($extension == 'pdf'){
          $activities[$key]['file_path'] = './assets/media/svg/files/pdf.svg';
        } else {
          $activities[$key]['file_path'] = './assets/media/svg/files/photo.svg';
        }
      
      }

    $profile_activity_today[$index]['activities'] = $activities;

  }
  
}

$profile_activity_week = $con->getData("SELECT *, DATE_FORMAT(created_at, '%b %d, %Y %h:%i %p') AS formatted_created_at FROM history WHERE user_id = $session_id AND created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY) ORDER BY id DESC");

foreach($profile_activity_week as $paw => $pat) {
  
  if($pat['action_name'] == 'ADDED') {
    if($pat['module_name'] == 'LAND') {
      $activities = $con->getData("SELECT id, land_code AS ppe_code FROM land_and_land_improvements WHERE id = ".$pat['module_id']);
      $profile_activity_week[$paw]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'LAND IMPROVEMENT') {
      $activities = $con->getData("SELECT id, land_code AS ppe_code FROM land_and_land_improvements WHERE id = ".$pat['module_id']);
      $profile_activity_week[$paw]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'INFRASTRUCTURE ASSET') {
      $activities = $con->getData("SELECT id, infrastructure_id_number AS ppe_code FROM infrastructure_assets WHERE id = ".$pat['module_id']);
      $profile_activity_week[$paw]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'BUILDING AND OTHER STRUCTURE') {
      $activities = $con->getData("SELECT id, building_and_structure_id AS ppe_code FROM building_and_structures WHERE id = ".$pat['module_id']);
      $profile_activity_week[$paw]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'MACHINERY AND EQUIPMENT') {
      $activities = $con->getData("SELECT id, property_number AS ppe_code FROM machinery_equipment WHERE id = ".$pat['module_id']);
      $profile_activity_week[$paw]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'SERIAL NUMBER') {
      $activities = $con->getData("SELECT id, serial_number AS ppe_code FROM parts_serial_number WHERE machinery_equipment_id = ".$pat['module_id']);
      $profile_activity_week[$paw]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'FURNITURE AND FIXTURE') {
      $activities = $con->getData("SELECT id, property_number AS ppe_code FROM furniture_and_fixtures WHERE id = ".$pat['module_id']);
      $profile_activity_week[$paw]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'MACHINERY AND EQUIPMENT ICS') {
      $activities = $con->getData("SELECT id, property_number AS ppe_code FROM machinery_equipment WHERE id = ".$pat['module_id']);
      $profile_activity_week[$paw]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'MACHINERY AND EQUIPMENT PHYSICAL INVENTORY') {
      $activities = $con->getData("SELECT id, property_number AS ppe_code FROM machinery_equipment WHERE id = ".$pat['module_id']);
      $profile_activity_week[$paw]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'FURNITURE AND FIXTURES PHYSICAL INVENTORY') {
      $activities = $con->getData("SELECT id, property_number AS ppe_code FROM furniture_and_fixtures WHERE id = ".$pat['module_id']);
      $profile_activity_week[$paw]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'LAND AND LAND IMPROVEMENT PHYSICAL INVENTORY') {
      $activities = $con->getData("SELECT id, land_code AS ppe_code FROM land_and_land_improvements WHERE id = ".$pat['module_id']);
      $profile_activity_week[$paw]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'INFRASTRUCTURE ASSET PHYSICAL INVENTORY') {
      $activities = $con->getData("SELECT id, infrastructure_id_number AS ppe_code FROM infrastructure_assets WHERE id = ".$pat['module_id']);
      $profile_activity_week[$paw]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'BUILDING AND OTHER STRUCTURE PHYSICAL INVENTORY') {
      $activities = $con->getData("SELECT id, building_and_structure_id AS ppe_code FROM building_and_structures WHERE id = ".$pat['module_id']);
      $profile_activity_week[$paw]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'WASTE MATERIAL') {
      $activities = $con->getData("SELECT id, receipt_number AS ppe_code FROM waste_materials WHERE id = ".$pat['module_id']);
      $profile_activity_week[$paw]['activities'] = isset($activities[0]) ? $activities[0] : null;
    }
  } else if($pat['action_name'] == 'UPDATED') {
    if($pat['module_name'] == 'LAND') {
      $activities = $con->getData("SELECT id, land_code AS ppe_code FROM land_and_land_improvements WHERE id = ".$pat['module_id']);
      $profile_activity_week[$paw]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'LAND IMPROVEMENT') {
      $activities = $con->getData("SELECT id, land_code AS ppe_code FROM land_and_land_improvements WHERE id = ".$pat['module_id']);
      $profile_activity_week[$paw]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'INFRASTRUCTURE ASSET') {
      $activities = $con->getData("SELECT id, infrastructure_id_number AS ppe_code FROM infrastructure_assets WHERE id = ".$pat['module_id']);
      $profile_activity_week[$paw]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'BUILDING AND OTHER STRUCTURE') {
      $activities = $con->getData("SELECT id, building_and_structure_id AS ppe_code FROM building_and_structures WHERE id = ".$pat['module_id']);
      $profile_activity_week[$paw]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'MACHINERY AND EQUIPMENT') {
      $activities = $con->getData("SELECT id, property_number AS ppe_code FROM machinery_equipment WHERE id = ".$pat['module_id']);
      $profile_activity_week[$paw]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'SERIAL NUMBER') {
      $activities = $con->getData("SELECT id, serial_number AS ppe_code FROM parts_serial_number WHERE machinery_equipment_id = ".$pat['module_id']);
      $profile_activity_week[$paw]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'FURNITURE AND FIXTURE') {
      $activities = $con->getData("SELECT id, property_number AS ppe_code FROM furniture_and_fixtures WHERE id = ".$pat['module_id']);
      $profile_activity_week[$paw]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'MACHINERY AND EQUIPMENT ICS') {
      $activities = $con->getData("SELECT id, property_number AS ppe_code FROM machinery_equipment WHERE id = ".$pat['module_id']);
      $profile_activity_week[$paw]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'WASTE MATERIAL') {
      $activities = $con->getData("SELECT id, receipt_number AS ppe_code FROM waste_materials WHERE id = ".$pat['module_id']);
      $profile_activity_week[$paw]['activities'] = isset($activities[0]) ? $activities[0] : null;
    }
  } else if($pat['action_name'] == 'REPAIRED') {
    if($pat['module_name'] == 'MACHINERY EQUIPMENT') {
      $activities = $con->getData("SELECT id, property_number AS ppe_code FROM machinery_equipment WHERE id = ".$pat['module_id']);
      $profile_activity_week[$paw]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'FURNITURE AND FIXTURE') {
      $activities = $con->getData("SELECT id, property_number AS ppe_code FROM furniture_and_fixtures WHERE id = ".$pat['module_id']);
      $profile_activity_week[$paw]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'MACHINERY AND EQUIPMENT') {
      $activities = $con->getData("SELECT id, property_number AS ppe_code FROM machinery_equipment WHERE id = ".$pat['module_id']);
      $profile_activity_week[$paw]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'FURNITURE AND FIXTURES') {
      $activities = $con->getData("SELECT id, property_number AS ppe_code FROM furniture_and_fixtures WHERE id = ".$pat['module_id']);
      $profile_activity_week[$paw]['activities'] = isset($activities[0]) ? $activities[0] : null;
    }
  }

  if($pat['module_name'] == 'PAR' || $pat['module_name'] == 'TRANSFER' || $pat['module_name'] == 'RETURN' || $pat['module_name'] == 'ICS PAR') {

    $par_machinery_equipment = $con->getData("SELECT * FROM par_machinery_equipment WHERE par_id = ".$pat['module_id']);

    foreach($par_machinery_equipment as $i => $a) {
    
      if($a['equipment_description'] == 'Machinery Equipment') {
        $machinery_equipment = $con->getData("SELECT * FROM machinery_equipment WHERE id = ".$a['equipment_id']);

        foreach($machinery_equipment as $m => $me) {
          $article = $con->getData("SELECT * FROM articles WHERE id = ".$me['article_id']);
          $machinery_equipment[$m]['machinery_equipment_data'] = $article[0];
        }

        $par_machinery_equipment[$i]['machinery_equipment'] = $machinery_equipment[0];
      } else {
        $machinery_equipment = $con->getData("SELECT * FROM furniture_and_fixtures WHERE id = ".$a['equipment_id']);

        foreach($machinery_equipment as $m => $me) {
          $article = $con->getData("SELECT * FROM articles WHERE id = ".$me['article_id']);
          $machinery_equipment[$m]['machinery_equipment_data'] = $article[0];
        }

        $par_machinery_equipment[$i]['machinery_equipment'] = $machinery_equipment[0];
      }

    }

    $profile_activity_week[$paw]['activities'] = $par_machinery_equipment;

  }

  if($pat['action_name'] == 'UPLOADED') {

    $activities = $con->getData("SELECT * FROM upload_files WHERE history_id = ".$pat['id']);
    
      foreach($activities as $key => $a) {
        if (str_contains($a['file_name'], '.')) {
          $parts = explode('.', $a['file_name']);
          $extension = end($parts);
        }
      
        if($extension == 'pdf'){
          $activities[$key]['file_path'] = './assets/media/svg/files/pdf.svg';
        } else {
          $activities[$key]['file_path'] = './assets/media/svg/files/photo.svg';
        }
      
      }

    $profile_activity_week[$paw]['activities'] = $activities;
  }
  
}

$profile_activity_month = $con->getData("SELECT *, DATE_FORMAT(created_at, '%b %d, %Y %h:%i %p') AS formatted_created_at FROM history WHERE user_id = $session_id AND created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) ORDER BY id DESC");
foreach($profile_activity_month as $pam => $pat) {
  
  if($pat['action_name'] == 'ADDED') {
    if($pat['module_name'] == 'LAND') {
      $activities = $con->getData("SELECT id, land_code AS ppe_code FROM land_and_land_improvements WHERE id = ".$pat['module_id']);
      $profile_activity_month[$pam]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'LAND IMPROVEMENT') {
      $activities = $con->getData("SELECT id, land_code AS ppe_code FROM land_and_land_improvements WHERE id = ".$pat['module_id']);
      $profile_activity_month[$pam]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'INFRASTRUCTURE ASSET') {
      $activities = $con->getData("SELECT id, infrastructure_id_number AS ppe_code FROM infrastructure_assets WHERE id = ".$pat['module_id']);
      $profile_activity_month[$pam]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'BUILDING AND OTHER STRUCTURE') {
      $activities = $con->getData("SELECT id, building_and_structure_id AS ppe_code FROM building_and_structures WHERE id = ".$pat['module_id']);
      $profile_activity_month[$pam]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'MACHINERY AND EQUIPMENT') {
      $activities = $con->getData("SELECT id, property_number AS ppe_code FROM machinery_equipment WHERE id = ".$pat['module_id']);
      $profile_activity_month[$pam]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'SERIAL NUMBER') {
      $activities = $con->getData("SELECT id, serial_number AS ppe_code FROM parts_serial_number WHERE machinery_equipment_id = ".$pat['module_id']);
      $profile_activity_month[$pam]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'FURNITURE AND FIXTURE') {
      $activities = $con->getData("SELECT id, property_number AS ppe_code FROM furniture_and_fixtures WHERE id = ".$pat['module_id']);
      $profile_activity_month[$pam]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'MACHINERY AND EQUIPMENT ICS') {
      $activities = $con->getData("SELECT id, property_number AS ppe_code FROM machinery_equipment WHERE id = ".$pat['module_id']);
      $profile_activity_month[$pam]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'MACHINERY AND EQUIPMENT PHYSICAL INVENTORY') {
      $activities = $con->getData("SELECT id, property_number AS ppe_code FROM machinery_equipment WHERE id = ".$pat['module_id']);
      $profile_activity_month[$pam]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'FURNITURE AND FIXTURES PHYSICAL INVENTORY') {
      $activities = $con->getData("SELECT id, property_number AS ppe_code FROM furniture_and_fixtures WHERE id = ".$pat['module_id']);
      $profile_activity_month[$pam]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'LAND AND LAND IMPROVEMENT PHYSICAL INVENTORY') {
      $activities = $con->getData("SELECT id, land_code AS ppe_code FROM land_and_land_improvements WHERE id = ".$pat['module_id']);
      $profile_activity_month[$pam]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'INFRASTRUCTURE ASSET PHYSICAL INVENTORY') {
      $activities = $con->getData("SELECT id, infrastructure_id_number AS ppe_code FROM infrastructure_assets WHERE id = ".$pat['module_id']);
      $profile_activity_month[$pam]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'BUILDING AND OTHER STRUCTURE PHYSICAL INVENTORY') {
      $activities = $con->getData("SELECT id, building_and_structure_id AS ppe_code FROM building_and_structures WHERE id = ".$pat['module_id']);
      $profile_activity_month[$pam]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'WASTE MATERIAL') {
      $activities = $con->getData("SELECT id, receipt_number AS ppe_code FROM waste_materials WHERE id = ".$pat['module_id']);
      $profile_activity_month[$pam]['activities'] = isset($activities[0]) ? $activities[0] : null;
    }
  } else if($pat['action_name'] == 'UPDATED') {
    if($pat['module_name'] == 'LAND') {
      $activities = $con->getData("SELECT id, land_code AS ppe_code FROM land_and_land_improvements WHERE id = ".$pat['module_id']);
      $profile_activity_month[$pam]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'LAND IMPROVEMENT') {
      $activities = $con->getData("SELECT id, land_code AS ppe_code FROM land_and_land_improvements WHERE id = ".$pat['module_id']);
      $profile_activity_month[$pam]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'INFRASTRUCTURE ASSET') {
      $activities = $con->getData("SELECT id, infrastructure_id_number AS ppe_code FROM infrastructure_assets WHERE id = ".$pat['module_id']);
      $profile_activity_month[$pam]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'BUILDING AND OTHER STRUCTURE') {
      $activities = $con->getData("SELECT id, building_and_structure_id AS ppe_code FROM building_and_structures WHERE id = ".$pat['module_id']);
      $profile_activity_month[$pam]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'MACHINERY AND EQUIPMENT') {
      $activities = $con->getData("SELECT id, property_number AS ppe_code FROM machinery_equipment WHERE id = ".$pat['module_id']);
      $profile_activity_month[$pam]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'SERIAL NUMBER') {
      $activities = $con->getData("SELECT id, serial_number AS ppe_code FROM parts_serial_number WHERE machinery_equipment_id = ".$pat['module_id']);
      $profile_activity_month[$pam]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'FURNITURE AND FIXTURE') {
      $activities = $con->getData("SELECT id, property_number AS ppe_code FROM furniture_and_fixtures WHERE id = ".$pat['module_id']);
      $profile_activity_month[$pam]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'MACHINERY AND EQUIPMENT ICS') {
      $activities = $con->getData("SELECT id, property_number AS ppe_code FROM machinery_equipment WHERE id = ".$pat['module_id']);
      $profile_activity_month[$pam]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'WASTE MATERIAL') {
      $activities = $con->getData("SELECT id, receipt_number AS ppe_code FROM waste_materials WHERE id = ".$pat['module_id']);
      $profile_activity_month[$pam]['activities'] = isset($activities[0]) ? $activities[0] : null;
    }
  } else if($pat['action_name'] == 'REPAIRED') {
    if($pat['module_name'] == 'MACHINERY EQUIPMENT') {
      $activities = $con->getData("SELECT id, property_number AS ppe_code FROM machinery_equipment WHERE id = ".$pat['module_id']);
      $profile_activity_month[$pam]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'FURNITURE AND FIXTURE') {
      $activities = $con->getData("SELECT id, property_number AS ppe_code FROM furniture_and_fixtures WHERE id = ".$pat['module_id']);
      $profile_activity_month[$pam]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'MACHINERY AND EQUIPMENT') {
      $activities = $con->getData("SELECT id, property_number AS ppe_code FROM machinery_equipment WHERE id = ".$pat['module_id']);
      $profile_activity_month[$pam]['activities'] = isset($activities[0]) ? $activities[0] : null;
    } else if($pat['module_name'] == 'FURNITURE AND FIXTURES') {
      $activities = $con->getData("SELECT id, property_number AS ppe_code FROM furniture_and_fixtures WHERE id = ".$pat['module_id']);
      $profile_activity_month[$pam]['activities'] = isset($activities[0]) ? $activities[0] : null;
    }
  }

  if($pat['module_name'] == 'PAR' || $pat['module_name'] == 'TRANSFER' || $pat['module_name'] == 'RETURN' || $pat['module_name'] == 'ICS PAR') {

    $par_machinery_equipment = $con->getData("SELECT * FROM par_machinery_equipment WHERE par_id = ".$pat['module_id']);

    foreach($par_machinery_equipment as $i => $a) {
    
      if($a['equipment_description'] == 'Machinery Equipment') {
        $machinery_equipment = $con->getData("SELECT * FROM machinery_equipment WHERE id = ".$a['equipment_id']);

        foreach($machinery_equipment as $m => $me) {
          $article = $con->getData("SELECT * FROM articles WHERE id = ".$me['article_id']);
          $machinery_equipment[$m]['machinery_equipment_data'] = $article[0];
        }

        $par_machinery_equipment[$i]['machinery_equipment'] = $machinery_equipment[0];
      } else {
        $machinery_equipment = $con->getData("SELECT * FROM furniture_and_fixtures WHERE id = ".$a['equipment_id']);

        foreach($machinery_equipment as $m => $me) {
          $article = $con->getData("SELECT * FROM articles WHERE id = ".$me['article_id']);
          $machinery_equipment[$m]['machinery_equipment_data'] = $article[0];
        }

        $par_machinery_equipment[$i]['machinery_equipment'] = $machinery_equipment[0];
      }

    }

    $profile_activity_month[$pam]['activities'] = $par_machinery_equipment;

  }

  if($pat['action_name'] == 'UPLOADED') {

    $activities = $con->getData("SELECT * FROM upload_files WHERE history_id = ".$pat['id']);
    
      foreach($activities as $key => $a) {
        if (str_contains($a['file_name'], '.')) {
          $parts = explode('.', $a['file_name']);
          $extension = end($parts);
        }
      
        if($extension == 'pdf'){
          $activities[$key]['file_path'] = './assets/media/svg/files/pdf.svg';
        } else {
          $activities[$key]['file_path'] = './assets/media/svg/files/photo.svg';
        }
      
      }

    $profile_activity_month[$pam]['activities'] = array_slice($activities, 0, 30);
  }
  
}

function formatCreatedAt(&$resultArray) {
  foreach ($resultArray as &$row) {
      $row['formatted_created_at'] = date('M d, Y h:i A', strtotime($row['created_at']));
  }
}

formatCreatedAt($profile_activity_today);

$profile_activity = array(
  "word_date" => $word_date,
  "profile_activity_today" => $profile_activity_today,
  "profile_activity_week" => $profile_activity_week,
  "profile_activity_month" => $profile_activity_month
);

echo json_encode($profile_activity);

?>