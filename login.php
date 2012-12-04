<?php
session_start();

if(isset($_SESSION['auth2']) && $_SESSION['auth2']==1)
{
	header("Location:index.php");
	exit;
}

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>百度推广关键词排名跟踪系统-用户登录</title>
<style>
</style>
<link type="text/css" rel="stylesheet" href="ext/resources/css/ext-all.css" />
<link type="text/css" rel="stylesheet" href="css/global.css" />
<script type="text/javascript" src="ext/ext-all.js"></script>
<script type="text/javascript" src="ext/locale/ext-lang-zh_CN.js"></script>
<script type="text/javascript" src="js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="js/login.js"></script>
<script type="text/javascript">
Ext.Loader.setConfig({
      enabled: true
    });
	
Ext.onReady(function(){
	Ext.widget('login');
});

</script>
<style>
body{background-color:#091A2E;}
</style>
</head>

<body>
</body>
</html>
