<?php
session_start();

if(isset($_SESSION['admin2']) && $_SESSION['admin2']==1)
{
	header('Location:index.php');
	exit;
}

?>
<html>
	<head>
		<meta charset="utf-8" />
		<script src="../ext/ext-all.js"></script>
		<link type="text/css" rel="stylesheet" href="../ext/resources/css/ext-all.css" />
		<link type="text/css" rel="stylesheet" href="../css/global.css" />
		<script src="../ext/locale/ext-lang-zh_CN.js"></script>
		<script src="js/AdminLogin.js"></script>
		<script>
			Ext.onReady(function(){
				Ext.widget('adminlogin');
			});
		</script>
		<style>
			body{background-color:#091A2E;}
		</style>
		<title>百度推广关键词排名跟踪系统-后台登陆</title>
	</head>
	<body>
	
	</body>
</html>