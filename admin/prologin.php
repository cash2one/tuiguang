<?php
require('../config.php');
require('../lib/Db.class.php');
require('../lib/Input.class.php');

$username=Input::itrim($_POST['username']);
$password=Input::itrim($_POST['password']);

$db=new Db();

$num=$db->getNum("SELECT id FROM tg_users
                 WHERE username='$username' 
			     AND password='".sha1($password)."'
				 AND stuff_id='0'");
			 
if($num==1)
{
    $_SESSION['admin2']=1;
	echo "{success:true,msg:'登陆成功,正在跳转...'}";
}
else
{
	echo "{success:false,msg:'用户名或密码错误'}";
}
			 
?>