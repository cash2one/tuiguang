<?php 
require('../config.php');
require_once('../lib/Db.class.php');
require_once('../lib/Input.class.php');

$ids    =Input::itrim($_POST['ids']);
$mark   =Input::itrim($_POST['mark']);

$db     =new Db();

$db->query("UPDATE tg_keywords SET mark='$mark' WHERE id IN ( $ids ) ");
			
if(mysql_affected_rows()>0)
{
	echo "{success:true,msg:'标记成功'}";
}
else
{
	echo "{success:false,msg:'标记失败'}";
}
			



?>