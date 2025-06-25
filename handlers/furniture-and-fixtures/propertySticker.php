<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$furniture_and_fixtures = $con->getData("SELECT furniture_and_fixtures.description, furniture_and_fixtures.property_number, date_format(furniture_and_fixtures.acquisition_date,'%b %d, %Y') AS acquisition_date, format(furniture_and_fixtures.carrying_amount,2) AS acquisition_cost, articles.name AS article_name  FROM furniture_and_fixtures INNER JOIN articles ON furniture_and_fixtures.article_id = articles.id WHERE furniture_and_fixtures.id = ". $_POST['ppe_id']);

$signatories = $con -> getData("SELECT signatories.code, upper(CONCAT(signatories.first_name,' ', signatories.last_name)) AS signatory_name FROM signatories WHERE signatories.code IN('Property Custodian','COA Representative','PGSO')");

foreach($signatories as $key => $sigList)
{
    switch ($sigList['code']) {
        case 'Property Custodian':
            $furniture_and_fixtures[0]['prop_custodian']['title']=$sigList['code'];
            $furniture_and_fixtures[0]['prop_custodian']['signatory_name']=$sigList['signatory_name'];
            break;
        case 'COA Representative':
            $furniture_and_fixtures[0]['coa_rep']['title']=$sigList['code'];
            $furniture_and_fixtures[0]['coa_rep']['signatory_name']=$sigList['signatory_name'];
            break;
        case 'PGSO':
            $furniture_and_fixtures[0]['pgso_officer']['title']=$sigList['code'];
            $furniture_and_fixtures[0]['pgso_officer']['signatory_name']=$sigList['signatory_name'];
            break;


    }

}

// $serialNo = $con -> getData ("SELECT parts_serial_number.id, parts_serial_number.part, upper(parts_serial_number.serial_number) AS serial_number FROM parts_serial_number WHERE parts_serial_number.machinery_equipment_id = ". $_POST['ppe_id']);

$furniture_and_fixtures[0]['serialNo'] = '' ;



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
echo json_encode($furniture_and_fixtures[0]);

?>