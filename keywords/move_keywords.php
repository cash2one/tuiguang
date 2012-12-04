<?php 
require('../config.php');
require_once('../lib/Db.class.php');
require_once('../lib/Input.class.php');

$ids    =Input::itrim($_POST['ids']);
$cate_id=Input::itrim($_POST['cate_id']);

$db     =new Db();

$db->query("UPDATE tg_keywords SET cate_id='$cate_id' WHERE id IN ( $ids ) ");
			
if(mysql_affected_rows()>0)
{
	echo "{success:true,msg:'移动成功'}";
}
else
{
	echo "{success:false,msg:'移动失败'}";
}
			



?>