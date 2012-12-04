<?php 
/**
 * @这是一个基类，所有的对数据库有操作的类都要从这里继承
 * @创建人 Guo jingzhou 2012.07.13
 */

require('Db.class.php');

class AppController
{
	protected $db;
	
	public function __construct()
	{
		$this->db=new Db();
	}
}

?>