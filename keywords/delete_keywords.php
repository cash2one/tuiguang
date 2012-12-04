<?php 
require('../config.php');
require_once('../lib/User.class.php');
require_once('../lib/Stuff.class.php');
require_once('../lib/Input.class.php');

$ids=Input::itrim($_POST['ids']);

$user    =new User($_SESSION['username']);
$stuff_id=$user->getStuffId();
$stuff   =new Stuff($stuff_id);

$stuff->deleteKeywords($ids);

if(mysql_affected_rows()>0)
{
	echo "删除成功";
}
else
{
	echo "删除失败";
}

?>