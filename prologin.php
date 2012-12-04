<?php
//==================================================
//
// 这是处理登陆的脚本
//
//==================================================
require('config.php');
require('lib/Input.class.php');
require('lib/Stuff.class.php');
require('lib/User.class.php');
if(isset($_POST['submitted']) && $_POST['submitted']==1)
{
	$username=Input::itrim($_POST['username']);
	$password=Input::itrim($_POST['password']);
	
	$user    =new User($username);
	$stuff_id=$user->getStuffId();
	$stuff   =new Stuff($stuff_id);
	
	if($user->login($password))
	{
		if($stuff->getStatus()==0)
		{
			echo "{success:false,msg:'该企业已被冻结'}";
			exit;
		}
		
		if($user->getStatus()==0)
		{
			echo "{success:false,msg:'该用户已被冻结'}";
			exit;
		}
		
		$_SESSION['auth2']=1;
		$_SESSION['username']=$username;
		echo "{success:true,msg:'登陆成功...'}";
	}
	else
	{
		echo "{success:false,msg:'用户名或密码错误'}";
	}
}

?>