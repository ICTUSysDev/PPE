<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();
session_start();

$start_date = $_POST['start'];
$end_date = $_POST['end'];

$user = $con->getData("SELECT id, groups FROM users WHERE id = ".$_SESSION['id']);
 
if($user[0]['groups'] != 3) {
    $ICS = $con->getData("SELECT * FROM `machinery_equipment_pars` WHERE form_type = 'ICS' AND par_date BETWEEN '$start_date' AND '$end_date'");

    foreach($ICS as $key => $listofICS) {

        $accountable_officer = $con->getData("SELECT id, CONCAT(last_name,', ',first_name,' ',middle_name) name, office_id FROM users WHERE id = ".$listofICS['accountable_officer']);
        $ICS[$key]['accountable_officer'] = $accountable_officer[0];
    
        $office = $con->getData("SELECT id, shortname FROM offices WHERE id = ".$accountable_officer[0]['office_id']);
        $ICS[$key]['accountable_officer']['office_id'] = $office[0];
    
        $ICS[$key]['list_no'] = $key+1;
        
        $ICS[$key]['list_no']=$key+1;
    }
     
} else {
    $ICS = $con->getData("SELECT * FROM `machinery_equipment_pars` WHERE form_type = 'ICS' AND accountable_officer = ".$user[0]['id']);
    // print_r($user);
    foreach($ICS as $key => $listofICS) {

        $accountable_officer = $con->getData("SELECT id, CONCAT(last_name,', ',first_name,' ',middle_name) name, office_id FROM users WHERE id = ".$listofICS['accountable_officer']);
        $ICS[$key]['accountable_officer'] = $accountable_officer[0];
    
        $office = $con->getData("SELECT id, shortname FROM offices WHERE id = ".$accountable_officer[0]['office_id']);
        $ICS[$key]['accountable_officer']['office_id'] = $office[0];
    
        $ICS[$key]['list_no'] = $key+1;

        $ICS[$key]['list_no']=$key+1;
          
    }
  

}



header("Content-Type: application/json");
echo json_encode($ICS);


?>