<?php 
require('../config.php');
require('../lib/User.class.php');
require_once('../lib/Stuff.class.php');
require_once('../lib/Input.class.php');

$id		=Input::itrim($_POST['id']);
$keyword=Input::itrim($_POST['keyword']);
$cate_id=Input::itrim($_POST['cate_id']);

$user    =new User($_SESSION['username']);
$stuff_id=$user->getStuffId();
$stuff   =new Stuff($stuff_id);

//检查重复
$num=$stuff->checkKeywordRepeat($id,$keyword);
if($num>0)
{
	echo "{success:false,msg:'该关键词已存在'}";
	exit;
}

if($id)
{
	//编辑操作
	$stuff->editKeyword($id,$keyword,$cate_id);
}
else
{
	//添加操作
	$stuff->addKeyword($keyword,$cate_id);
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