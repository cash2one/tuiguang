<?php 
require('config.php');
require_once('lib/User.class.php');
require_once('lib/Db.class.php');
require_once('lib/Input.class.php');

$db=new Db();
$user=new User($_SESSION['username']);
$stuff_id=$user->getStuffId();

if($_POST['stuff_name'])
{
	$stuff_name=Input::itrim($_POST['stuff_name']);
	$db->query("UPDATE tg_stuffs SET stuff_name='$stuff_name' WHERE id='$stuff_id'");
	
	if(mysql_affected_rows()==1)
	{
		echo "{success:true,msg:'设置成功'}";
	}
	else
	{
		echo "{success:false,msg:'设置失败'}";
	}
}
?>