<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$machinery_equipments = $con->getData("SELECT machinery_equipment.description, machinery_equipment.property_number, date_format(machinery_equipment.acquisition_date,'%b %d, %Y') AS acquisition_date, format(machinery_equipment.acquisition_cost,2) AS acquisition_cost, articles.name AS article_name  FROM machinery_equipment INNER JOIN articles ON machinery_equipment.article_id = articles.id WHERE machinery_equipment.id = ". $_POST['ppe_id']);

$signatories = $con -> getData("SELECT signatories.code, upper(CONCAT(signatories.first_name,' ', signatories.last_name)) AS signatory_name FROM signatories WHERE signatories.code IN('Property Custodian','COA Representative','PGSO')");

foreach($signatories as $key => $sigList)
{
    switch ($sigList['code']) {
        case 'Property Custodian':
            $machinery_equipments[0]['prop_custodian']['title']=$sigList['code'];
            $machinery_equipments[0]['prop_custodian']['signatory_name']=$sigList['signatory_name'];
            break;
        case 'COA Representative':
            $machinery_equipments[0]['coa_rep']['title']=$sigList['code'];
            $machinery_equipments[0]['coa_rep']['signatory_name']=$sigList['signatory_name'];
            break;
        case 'PGSO':
            $machinery_equipments[0]['pgso_officer']['title']=$sigList['code'];
            $machinery_equipments[0]['pgso_officer']['signatory_name']=$sigList['signatory_name'];
            break;


    }

}

$serialNo = $con -> getData ("SELECT parts_serial_number.id, parts_serial_number.part, upper(parts_serial_number.serial_number) AS serial_number FROM parts_serial_number WHERE parts_serial_number.machinery_equipment_id = ". $_POST['ppe_id']);

$machinery_equipments[0]['serialNo'] = $serialNo ;



// foreach($machinery_equipments as $key => $machinery_equipment) {

//   $charts_of_account = $con->getData("SELECT id, code, account_title FROM charts_of_account WHERE id = ".$machinery_equipment['coa_description_id']);
//   $machinery_equipments[$key]['charts_of_account'] = $charts_of_account[0];

//   $article = $con->getData("SELECT id, name FROM articles WHERE id = ".$machinery_equipment['article_id']);
//   $machinery_equipments[$key]['article'] = $article[0];

//   if(!empty($machinery_equipment[$key]['brand_id'])) {
//     $brand = $con->getData("SELECT id, name FROM brands WHERE id = ".$machinery_equipment['brand_id']);
//     $machinery_equipments[$key]['brand'] = $brand[0];
//   } else {
//     $machinery_equipments[$key]['brand'] = 'N/A';
//   }

//   $machinery_equipments[$key]['list_no'] = $key+1;

// }

header("Content-Type: application/json");
echo json_encode($machinery_equipments[0]);

?>