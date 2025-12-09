<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';
date_default_timezone_set('Asia/Manila');
$con = new pdo_db();


$List_of_PARs = array();
$counter=0;
$total_acquisition_cost=0;

$head_of_office = $con -> getData("SELECT users.employee_id, CONCAT(users.first_name, ' ' , users.last_name) AS head_of_office, offices.name as office_name, positions.position_description FROM users INNER JOIN offices ON users.id = offices.head_of_office INNER JOIN positions ON users.position_id = positions.id WHERE offices.id = " .$_POST['office_id']);

$List_of_PARs['accountable_details']['head_of_office']=$head_of_office[0]['head_of_office'];
$List_of_PARs['accountable_details']['head_position']=$head_of_office[0]['position_description'];
$List_of_PARs['accountable_details']['head_office']=$head_of_office[0]['office_name'];
$List_of_PARs['accountable_details']['date_today']=date('F d, Y');




$list_of_machinery = $con -> getData("SELECT machinery_equipment.id AS machinery_equipment_id, articles.name AS article_name, machinery_equipment.description, DATE_FORMAT(machinery_equipment.acquisition_date,'%M %d, %Y') AS acquisition_date, machinery_equipment.property_number, CONCAT('P ', FORMAT(machinery_equipment.acquisition_cost,2)) AS acquisition_cost, machinery_equipment.acquisition_cost as total_acquisition_cost   FROM machinery_equipment INNER JOIN articles ON machinery_equipment.article_id = articles.id WHERE machinery_equipment.id IN (SELECT par_machinery_equipment.equipment_id FROM par_machinery_equipment INNER JOIN machinery_equipment_pars ON par_machinery_equipment.par_id = machinery_equipment_pars.id WHERE machinery_equipment_pars.office_id = ". $_POST['office_id']." AND form_type <> 'ICS' AND equipment_description = 'Machinery Equipment') ORDER BY machinery_equipment.id asc");


foreach ($list_of_machinery as $key => $machinery_list)
{
    $list_of_PAR = $con -> getData("SELECT machinery_equipment_pars.id, machinery_equipment_pars.par_no, machinery_equipment_pars.par_date, CONCAT(users.first_name, ' ', users.last_name) AS accountable_officer, par_machinery_equipment.equipment_id, par_machinery_equipment.id as par_machinery_equipment_id  FROM par_machinery_equipment INNER JOIN machinery_equipment_pars ON par_machinery_equipment.par_id = machinery_equipment_pars.id inner join users on machinery_equipment_pars.accountable_officer = users.id WHERE par_machinery_equipment.equipment_id = ".$machinery_list['machinery_equipment_id'] ." AND par_machinery_equipment.equipment_description like 'Machinery Equipment' AND machinery_equipment_pars.office_id = ". $_POST['office_id']);
   
    foreach($list_of_PAR as $key2 => $par_list)
    {

        $check_if_there_is_new_par = $con -> getData("SELECT par_machinery_equipment.id, machinery_equipment_pars.par_no, par_machinery_equipment.equipment_id FROM par_machinery_equipment INNER JOIN machinery_equipment_pars ON par_machinery_equipment.par_id = machinery_equipment_pars.id WHERE par_machinery_equipment.equipment_id = ". $par_list['equipment_id'] ." AND par_machinery_equipment.id > ". $par_list['par_machinery_equipment_id'] ." AND par_machinery_equipment.equipment_description = 'Machinery Equipment' ORDER BY par_machinery_equipment.id ASC LIMIT 1 ");
        // print_r($par_list );
        if (empty($check_if_there_is_new_par))
        {
            $List_of_PARs['equipment_details'][$counter]['article_name']=$machinery_list['article_name'];
            $List_of_PARs['equipment_details'][$counter]['description']=$machinery_list['description'];
            $List_of_PARs['equipment_details'][$counter]['acquisition_date']=$machinery_list['acquisition_date'];
            $List_of_PARs['equipment_details'][$counter]['PARno']=$par_list['par_no'];
            $List_of_PARs['equipment_details'][$counter]['property_number']=$machinery_list['property_number'];
            $List_of_PARs['equipment_details'][$counter]['acquisition_cost']=$machinery_list['acquisition_cost'];
            $List_of_PARs['equipment_details'][$counter]['accountable_officer']=$par_list['accountable_officer'];

            $total_acquisition_cost = $total_acquisition_cost + $machinery_list['total_acquisition_cost'];
            $List_of_PARs['accountable_details']['total_acquisition_cost']=$total_acquisition_cost;
            


           $counter++;
         
        }

    }
}


