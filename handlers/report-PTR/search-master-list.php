<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

session_start();

$start_date = $_POST['start'];
$end_date = $_POST['end'];

$search_purpose = isset($_POST['type']) ? $_POST['type'] : 'ALL';
$purpose_value = ($search_purpose == 'ALL' || $search_purpose == '') ? "" : " AND pme.status = '$search_purpose'";

$search_office = isset($_POST['searchOffice']['id']) ? $_POST['searchOffice']['id'] : 'ALL';
$office_value = ($search_office == 'ALL' || $search_office == '') ? "" : " AND ao.office_id = '$search_office'";

$search_article = isset($_POST['article']['id']) ? $_POST['article']['id'] : 'ALL';
$article_value = ($search_article == 'ALL' || $search_article == '') ? "" : " AND me.article_id = '$search_article'";

  $master_lists = $con->getData("SELECT pme.id AS pme_id, pme.par_id, pme.prev_accountable_officer, pme.equipment_id, pme.status, ao.id AS ao_id, pn.id AS pn_id, pn.ptr_no, pn.par_date, CONCAT(ao.last_name,', ',ao.first_name,' ',ao.middle_name) AS accountable_name, ao.office_id, o.id AS o_id, o.name AS office, me.id AS me_id, me.article_id, a.id AS a_id, a.name 
  FROM par_machinery_equipment AS pme, users AS ao, machinery_equipment_pars AS pn, offices AS o, machinery_equipment AS me, articles AS a 
  WHERE ao.id = pme.prev_accountable_officer AND pn.id = pme.par_id AND ao.office_id = o.id AND pme.equipment_id = me.id AND me.article_id = a.id $purpose_value $office_value $article_value AND pn.par_date BETWEEN '$start_date' AND '$end_date' AND pme.status IN('DONATION', 'RELOCATE', 'REASSIGN', 'OTHERS')");



foreach($master_lists as $key => $ml) {

  $master_lists[$key]['list_no'] = $key+1;
}

echo json_encode($master_lists);

?>