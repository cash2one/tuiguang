<?php
session_start();

if(!file_exists('../lib/db_config.php'))
{
	header('Location:../install/');
	exit;
}


if(!isset($_SESSION['admin2']) || $_SESSION['admin2']!=1)
{
	header("Location:login.php");
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
		<script src="js/Viewport.js"></script>
		<script src="js/Menu.js"></script>
		<script src="js/StuffsGrid.js"></script>
		<script src="js/UsersGrid.js"></script>
		<script src="js/Password.js"></script>
		<script>
			Ext.onReady(function(){
				Ext.widget('viewport');
			});
		</script>
	</head>
	<body>
	
	</body>
</html>