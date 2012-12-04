<?php 
require('../config.php');
require_once('../lib/User.class.php');
require_once('../lib/Stuff.class.php');
require_once('../lib/Upload.class.php');
require_once('../lib/Input.class.php');

$bat    =$_FILES['bat'];
$cate_id=Input::itrim($_POST['cate_id']);

$upload  =new Upload();
$user    =new User($_SESSION['username']);
$stuff_id=$user->getStuffId();
$stuff   =new Stuff($stuff_id);

if($upload->uploadExcel($bat,'../file/'))
{
	$new_file=$upload->uploadExcel($bat,'../file/');       //上传文件
	$arr     =$upload->readExcel($new_file);               //读取刚刚上传的文件 
	                       
	foreach($arr as $row)
	{
		if(isset($row[0]) && $row[0]!='')
		{
			$keyword=$row[0];
				
			//检查重复
			$num=$stuff->checkKeywordRepeat('',$keyword); //检查关键词是否已经存在
			if($num==0)                                      
			{
				$stuff->addKeyword($keyword,$cate_id);    //上传关键词
			}
		}
	}
	
	unlink($new_file); //删除文件
}

if(mysql_affected_rows()>0)
{
	echo "{success:true,msg:'上传成功'}";
}
else
{
	echo "{success:false,msg:'上传失败'}";
}

?>