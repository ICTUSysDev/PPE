<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';
date_default_timezone_set('Asia/Manila');
$con = new pdo_db();


$List_of_PARs = array();
$counter=0;
$total_acquisition_cost=0;

$employee = $con -> getData("SELECT users.id, CONCAT(users.last_name, ', ', users.first_name) AS employee_name, users.employee_id, offices.name as office_name, offices.shortname as office_shortname, positions.position_description FROM users INNER JOIN offices ON users.office_id = offices.id INNER JOIN positions ON users.position_id = positions.id WHERE users.id = ". $_POST['employee_id'] );
$employee[0]['date_today']=date('F d, Y');
// ///////////////////////////////


$list_of_machinery = $con -> getData("SELECT machinery_equipment_pars.id, articles.name as article_name, machinery_equipment.description, DATE_FORMAT(machinery_equipment.acquisition_date,'%M %d, %Y') AS acquisition_date, machinery_equipment.property_number, CONCAT('P ', FORMAT(machinery_equipment.acquisition_cost,2)) AS acquisition_cost, machinery_equipment.acquisition_cost as total_acquisition_cost,machinery_equipment_pars.par_no, par_machinery_equipment.equipment_id   FROM machinery_equipment_pars INNER JOIN par_machinery_equipment ON machinery_equipment_pars.id = par_machinery_equipment.par_id INNER JOIN machinery_equipment ON par_machinery_equipment.equipment_id = machinery_equipment.id INNER JOIN articles ON machinery_equipment.article_id = articles.id WHERE par_machinery_equipment.`status` IN ('REPAR','RETURNED','RELOCATE','PAR') AND par_machinery_equipment.accountable_officer = ". $_POST['employee_id'] ."	ORDER BY articles.name");


foreach ($list_of_machinery as $key => $machinery_list)
{
    // print_r(checkEquipmentStatus($machinery_list['equipment_id']));

    if (checkEquipmentStatus($machinery_list['equipment_id']) <> 'NULL')
    {
    $total_acquisition_cost = $total_acquisition_cost+$machinery_list['total_acquisition_cost'];
    $employee[0]['list_of_machineries'][$key]['article'] = $machinery_list['article_name'];

    $employee[0]['list_of_machineries'][$key]['description'] = $machinery_list['description'];
    $employee[0]['list_of_machineries'][$key]['acquisition_date'] = $machinery_list['acquisition_date'];
    $employee[0]['list_of_machineries'][$key]['property_number'] = $machinery_list['property_number'];
    $employee[0]['list_of_machineries'][$key]['acquisition_cost'] = $machinery_list['acquisition_cost'];
    $employee[0]['list_of_machineries'][$key]['par_no'] = $machinery_list['par_no'];
    }


}

$employee[0]['total_acquisition_cost'] = $total_acquisition_cost;

session_start();
// date_default_timezone_set("Asia/Manila");
$employee[0]['userFullName']=$_SESSION['userFullName'];
$employee[0]['reportDate']=date("m-d-Y h:ia");



header("Content-Type: application/json");
echo json_encode($employee[0]);

function checkEquipmentStatus($equipmentID)
{
    // require_once '../../db.php';
    $con = new pdo_db();
    $equipmentStatus = $con -> getData("SELECT * FROM par_machinery_equipment WHERE equipment_id = " .$equipmentID ." AND status IN ('DISPOSAL', 'TRANSFERRED','RETURNED','DONATION')  ORDER BY id DESC LIMIT 1");
    return $equipmentStatus;
}

?>