<?php
/************安装程序******************/

//检测目录权限
if(!is_writable('../lib/'))
{
	echo "{success:false,msg:'lib文件夹不可写，配置文件无法创建，请修改权限'}";
	exit;
}

if(!is_writable('../file/'))
{
	echo "{success:false,msg:'file文件夹不可写，配置文件无法创建，请修改权限'}";
	exit;
}	

require('../lib/Input.class.php');

$dbhost  = Input::itrim($_POST['dbhost']);
$dbuser  = Input::itrim($_POST['dbuser']);
$dbpass  = Input::itrim($_POST['dbpass']);
$dbname  = Input::itrim($_POST['dbname']);
$username= Input::itrim($_POST['username']); //管理员账号
$password= Input::itrim($_POST['password']); //管理员密码

$con=mysql_connect($dbhost,$dbuser,$dbpass);
if(!$con)
{
	echo "{success:false,msg:'数据库连接失败'}";
	exit;
}

/**
if(mysql_select_db($dbname))
{	
	echo "{success:false,msg:'该数据库已存在'}";
	exit;
}
**/
//创建数据库
$query1=mysql_query("CREATE DATABASE IF NOT EXISTS `".$dbname."` 
             DEFAULT CHARACTER SET utf8 
			 COLLATE utf8_general_ci;");
			 
			 
			 
mysql_select_db($dbname);
			 

$query2=mysql_query("CREATE TABLE IF NOT EXISTS `tg_cates` (
					`id` int(11) unsigned NOT NULL AUTO_INCREMENT,
					`cate_name` varchar(255) DEFAULT NULL,
					`stuff_id` int(11) DEFAULT NULL,
					PRIMARY KEY (`id`)
					) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;");
					

$query3=mysql_query("CREATE TABLE IF NOT EXISTS `tg_keywords` (
					  `top_ranks` varchar(255) DEFAULT NULL,
					  `right_ranks` varchar(255) DEFAULT NULL,
					  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
					  `keyword` varchar(255) DEFAULT NULL,
					  `cate_id` int(11) DEFAULT NULL,
					  `mark` tinyint(1) DEFAULT NULL,
					  `stuff_id` int(11) DEFAULT NULL,
					  PRIMARY KEY (`id`)
					) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;");
					
					
$query4=mysql_query("CREATE TABLE IF NOT EXISTS `tg_sites` (
					  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
					  `site_name` varchar(255) DEFAULT NULL,
					  `site_url` varchar(255) DEFAULT NULL,
					  `stuff_id` int(11) DEFAULT NULL,
					  PRIMARY KEY (`id`)
					) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;");
					
					
$query5=mysql_query("CREATE TABLE IF NOT EXISTS `tg_stuffs` (
				  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
				  `stuff_index` varchar(255) DEFAULT NULL,
				  `stuff_name` varchar(255) DEFAULT NULL,
				  `status` tinyint(1) DEFAULT NULL,
				  `notion` varchar(255) DEFAULT NULL,
				  PRIMARY KEY (`id`)
				) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;");
				
				
$query6=mysql_query("CREATE TABLE IF NOT EXISTS `tg_users` (
				  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
				  `username` varchar(255) DEFAULT NULL,
				  `password` varchar(255) DEFAULT NULL,
				  `status` tinyint(1) DEFAULT NULL,
				  `stuff_id` int(11) DEFAULT NULL,
				  PRIMARY KEY (`id`)
				) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;");
				
$query7=mysql_query("INSERT INTO `tg_users` 
                    (`username`, `password`, `status`, `stuff_id`) 
					VALUES
                    ('".$username."','".sha1($password)."', 1, 0)");
					

$fp=fopen('../lib/db_config.php','w');
if(!$fp)
{
	echo "{success:false,msg:'创建配置文件失败'}";
	exit;
}
$str='<?php ';
$str.='$dbhost=\''.$dbhost.'\';';
$str.='$dbuser=\''.$dbuser.'\';';
$str.='$dbpass=\''.$dbpass.'\';';
$str.='$dbname=\''.$dbname.'\';';
$str.=' ?>';

if(!fwrite($fp,$str))
{
	echo "{success:false,msg:'写入配置文件失败'}";
	exit;
}

fclose($fp);

echo "{success:true,msg:'OK'}";




?>