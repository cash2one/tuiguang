<?php 
require('config.php');
require('lib/User.class.php');
require('lib/Stuff.class.php');
require_once('lib/Db.class.php');

$type    =$_GET['type'];

$user    =new User($_SESSION['username']);
$stuff_id=$user->getStuffId();

$db      =new Db();

switch($type)
{
	case 'stuffname':
	$arr =$db->getOne("SELECT stuff_name 
	                  FROM tg_users  
					  LEFT JOIN tg_stuffs
					  ON tg_users.stuff_id=tg_stuffs.id
					  WHERE tg_users.username='".$_SESSION['username']."'");
	$info= $arr['stuff_name'];
	break;
	
	case 'all':
	$arr=$db->getOne("SELECT 
	                  users.username,
					  stuffs.stuff_index,
					  stuffs.stuff_name
					  FROM tg_users AS users
					  LEFT JOIN tg_stuffs AS stuffs
					  ON users.stuff_id=stuffs.id
					  WHERE users.username='".$_SESSION['username']."'");
	
	$arr['k_num']    =$db->getNum("SELECT id FROM tg_keywords 
	                               WHERE stuff_id='$stuff_id'");
	
	$arr['top_num']  =$db->getNum("SELECT id FROM tg_keywords 
	                            WHERE top_ranks !='' 
								AND stuff_id='$stuff_id' ");
	$arr['right_num']=$db->getNum("SELECT id FROM tg_keywords 
	                               WHERE right_ranks !='' 
								   AND stuff_id='$stuff_id'");
								   
	$arr['rest_num']=$arr['k_num']-$arr['top_num']-$arr['right_num'];
	$info=json_encode($arr);
	break;
	
}

echo $info;

?>