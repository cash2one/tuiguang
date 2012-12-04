<?php

if(!file_exists('lib/db_config.php'))
{
	header('Location:install/');
	exit;
}

session_start();

if(!isset($_SESSION['auth2']) || $_SESSION['auth2']!=1)
{
	header("Location:login.php");
	exit;
}

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>百度推广关键词排名跟踪系统</title>
<style>

</style>
<link type="text/css" rel="stylesheet" href="ext/resources/css/ext-all.css" />
<link type="text/css" rel="stylesheet" href="css/global.css" />
<script type="text/javascript" src="ext/ext-all.js"></script>
<script type="text/javascript" src="ext/locale/ext-lang-zh_CN.js"></script>
<script type="text/javascript" src="js/jquery-1.7.2.min.js"></script>
<script type="text/javascript">
Ext.Loader.setConfig({
      enabled: true
    });
	
Ext.application({
    name: 'MyApp',
	controllers:[
		'AppController',
		'LoginController',
		'KeywordsController',
		'CatesController',
		'SitesController'
	],
    launch: function() {
		//创建登录窗口
        Ext.widget('viewport');
		/**
		Ext.Ajax.request({
			url:'get_general_info.php?type=all',
			success:function(res){
				var obj=Ext.decode(res.responseText);
				Ext.getCmp('username').setText('欢迎你，'+"<span class='red'>"+obj.username+"</span>");
				Ext.getCmp('stuffindex').setText('企业编号：'+"<span class='red'>"+obj.stuff_index+"</span>");
				Ext.getCmp('stuffname').setText('企业名称：'+"<span class='red'>"+obj.stuff_name+"</span>");
				Ext.getCmp('k_num').setText('关键词数量：'+"<span class='red'>"+obj.k_num+"</span>");
				Ext.getCmp('top_num').setText('顶部：'+"<span class='red'>"+obj.top_num+"</span>");
				Ext.getCmp('right_num').setText('右侧：'+"<span class='red'>"+obj.right_num+"</span>");
			}
		});
		**/
    }
});
</script>
</head>

<body>
</body>
</html>
