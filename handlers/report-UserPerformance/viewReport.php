<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';
date_default_timezone_set('Asia/Manila');
$con = new pdo_db();

// print_r($_POST);
// die();
$userPerformanceList = array();
// $counter=0;
// $total_acquisition_cost=0;

//add date to inventory date
$from_date =  strtotime($_POST['from_date']);
$from_date = date('Y-m-d',$from_date);

$to_date =  strtotime($_POST['to_date']);
// $date_of_inventory = date('Y-m-d H:i:s',strtotime("+1 day",$inventory_date));
$to_date = date('Y-m-d',strtotime("+1 day",$to_date));

// echo $from_date;
$list_of_modules = $con -> getData("SELECT module_name FROM history GROUP BY module_name ORDER BY module_name asc");


foreach($list_of_modules as $key => $module_list)
{

    if ($module_list['module_name'] == '')
    {
        continue;
    }
    
    // print_r($module_list);
    // die();
    $userPerformanceList[$key]['module'] = $module_list['module_name'];

    $list = $con -> getData("SELECT history.user_id, users.employee_id, CONCAT(users.first_name, ' ', users.last_name) as user_name, count(user_id) as count_id FROM history INNER JOIN users ON history.user_id = users.id WHERE module_name LIKE '". $module_list['module_name'] ."' AND created_at BETWEEN '". $from_date ."'  AND '". $to_date ."'  group by user_id, module_name ORDER BY module_name, count_id desc");

    foreach($list as $key1 => $encoders_list)
    {
        $userPerformanceList[$key]['list'][$key1]['number'] = $key1 + 1;
        $userPerformanceList[$key]['list'][$key1]['userid'] = $encoders_list['user_id'];
        $userPerformanceList[$key]['list'][$key1]['user'] = $encoders_list['user_name'];
        $userPerformanceList[$key]['list'][$key1]['number_of_occurence'] = $encoders_list['count_id'];
    }

}



header("Content-Type: application/json");
echo json_encode($userPerformanceList);

?>