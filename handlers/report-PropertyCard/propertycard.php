<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();
$equipment = $con->getData("SELECT machinery_equipment.id, machinery_equipment.article_id, machinery_equipment.fund_id, machinery_equipment.description AS property_description, machinery_equipment.acquisition_cost, articles.name AS article_name, funds.name AS fund_name FROM machinery_equipment INNER JOIN articles ON machinery_equipment.article_id = articles.id INNER JOIN funds ON machinery_equipment.fund_id = funds.id WHERE machinery_equipment.id = $_POST[id]");

$pars_equipment = $con->getData("SELECT machinery_equipment_pars.id, machinery_equipment_pars.par_date, machinery_equipment_pars.par_no, machinery_equipment_pars.note, CONCAT(users.first_name,' ',users.last_name, ' (', offices.shortname,')') AS accountable_officer, offices.shortname   FROM machinery_equipment_pars INNER JOIN users ON machinery_equipment_pars.accountable_officer = users.id INNER JOIN par_machinery_equipment ON machinery_equipment_pars.id = par_machinery_equipment.par_id INNER JOIN offices ON users.office_id = offices.id WHERE  par_machinery_equipment.equipment_id=". $_POST['id']." ORDER BY machinery_equipment_pars.par_date ASC" );
if ($pars_equipment!=null){
    foreach($pars_equipment as $key => $par_equip) {
        //PAR_EQUIPMENT
        $equipment[0]['pars'][$key]=$par_equip;
    }
}

header("Content-Type: application/json");
echo json_encode($equipment);

?>