<?php 
require('../config.php');
require_once('../lib/User.class.php');
require_once('../lib/Stuff.class.php');
require_once('../lib/Input.class.php');

$id=Input::itrim($_POST['id']);
$site_name=Input::itrim($_POST['site_name']);
$site_url=Input::itrim($_POST['site_url']);

$user    =new User($_SESSION['username']);
$stuff_id=$user->getStuffId();
$stuff   =new Stuff($stuff_id);

//检查是否重复
$num=$stuff->checkSiteRepeat($id,$site_url);
if($num>0)
{
	echo "{success:false,msg:'该站点已存在'}";
	exit;
}

if($id)
{
	$stuff->editSite($id,$site_name,$site_url);
}
else
{
	$stuff->addSite($site_name,$site_url);
}

if(mysql_affected_rows()==1)
{
	echo "{success:true,msg:'操作成功'}";
}
else
{
	echo "{success:false,msg:'操作失败'}";	
}
?>