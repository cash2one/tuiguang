<?php 
require('../config.php');
require_once('../lib/User.class.php');
require_once('../lib/Stuff.class.php');
require_once('../lib/Input.class.php');

$start=$_GET['start'];
$limit=$_GET['limit'];

$user    =new User($_SESSION['username']);
$stuff_id=$user->getStuffId();
$stuff   =new Stuff($stuff_id);

$data['total']=$stuff->getSitesNum();
$data['root']=$stuff->getSites();

echo json_encode($data);

?>