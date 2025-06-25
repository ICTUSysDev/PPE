<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$fund = $con->getData("SELECT id, code, funds.name FROM funds ORDER BY code ASC");

foreach($fund as $key1 => $fund_list) {

    $fund[$key1]['id']=$fund_list['id'];
    $fund[$key1]['code']=$fund_list['code'];
    $fund[$key1]['name']=$fund_list['name'];

}

$year_start  = 2000;
$year_end = date('Y'); // current Year
$selected_year = date('Y'); // user date of birth year

foreach(range(date('Y'), $year_start) as $i => $y) {
    $years[$i]['year'] = $y;
}

$data_list = array(
    'funds' => $fund,
    'years' => $years
);

header("Content-Type: application/json");
echo json_encode($data_list);

?>