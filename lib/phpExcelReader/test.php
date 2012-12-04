<?php
// Test CVS

require_once 'Excel/reader.php';

@ $db = mysql_connect ( 'localhost', 'root', 'root' ) or die ( "Could not connect to database." ); // 连接数据库
mysql_query ( "set names 'utf-8'" ); // 输出中文
mysql_select_db ( 'test' ); // 选择数据库
error_reporting ( E_ALL ^ E_NOTICE );

$data = new Spreadsheet_Excel_Reader ();
$data->setOutputEncoding ( 'utf-8' );
$data->read ( 'Books.xls' );

ImportExcelData($data,'books',array('ISBN','Pubdate'),true);

/**
 * 将读取到的Excel数据导入到数据库中
 *
 * @access public
 * @param hasColumnHeader	是否包含列头
 * @param columnArray		要插入的列
 * @param tableName 		要插入的表
 * @param batchSize			每次执行插入语句的条数
 * @return bool
 */
function ImportExcelData($data,$tableName,$columnArray,$hasColumnHeader = false, $batchSize = 100){
	
	// 默认不包含列头，起始行就为1
	$start = 1;
	
	if($hasColumnHeader){
		// 如果包含列头，跳过列头，起始行为2
		$start = 2;
	}
	// 记录循环次数
	$loop = 0;
	$sql = "";
	// 生成insert语句的前半部分
	// 形式如这种：insert into table_name('field1','field2'...) values
	$insert_statement = CreateInsertStatement($tableName, $columnArray);
	for($i = $start; $i <= $data->sheets[0]['numRows']; $i++){ // 遍历行
		$sql .= $insert_statement;
		$sql .= "(";
		for ($j = 1; $j <= $data->sheets[0]['numCols']; $j++){ // 遍历列
			$sql .= "'".$data->sheets[0]['cells'][$i][$j]."',";
		}
		$sql = trimEnd($sql,",");
		$sql .= ");";
		
		$loop ++;
		// 当loop值等于batchSize时，执行插入操作
		if($loop == $batchSize){
			$res = mysql_query ( $sql );
			$loop = 0;
		}
		//echo $sql;
	}
	
	// 如果有950条记录，执行了前9个batch，剩余50条也应当执行
	if($loop != 0){
		echo $sql;
		$res = mysql_query ( $sql );
	}
}

/**
 * 创建插入sql的语句
 *
 * @access public
 * @param $tableName
 * @param $columnArray
 * @return string
 */
function CreateInsertStatement($tableName,$columnArray){
	$sql = "insert into books(";
	foreach ($columnArray as $c){
		$sql .= "".$c.",";
	}
	$sql = trimEnd($sql,",");
	$sql .= ") values";
	return $sql;
}

/**
 * 移除字符串中指定的尾部字符
 *
 * @access public
 * @param str
 * @param strEnd
 * @return string
 */
function trimEnd($str, $strEnd) {
	return substr ( $str, - (strlen ( $strEnd )) ) == $strEnd ? substr ( $str, 0, strlen ( $str ) - strlen ( $strEnd ) ) : $str;
}

// print_r($data);
// print_r($data->formatRecords);
?>
