<?php 
require('../config.php');
require('../lib/Input.class.php');
require('../lib/get_baidu.func.php');
require('../lib/User.class.php');
require('../lib/Stuff.class.php');

$index      =Input::itrim($_POST['index']);
$id         =Input::itrim($_POST['id']);
$keyword    =Input::itrim($_POST['keyword']);

$top_urls   =get_baidu_top($keyword);
$right_urls =get_baidu_right($keyword);

$user       =new User($_SESSION['username']);
$stuff_id   =$user->getStuffId();
$stuff      =new Stuff($stuff_id);
$sites 	    =$stuff->getSites();

$top_ranks  =array();
$right_ranks=array();

foreach($sites as $row)
{
	$site_url=$row['site_url'];
	foreach($top_urls as $key=>$value)
	{
		if(strpos($value,$site_url)!==false)
		{
			$top_ranks[]  =$key;
		}
	}
	
	foreach($right_urls as $key=>$value)
	{
		if(strpos($value,$site_url))
		{
			$right_ranks[]=$key;
		}
	}
}

//print_r($sites);
sort($top_ranks);
sort($right_ranks);

$top_ranks_str  =implode('&nbsp;&nbsp;',$top_ranks);
$right_ranks_str=implode('&nbsp;&nbsp;',$right_ranks);

$db=new Db();
$db->query("UPDATE tg_keywords 
		    SET top_ranks='$top_ranks_str',
			right_ranks='$right_ranks_str'
			WHERE id='$id' ");

$data['index']  =$index;
$data['keyword']=$keyword;

echo json_encode($data);

?>