$list_of_furniture_fixture = $con -> getData("SELECT furniture_and_fixtures.id AS furniture_and_fixtures_id, articles.name AS article_name, furniture_and_fixtures.description, furniture_and_fixtures.property_number, CONCAT('P ', FORMAT(furniture_and_fixtures.carrying_amount,2)) AS acquisition_cost, furniture_and_fixtures.carrying_amount as total_acquisition_cost   FROM furniture_and_fixtures INNER JOIN articles ON furniture_and_fixtures.article_id = articles.id WHERE furniture_and_fixtures.id IN (SELECT par_machinery_equipment.equipment_id FROM par_machinery_equipment INNER JOIN machinery_equipment_pars ON par_machinery_equipment.par_id = machinery_equipment_pars.id WHERE machinery_equipment_pars.office_id = ". $_POST['office_id']." AND form_type <> 'ICS' AND equipment_description = 'Furniture and Fixture') ORDER BY furniture_and_fixtures.id asc");

foreach ($list_of_furniture_fixture as $key3 => $furniture_list)
{
    $list_of_PAR_furnitures = $con -> getData("SELECT machinery_equipment_pars.id, machinery_equipment_pars.par_no, machinery_equipment_pars.par_date, CONCAT(users.first_name, ' ', users.last_name) AS accountable_officer, par_machinery_equipment.equipment_id, par_machinery_equipment.id as par_machinery_equipment_id  FROM par_machinery_equipment INNER JOIN machinery_equipment_pars ON par_machinery_equipment.par_id = machinery_equipment_pars.id inner join users on machinery_equipment_pars.accountable_officer = users.id WHERE par_machinery_equipment.equipment_id = ".$furniture_list['furniture_and_fixtures_id'] ." AND par_machinery_equipment.equipment_description like 'Furniture and Fixture' AND machinery_equipment_pars.office_id = ". $_POST['office_id']);

    foreach($list_of_PAR_furnitures as $key4 => $par_furniture_list)
    {

        $check_if_there_is_new_par_furniture = $con -> getData("SELECT par_machinery_equipment.id, machinery_equipment_pars.par_no, par_machinery_equipment.equipment_id FROM par_machinery_equipment INNER JOIN machinery_equipment_pars ON par_machinery_equipment.par_id = machinery_equipment_pars.id WHERE par_machinery_equipment.equipment_id = ". $par_furniture_list['equipment_id'] ." AND par_machinery_equipment.id > ". $par_furniture_list['par_machinery_equipment_id'] ." AND par_machinery_equipment.equipment_description = 'Furniture and Fixture' ORDER BY par_machinery_equipment.id ASC LIMIT 1 ");
        if (empty($check_if_there_is_new_par_furniture))
        {
            $List_of_PARs['equipment_details'][$counter]['article_name']=$furniture_list['article_name'];
            $List_of_PARs['equipment_details'][$counter]['description']=$furniture_list['description'];
            $List_of_PARs['equipment_details'][$counter]['acquisition_date']="";
            $List_of_PARs['equipment_details'][$counter]['PARno']=$par_furniture_list['par_no'];
            $List_of_PARs['equipment_details'][$counter]['property_number']=$furniture_list['property_number'];
            $List_of_PARs['equipment_details'][$counter]['acquisition_cost']=$furniture_list['acquisition_cost'];
            $List_of_PARs['equipment_details'][$counter]['accountable_officer']=$par_furniture_list['accountable_officer'];

            $total_acquisition_cost = $total_acquisition_cost + $furniture_list['total_acquisition_cost'];
            $List_of_PARs['accountable_details']['total_acquisition_cost']=$total_acquisition_cost;

           $counter++;
         
        }

    }
}



session_start();
date_default_timezone_set("Asia/Manila");
$List_of_PARs[0]['userFullName']=$_SESSION['userFullName'];
$List_of_PARs[0]['reportDate']=date("m-d-Y h:ia");

header("Content-Type: application/json");
echo json_encode($List_of_PARs);

?>