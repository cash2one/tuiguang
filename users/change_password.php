<?php
require('../config.php');
require_once("../lib/Db.class.php");
require_once("../lib/Input.class.php");

$password1=Input::itrim($_POST['password']);
$password2=Input::itrim($_POST['password_confirm']);

if($password1!=$password2)
{
	echo "{success:false,msg:'两次输入的密码不一样'}";
	exit;
}

$db=new Db();
$username=$_SESSION['username'];

$db->query("UPDATE tg_users SET 
            password='".sha1($password1)."'
			WHERE username='".$_SESSION['username']."'");
			
echo "{success:true,msg:'修改成功'}";

?>