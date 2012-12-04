<?php
/************************************************
*
* Function  用户类，提供获取用户信息的常用方法
* Author    Guo Jingzhou
* Time      2012.08.15
* Input     string 用户名
*
************************************************/
require_once('AppController.class.php');

class User extends AppController
{
	private $username;
	
	public function __construct($username)
	{
		$this->username=$username;
		parent::__construct();
	}
	
	//=============================
	//
	// Function  登录
	// Input     string 密码
	// Output    bool 是否成功
	//
	//=============================
	public function login($password)
	{
		$num=$this->db->getNum("SELECT id 
		                        FROM tg_users
								WHERE username='".$this->username."'
								AND password='".sha1($password)."'");
								
		if($num>0)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	
	//=================================
	//
	// Function  获取用户所属的企业id
	// Input     null
	// Output    int 企业ID
	//
	//=================================
	public function getStuffId()
	{
		$arr=$this->db->getOne("SELECT stuff_id 
		                        FROM tg_users 
								WHERE username='".$this->username."'");
		return $arr['stuff_id'];
	}
	
	//=================================
	//
	// Function  获取用户所属企业名称
	// Input     null
	// Output    string 企业名称
	//
	//=================================
	public function getStuffName()
	{
		$arr=$this->db->getOne("SELECT tg_stuffs.stuff_name
		                        FROM tg_users 
								LEFT JOIN tg_stuffs
								ON tg_users.stuff_id=tg_stuffs.id
								WHERE tg_users.username='".$this->username."'");
								
		return $arr['stuff_name'];
	}
	
	//=================================
	//
	// Function  获取用户所属企业的编号
	// Input     null
	// Output    string 企业编号
	//
	//=================================
	
	public function getStuffIndex()
	{
		$arr=$this->db->getOne("SELECT stuff_index
		                        FROM tg_users
								WHERE username='".$this->username."'");
								
		return $arr['stuff_index'];
	}
	
	public function getStatus()
	{
		$arr=$this->db->getOne("SELECT status FROM tg_users
		                        WHERE username='".$this->username."'");
								
		return $arr['status'];
	}
}

?>