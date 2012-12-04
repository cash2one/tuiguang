<?php 
/**
 * 这是一个企业类，用来操作与企业相关的操作
 */

require_once('AppController.class.php');

class Stuff extends AppController
{
	private $stuff_id;
	
	public function __construct($stuff_id)
	{
		$this->stuff_id=$stuff_id;
		parent::__construct();
	}
	
	
	public function getStuffName()
	{
	
	}
	
	
	public function getStatus()
	{
		$arr=$this->db->getOne("SELECT status FROM tg_stuffs 
		                        WHERE id='".$this->stuff_id."'");
		
		return $arr['status'];
	}
	
	public function checkCateRepeat($cate_name,$id)
	{
		if($id)
		{
			$num=$this->db->getNum("SELECT cate_name 
			                        FROM tg_cates 
									WHERE cate_name='$cate_name'
									AND stuff_id='".$this->stuff_id."'
			                        AND id !='$id' ");
		}
		else
		{
			$num=$this->db->getNum("SELECT cate_name 
			                       FROM tg_cates 
								   WHERE cate_name='$cate_name'
								   AND stuff_id='".$this->stuff_id."'");
		}
		return $num;
	}
	
	public function addCate($cate_name)
	{
		$this->db->query("INSERT INTO tg_cates 
		                 (cate_name,stuff_id) 
						 VALUES 
						 ('$cate_name','".$this->stuff_id."')");
	}
	
	public function editCate($id,$cate_name)
	{
		$this->db->query("UPDATE tg_cates 
		                  SET cate_name='$cate_name' 
						  WHERE id='$id'");
	}
	
	public function deleteCates($ids)
	{
		$this->db->query("DELETE FROM tg_cates 
		                  WHERE id IN ($ids)");
	}
	
	
	public function getCatesNum()
	{
		$num=$this->db->getNum("SELECT * FROM tg_cates 
		                        WHERE stuff_id='".$this->stuff_id."'");
		return $num;
	}
	
	public function getCates($start=null,$limit=null)
	{
		$sql="SELECT * FROM tg_cates 
		      WHERE stuff_id='".$this->stuff_id."'
			  ORDER BY id DESC";
			  
		if($start && $limit)
		{
			$arr=$this->db->getSome($sql." LIMIT $start,$limit");
		}
		else
		{
			$arr=$this->db->getSome($sql);
		}
		
		return $arr;
	}
	
	
	/**********
	 * 
	 * 站点部分
	 * 
	 * *******/
	
	public function checkSiteRepeat($id,$site_url)
	{
		if($id)
		{
			$num=$this->db->getNum("SELECT id FROM tg_sites 
			                        WHERE site_url='$site_url'
									AND stuff_id='".$this->stuff_id."'
									AND id !='$id'");
		}
		else
		{
			$num=$this->db->getNum("SELECT id FROM tg_sites 
			                        WHERE site_url='$site_url'
									AND stuff_id='".$this->stuff_id."'");
		}
		
		return $num;
	}
	
	public function addSite($site_name,$site_url)
	{
		$this->db->query("INSERT INTO tg_sites 
		                  (site_name,site_url,stuff_id) 
						  VALUES 
						  ('$site_name','$site_url','".$this->stuff_id."')");
	}
	
	public function editSite($id,$site_name,$site_url)
	{
		$this->db->query("UPDATE tg_sites SET 
		                  site_name='$site_name',
						  site_url='$site_url' 
						  WHERE id='$id'");
	}
	
	public function getSitesNum()
	{
		$num=$this->db->getNum("SELECT id FROM tg_sites 
		                        WHERE stuff_id='".$this->stuff_id."'");
		return $num;
	}
	
	public function getSites($start=null,$limit=null)
	{
		$sql="SELECT * FROM tg_sites 
		      WHERE stuff_id='".$this->stuff_id."'
			  ORDER BY id DESC";
		if($start && $limit)
		{
			$arr=$this->db->getSome($sql." LIMIT $start,$limit");
		}
		else
		{
			$arr=$this->db->getSome($sql);
		}
		
		return $arr;
	}
	
	public function deleteSites($ids)
	{
		$this->db->query("DELETE FROM tg_sites WHERE id IN ($ids)");
	}
	
	
	/************
	 * 
	 * 关键词部分
	 * 
	 * **********/
	
	public function checkKeywordRepeat($id,$keyword)
	{
		if($id)
		{
			$num=$this->db->getNum("SELECT id FROM tg_keywords 
			                        WHERE keyword='$keyword'
									AND stuff_id='".$this->stuff_id."'
									AND id !='$id'");
		}
		else
		{
			$num=$this->db->getNum("SELECT id FROM tg_keywords 
			                        WHERE keyword='$keyword'
									AND stuff_id='".$this->stuff_id."'");
		}
		
		return $num;
	}
	
	
	public function addKeyword($keyword,$cate_id)
	{
		$this->db->query("INSERT INTO tg_keywords 
		                  (keyword,cate_id,stuff_id) 
						  VALUES 
						  ('$keyword','$cate_id','".$this->stuff_id."')");
	}
	
	public function editKeyword($id,$keyword,$cate_id)
	{
		$this->db->query("UPDATE tg_keywords SET 
		                  keyword='$keyword',
						  cate_id='$cate_id' 
						  WHERE id='$id' ");
	}
	
	public function getKeywordsNum()
	{
		$num=$this->db->getNum("SELECT id FROM tg_keywords
                                WHERE stuff_id='".$this->stuff_id."'");
		return $num;
	}
	
	public function getKeywords($start,$limit,$keyword=null,$cate_id=null,$mark=null)
	{
		$sql="SELECT keywords.id,
			  keywords.keyword,
			  keywords.mark,
		      keywords.top_ranks,
			  keywords.right_ranks,
		      keywords.cate_id,
			  cates.cate_name 
			  FROM tg_keywords AS keywords 
			  LEFT JOIN tg_cates AS cates 
			  ON keywords.cate_id=cates.id ";
			  
		$order_limit="ORDER BY keywords.id DESC LIMIT $start,$limit";
		
		if($keyword)
		{
			$arr=$this->db->getSome($sql." WHERE keywords.keyword LIKE '%$keyword%'
                                     	   AND keywords.stuff_id='".$this->stuff_id."' ".$order_limit);
		}
		else if($cate_id)
		{
			$arr=$this->db->getSome($sql." WHERE keywords.cate_id='$cate_id' ".$order_limit);
		}
		else if($mark)
		{
			$arr=$this->db->getSome($sql." WHERE keywords.mark='$mark' 
			                               AND keywords.stuff_id='".$this->stuff_id."'".$order_limit);
		}
		else
		{
			$arr=$this->db->getSome($sql." WHERE keywords.stuff_id='".$this->stuff_id."' ".$order_limit);
		}
		
		return $arr;
	}
	
	public function deleteKeywords($ids)
	{
		$this->db->query("DELETE FROM tg_keywords WHERE id IN ($ids)");
	}
	
	/**********************************
	*
	* 用户部分
	*
	**********************************/
	
	
	public function getUsersNum()
	{
		$num=$this->db->getNum("SELECT id FROM tg_users
		                        WHERE stuff_id='".$this->stuff_id."'");
		
		return $num;
	}
	
	public function getUsers()
	{
		$arr=$this->db->getSome("SELECT * FROM tg_users
		                         WHERE stuff_id='".$this->stuff_id."'");
		
		return $arr;
	}
	
	public function checkUserRepeat($username,$id=null)
	{
		if($id)
		{
			$num=$this->db->getNum("SELECT id FROM tg_users 
		                            WHERE username='$username'
									AND id !='$id'");
		}
		else
		{
			$num=$this->db->getNum("SELECT id FROM tg_users
			                        WHERE username='$username'");
		}
		
		if($num>0)
		{
			return true;
		}
		else
		{
			return false;
		}
		
	}
	
	/***************
	* 添加用户
	*
	***************/
	public function addUser($username,$password,$status)
	{
		$this->db->query("INSERT INTO tg_users
		                  (username,password,status,stuff_id)
						  VALUES
						  ('$username','".sha1($password)."','$status','".$this->stuff_id."')");
	}
	
	/***************
	*编辑用户
	*
	***************/
	public function editUser($id,$username,$password,$status)
	{
		if($password)
		{
			$this->db->query("UPDATE tg_users SET 
					      username='$username',
						  password='".sha1($password)."',
						  status='$status'
						  WHERE id='$id'");
		}
		else
		{
			$this->db->query("UPDATE tg_users SET 
					      username='$username',
						  status='$status'
						  WHERE id='$id'");
		}
		
	}
	
	/**************
	*删除用户
	*
	**************/
	
	public function deleteUsers($ids)
	{
		if($ids)
		{
			$this->db->query("DELETE FROM tg_users
			                  WHERE id IN ($ids)");
		}
	
	}
}

?>