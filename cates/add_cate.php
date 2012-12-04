<?php 
/**
 * 这是添加分类的脚本
 *
 */

require('../config.php');
require_once('../lib/User.class.php');
require_once('../lib/Stuff.class.php');
require_once('../lib/Input.class.php');

$id=Input::itrim($_POST['id']);
$cate_name=Input::itrim($_POST['cate_name']);

$user    =new User($_SESSION['username']);
$stuff_id=$user->getStuffId();
$stuff   =new Stuff($stuff_id);

/**
 * 检查分类是否重复
 */
$num=$stuff->checkCateRepeat($cate_name,$id);
if($num>0)
{
	echo "{success:false,msg:'该分类已存在'}";
	exit;
}

if($id)
{
	//编辑操作
	$stuff->editCate($id,$cate_name);
}
else
{
	//添加操作
	$stuff->addCate($cate_name);
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




