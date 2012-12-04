<?php

/**
 * @这是一个数据库类，用来提供各种操作数据库的方法
 * @作者 guojingzhou
 * @时间 2012.05.10
 */
 
require('db_config.php');
 
class Db
{
	private $con;
	
	public function __construct()
	{
		//加载全局变量
		global $dbhost;
		global $dbuser;
		global $dbpass;
		global $dbname;
		
		try
		{
			$this->con=mysql_connect($dbhost,$dbuser,$dbpass);
			mysql_select_db($dbname);

			if(!$this->con)
			{
				throw new Exception('数据库连接失败.');
			}
			mysql_query("SET names utf8");
		}
		catch(Exception $e)
		{
			echo $e->getMessage();
		} 
	}
	
	//参数为sql，返回整型结果数
	public function getNum($sql)
	{
		$result=mysql_query($sql) or die(mysql_error());
		$num=mysql_num_rows($result);
		return $num;
	}
	
	//获取单行记录，参数为sql，返回值为一维数组
	public function getOne($sql)
	{
		$result=mysql_query($sql) or die(mysql_error());
		$row=mysql_fetch_assoc($result);
		return $row;
	}
	
	
	//获取多行记录，参数为sql，返回值为二维数组
	public function getSome($sql)
	{
		$dataset=array();
		$result=mysql_query($sql) or die(mysql_error());
		while($row=mysql_fetch_assoc($result))
		{
			$dataset[]=$row;
		}
		return $dataset;
	}
	
	//执行INSERT、UPDATE、DELETE操作，无返回值
	public function query($sql)
	{
		mysql_query($sql) or die('操作失败'.mysql_error());
	}

} 

?>