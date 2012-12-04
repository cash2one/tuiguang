<?php 
/**
 * @这是一个输入类，主要用来过滤用户的输入
 * @创建人 Guo Jingzhou 2012.07.13
 */

class Input
{
	//此方法为静态方法，用来过滤POST和GET方法
	//@输入：一维数组
	//@输出:一维数组
	public static function filter($arr)
	{
		if(is_array($arr))
		{
			foreach($arr as $key=>$value)
			{
				$output[$key]=addslashes(trim($value));
			}
			
			return $output;
		}
		else
		{
			return '参数应该是一个数组';
		}
	}
	
	//过滤单个字符串
	public static function itrim($str)
	{
		return addslashes(trim($str));
	}
}
?>