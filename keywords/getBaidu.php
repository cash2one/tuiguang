<?php
/************************************
*
* Function 根据关键词获取百度搜索结果
* Author   Guo Jingzhou
* Time     2012.08.14
* Input    string 关键词
* Output   string 网页内容
*************************************/

require('../lib/Input.class.php');

$wd  =urlencode(Input::itrim($_GET['wd']));
$html=file_get_contents("http://www.baidu.com/s?wd=".$wd);

echo $html;

?>