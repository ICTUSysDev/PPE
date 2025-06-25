<?php

date_default_timezone_set('GMT');

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db("notifications");

$user_id = $_SESSION['id'];

$notifications = [];

$response = array(
	"count"=>0,
	"data"=>[],
);

$group = "";
$where = "";

$user_types = $con->getData("SELECT id, groups FROM users WHERE id = $user_id");

$groups = $con->getData("SELECT id, name FROM groups WHERE id = ".$user_types[0]['groups']);
$user_types[0]['groups'] = $groups[0];

$user_type = $user_types[0]['groups']['name'];

$notifications = $con->getData("SELECT *, DATE_FORMAT(created_at,'%M %d, %Y |  %h:%i %p') request_date  FROM notifications WHERE for_user = '$user_type' AND notifications.dismiss = 0 ORDER BY created_at DESC");

foreach ($notifications as $i => $notification) {

	$icon = "";
	$color = "";

	if ($notification['description']=="Request for Zoom Meeting") {
		$icon = 'calendar';
		$color = 'secondary';
	} else if($notification['description']=="Request for Event Assistance"){
		$icon = 'calendar';
		$color = 'secondary';
	}

	$notifications[$i]['icon'] = $icon;
	$notifications[$i]['color'] = $color;

	$user = $con->getData("SELECT id, CONCAT(first_name,' ',last_name) fullname, office_id FROM users WHERE id = ".$notification['user_id']);
		
	$office = $con->getData("SELECT id, shortname FROM offices WHERE id = ".$user[0]['office_id']);
	$user[0]['shortname'] = $office[0]['shortname'];
		
	$notifications[$i]['user_id'] = $user[0];

	date_default_timezone_set('Asia/Manila');	
	
	$now = date_create(date("Y-m-d H:i:s"));
	$date_notified = date_create($notification['created_at']);

	$ago = date_diff($now,$date_notified);

	$s = '';
	if (($ago->i)>1) $s = 's';
	$notifications[$i]['ago'] = $ago->format("%i min$s ago");
	if (($ago->h)>0) {
		$s = '';
		if (($ago->h)>1) $s = 's';		
		$notifications[$i]['ago'] = $ago->format("%h hour$s ago");
	};
	if (($ago->d)>0) {
		$s = '';
		if (($ago->d)>1) $s = 's';		
		$notifications[$i]['ago'] = $ago->format("%d day$s ago");
	};

};

$repair_count = $con->getData("SELECT id, COUNT(status_approve) AS repair_count FROM `pre_repair_requests` WHERE status_approve = 1 GROUP BY id");
$response['repair_count'] = $repair_count;

if(empty($repair_count[0]['repair_count'])) {
	$response['repair_count']['status'] = false;
	$response['repair_count']['repair_count'] = 0;
} else {
	$response['repair_count']['status'] = true;
	$response['repair_count']['repair_count'] = $repair_count[0]['repair_count'];
}

$response['count'] = count($notifications);
$response['data'] = $notifications;

echo json_encode($response);

?>