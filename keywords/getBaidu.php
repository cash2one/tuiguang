<?php
/************************************
*
* Function ���ݹؼ��ʻ�ȡ�ٶ��������
* Author   Guo Jingzhou
* Time     2012.08.14
* Input    string �ؼ���
* Output   string ��ҳ����
*************************************/

require('../lib/Input.class.php');

$wd  =urlencode(Input::itrim($_GET['wd']));
$html=file_get_contents("http://www.baidu.com/s?wd=".$wd);

echo $html;

?>