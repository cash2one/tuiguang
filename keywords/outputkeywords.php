<?php
require('../config.php');
require_once('../lib/User.class.php');
require_once('../lib/Stuff.class.php');

$today=date("Y-m-d");

header("Content-type:application/vnd.ms-excel");
header("Content-Disposition:attachment;filename=keywords{$today}.xls");

//检查是否已登陆

if($_SESSION['auth2']!=1)
{
	exit;
}


$user    =new User($_SESSION['username']);
$db      =new Db();
$stuff_id=$user->getStuffId();
$stuff   =new Stuff($stuff_id);
$cate_id =$_GET['cate_id'];
$rb      =$_GET['rb'];

switch($rb)
{
	case '1':
	$rb_sql=" 1=1 ";
	break;
	
	case '2':
	$rb_sql=" tg_keywords.top_ranks !='' ";
	break;
	
	case '3':
	$rb_sql=" tg_keywords.right_ranks!='' ";
	break;
	
	case '4':
	$rb_sql=" tg_keywords.top_ranks='' AND tg_keywords.right_ranks='' ";
    break;
}

if($cate_id=='all')
{
	$cate_sql=" 1=1 ";
}
else
{
	$cate_id=intval($cate_id);
	$cate_sql=" tg_keywords.cate_id='$cate_id' ";
}

$sql="SELECT 
	   tg_keywords.keyword,
	   tg_keywords.top_ranks,
	   tg_keywords.right_ranks,
	   tg_cates.cate_name 
	   FROM tg_keywords LEFT JOIN tg_cates
	   ON tg_keywords.cate_id=tg_cates.id
	   WHERE tg_keywords.stuff_id='$stuff_id'
	   AND $rb_sql
	   AND $cate_sql ";

$arr      =$db->getSome($sql);

$k_num    =count($arr);

$top_num  =$db->getNum($sql." AND tg_keywords.top_ranks !='' ");

$right_num=$db->getNum($sql." AND tg_keywords.right_ranks !='' ");

echo "<table border=1 >";
echo '<tr>';
echo "<th>关键词</th>";
echo "<th>所属分类</th>";
echo "<th>顶部排名</th>";
echo "<th>右侧排名</th>";
echo "<th>--</th>";
echo "<th>--</th>";
echo '</tr>';
if(is_array($arr))
{
	foreach($arr as $row)
	{
		echo '<tr>';
		echo "<td>{$row['keyword']}</td>";
		echo "<td>{$row['cate_name']}</td>";
		echo "<td>{$row['top_ranks']}</td>";
		echo "<td>{$row['right_ranks']}</td>";
		echo "<td></td>";
		echo "<td></td>";
		echo '</tr>';
	}
}

echo '<tr>';
echo "<td>合计</td>";
echo "<td>{$k_num}</td>";
echo "<td>{$top_num}</td>";
echo "<td>{$right_num}</td>";
echo "<td></td>";
echo "<td></td>";
echo '</tr>';

echo '</table>';







?>