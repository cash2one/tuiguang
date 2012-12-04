<?php 
require('../config.php');
require('../lib/User.class.php');
require_once('../lib/Stuff.class.php');
require_once('../lib/Input.class.php');

$start=$_GET['start'];
$limit=$_GET['limit'];

$keyword=Input::itrim($_GET['keyword']);
$cate_id=Input::itrim($_GET['cate_id']);
$mark   =Input::itrim($_GET['mark']);

$user    =new User($_SESSION['username']);
$stuff_id=$user->getStuffId();
$stuff   =new Stuff($stuff_id);

$data['total']=$stuff->getKeywordsNum();
$data['root'] =$stuff->getKeywords($start,$limit,$keyword,$cate_id,$mark);

echo json_encode($data);

?>