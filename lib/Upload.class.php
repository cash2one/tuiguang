<?php 
/**
 * 这是一个用于上传文件的类，主要提供一些文件上传的方法
 * 
 */

require_once('phpExcelReader/Excel/reader.php');

class Upload
{
	//检查是否为excel
	private function checkExcel($file)
	{
		$type=$file['type'];
		if($type!='application/octet-stream' && $type!='application/vnd.ms-excel')
		{
			return false;
		}
		else
		{
			return true;
		}
	}
	
	//参数说明：第一个是需要上传的文件，是一个文件数组$_FILES[],第二个参数是需要上传到的路径：eg，file/
	public function uploadExcel($file,$path)
	{
		if($this->checkExcel($file))
		{
			if($file['error']==0)
			{
				$now=time();
				$new_name=$path.$now.'.xls';
				move_uploaded_file($file['tmp_name'],$new_name);
				return $new_name;
			}
			else
			{
				return false;
			}
		}
		else
		{
			return false;
		}
	}
	
	//解析excel，返回多维数组
	public function readExcel($file)
	{
		// 2.实例化读取Excel的类
		$data = new Spreadsheet_Excel_Reader();
		// 3.设置输出编码
		$data->setOutputEncoding('utf-8');
		// 4.读取指定的excel
		$data->read($file);
		
		for ($i = 1; $i <= $data->sheets[0]['numRows']; $i++) 
		{
			for ($j = 1; $j <= $data->sheets[0]['numCols']; $j++) 
			{
				$arr[$i][]=@$data->sheets[0]['cells'][$i][$j];
			}
		}
		return $arr;
	}
	
}

?>