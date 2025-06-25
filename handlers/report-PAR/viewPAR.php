<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();
$cancelled_par_no_index = 0;


$par = $con->getData("SELECT machinery_equipment_pars.id, machinery_equipment_pars.par_no,machinery_equipment_pars.par_date, offices.name, CONCAT(users.first_name,' ', users.last_name) AS accountable_officer, positions.position_description   FROM machinery_equipment_pars  INNER JOIN offices ON machinery_equipment_pars.office_id = offices.id
INNER JOIN users ON machinery_equipment_pars.accountable_officer = users.id INNER JOIN positions ON users.position_id = positions.id WHERE machinery_equipment_pars.id = " .$_POST['id']);

$par[0]['PropCustodian'] = $con->getData("SELECT signatories.id, signatories.`code`, CONCAT(signatories.first_name,' ', signatories.last_name) AS signatoryName, signatories.office, signatories.`position` FROM signatories WHERE code = 'Property Custodian' ");

$array_index=0;

    $equipment = $con->getData("SELECT par_machinery_equipment.id, machinery_equipment.`description` as equipmentDescription, machinery_equipment.property_number, DATE_FORMAT(machinery_equipment.acquisition_date,'%M %d, %Y') AS acquisition_date, CONCAT('P ', FORMAT(machinery_equipment.acquisition_cost,2)) AS acquisition_cost, par_machinery_equipment.equipment_id  FROM par_machinery_equipment INNER JOIN machinery_equipment ON par_machinery_equipment.equipment_id = machinery_equipment.id  WHERE par_machinery_equipment.par_id = ". $_POST['id'] ." AND par_machinery_equipment.equipment_description like 'Machinery Equipment'");
    foreach ($equipment as $key => $equipmentList)
    {
        $par[0]['equipment'][$key]['description']=$equipmentList['equipmentDescription'];
        $par[0]['equipment'][$key]['property_number']=$equipmentList['property_number'];
        $par[0]['equipment'][$key]['acquisition_date']=$equipmentList['acquisition_date'];
        $par[0]['equipment'][$key]['acquisition_cost']=$equipmentList['acquisition_cost'];
        $array_index = $key +1;

        $check_if_there_is_new_par = $con->getData("SELECT par_machinery_equipment.id, machinery_equipment_pars.par_no, par_machinery_equipment.equipment_id FROM par_machinery_equipment 
        INNER JOIN machinery_equipment_pars ON par_machinery_equipment.par_id = machinery_equipment_pars.id WHERE par_machinery_equipment.equipment_id = ". $equipmentList['equipment_id'] ." AND par_machinery_equipment.id > ". $equipmentList['id'] ." ORDER BY par_machinery_equipment.id ASC LIMIT 1 ");

    

         if (!empty($check_if_there_is_new_par))
         {
            $par[0]['cancelled'][$cancelled_par_no_index]['prop_no']=$equipmentList['property_number'];
            $par[0]['cancelled'][$cancelled_par_no_index]['PAR_No']=$check_if_there_is_new_par[0]['par_no'];
            $cancelled_par_no_index++;
         }
    
    }
    
    $furniture_and_fixture = $con->getData("SELECT par_machinery_equipment.id, furniture_and_fixtures.description as equipmentDescription, furniture_and_fixtures.property_number, DATE_FORMAT(furniture_and_fixtures.acquisition_date,'%M %d, %Y') AS acquisition_date, CONCAT('P ', FORMAT(furniture_and_fixtures.carrying_amount,2)) AS carrying_amount, par_machinery_equipment.equipment_id  FROM par_machinery_equipment INNER JOIN furniture_and_fixtures ON par_machinery_equipment.equipment_id = furniture_and_fixtures.id WHERE par_machinery_equipment.par_id = ". $_POST['id'] ." AND par_machinery_equipment.equipment_description like 'Furniture and Fixture' ");

    foreach ($furniture_and_fixture as $key1 => $furniture_and_fixtureList)
    {
        $par[0]['equipment'][$array_index]['description']=$furniture_and_fixtureList['equipmentDescription'];
        $par[0]['equipment'][$array_index]['property_number']=$furniture_and_fixtureList['property_number'];
        $par[0]['equipment'][$array_index]['acquisition_date']=$furniture_and_fixtureList['acquisition_date'];
        $par[0]['equipment'][$array_index]['acquisition_cost']=$furniture_and_fixtureList['carrying_amount'];
        $array_index++;

        $check_if_there_is_new_par = $con->getData("SELECT par_machinery_equipment.id, machinery_equipment_pars.par_no, par_machinery_equipment.equipment_id FROM par_machinery_equipment 
        INNER JOIN machinery_equipment_pars ON par_machinery_equipment.par_id = machinery_equipment_pars.id WHERE par_machinery_equipment.equipment_id = ". $furniture_and_fixtureList['equipment_id'] ." AND par_machinery_equipment.id > ". $furniture_and_fixtureList['id'] ." ORDER BY par_machinery_equipment.id ASC LIMIT 1 ");

        if (!empty($check_if_there_is_new_par))
        {
            $par[0]['cancelled'][$cancelled_par_no_index]['prop_no']=$furniture_and_fixtureList['property_number'];
            $par[0]['cancelled'][$cancelled_par_no_index]['PAR_No']=$check_if_there_is_new_par[0]['par_no'];
            $cancelled_par_no_index++;
        }

    }

    /// 
    ///this will check if equipment has different or newar PAR than this PAR
    ///

    




header("Content-Type: application/json");
echo json_encode($par);

?>