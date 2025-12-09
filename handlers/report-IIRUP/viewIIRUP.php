<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

// print_r($_POST['year']);

$start = $_POST['start'];
$end = $_POST['end'];

// var_dump($startDate); exit();

// $parts = explode("-",$_POST['year']);
// $monthYear=mktime(0,0,0,$parts[1],0,$parts[0]);
// for ($i = 0; $i < count($parts); $i++)
// {
//     if(strlen($parts[$i]) == 4)
//     {
//         $year = $parts[$i];
//         break;
//     }
// }
//   echo ("<break></break>" . date("F Y",$monthYear));

$disposedList = $con->getData("SELECT 
DATE_FORMAT(machinery_equipment.acquisition_date, '%M %d, %Y') AS acquisition_date,
articles.name,
machinery_equipment.property_number,
FORMAT(machinery_equipment.acquisition_cost, 2) AS acquisition_cost,
machinery_equipment.remarks,
YEAR(machinery_equipment_pars.par_date) AS acquisitionYear
FROM 
machinery_equipment_pars
INNER JOIN 
par_machinery_equipment ON machinery_equipment_pars.id = par_machinery_equipment.par_id
INNER JOIN 
machinery_equipment ON par_machinery_equipment.equipment_id = machinery_equipment.id
INNER JOIN 
articles ON machinery_equipment.article_id = articles.id
WHERE 
par_machinery_equipment.`status` = 'DISPOSAL'
AND machinery_equipment_pars.par_date BETWEEN '$start' AND '$end'
");

$IIRUP = null;

if (!$disposedList)
{
    header("Content-Type: application/json");
    echo json_encode($IIRUP);
    die();
}

foreach ($disposedList as $key => $list)
{
    $IIRUP['equipmentList'][$key]['list_no'] = $key+1;
    $IIRUP['equipmentList'][$key]['acquisition_cost'] = $list['acquisition_cost'];
    $IIRUP['equipmentList'][$key]['acquisition_date'] = $list['acquisition_date'];
    $IIRUP['equipmentList'][$key]['Article'] = $list['name'];
    $IIRUP['equipmentList'][$key]['property_number'] = $list['property_number'];
    $IIRUP['equipmentList'][$key]['remarks'] = $list['remarks'];

}

$IIRUP['date_range'][0]['start_date'] = (new DateTime($start))->format('Y-m-d');
$IIRUP['date_range'][0]['end_date'] = (new DateTime($end))->format('Y-m-d');

// $IIRUP['year'] = $_POST['year'];

// $IIRUP['year'] = date("F Y",$monthYear);

$accountableOfficer = $con -> getData("SELECT CONCAT(first_name, ' ', LEFT(middle_name,1), ' ', last_name) as accountable_officer, office, position, date_of_assumption  FROM signatories WHERE CODE LIKE 'PGSO'");
foreach ($accountableOfficer as $key => $list)
{
    $IIRUP['AccountableOfficer'][$key]['accountable_officer']=$list['accountable_officer'];
    $IIRUP['AccountableOfficer'][$key]['office']=$list['office'];
    $IIRUP['AccountableOfficer'][$key]['position']=$list['position'];
    $IIRUP['AccountableOfficer'][$key]['date_of_assumption']=$list['date_of_assumption'];
}

// $par = $con->getData("SELECT machinery_equipment_pars.id, machinery_equipment_pars.par_no,machinery_equipment_pars.par_date, offices.name, CONCAT(users.first_name,' ', users.last_name) AS accountable_officer, positions.position_description   FROM machinery_equipment_pars  INNER JOIN offices ON machinery_equipment_pars.office_id = offices.id
// INNER JOIN users ON machinery_equipment_pars.accountable_officer = users.id INNER JOIN positions ON users.position_id = positions.id WHERE machinery_equipment_pars.id = " .$_POST['id']);


//     $equipment = $con->getData("SELECT par_machinery_equipment.id, machinery_equipment.`description` as equipmentDescription, machinery_equipment.property_number, DATE_FORMAT(machinery_equipment.acquisition_date,'%M %d, %Y') AS acquisition_date, CONCAT('P ', FORMAT(machinery_equipment.acquisition_cost,2)) AS acquisition_cost, par_machinery_equipment.equipment_id  FROM par_machinery_equipment INNER JOIN machinery_equipment ON par_machinery_equipment.equipment_id = machinery_equipment.id  WHERE par_machinery_equipment.par_id = ". $_POST['id'] ." AND par_machinery_equipment.equipment_description like 'Machinery Equipment'");
//     foreach ($equipment as $key => $equipmentList)
//     {
//         $par[0]['equipment'][$key]['description']=$equipmentList['equipmentDescription'];
//         $par[0]['equipment'][$key]['property_number']=$equipmentList['property_number'];
//         $par[0]['equipment'][$key]['acquisition_date']=$equipmentList['acquisition_date'];
//         $par[0]['equipment'][$key]['acquisition_cost']=$equipmentList['acquisition_cost'];
//         $array_index = $key +1;

//         $check_if_there_is_new_par = $con->getData("SELECT par_machinery_equipment.id, machinery_equipment_pars.par_no, par_machinery_equipment.equipment_id FROM par_machinery_equipment 
//         INNER JOIN machinery_equipment_pars ON par_machinery_equipment.par_id = machinery_equipment_pars.id WHERE par_machinery_equipment.equipment_id = ". $equipmentList['equipment_id'] ." AND par_machinery_equipment.id > ". $equipmentList['id'] ." ORDER BY par_machinery_equipment.id ASC LIMIT 1 ");

    

//          if (!empty($check_if_there_is_new_par))
//          {
//             $par[0]['cancelled'][$cancelled_par_no_index]['prop_no']=$equipmentList['property_number'];
//             $par[0]['cancelled'][$cancelled_par_no_index]['PAR_No']=$check_if_there_is_new_par[0]['par_no'];
//             $cancelled_par_no_index++;
//          }
    
//     }
    
  

session_start();
date_default_timezone_set("Asia/Manila");
$IIRUP[0]['userFullName']=$_SESSION['userFullName'];
$IIRUP[0]['reportDate']=date("m-d-Y h:ia");


header("Content-Type: application/json");
echo json_encode($IIRUP);

?>