<?php
// Test CVS

require_once 'Excel/reader.php';

@ $db = mysql_connect ( 'localhost', 'root', 'root' ) or die ( "Could not connect to database." ); // �������ݿ�
mysql_query ( "set names 'utf-8'" ); // �������
mysql_select_db ( 'test' ); // ѡ�����ݿ�
error_reporting ( E_ALL ^ E_NOTICE );

$data = new Spreadsheet_Excel_Reader ();
$data->setOutputEncoding ( 'utf-8' );
$data->read ( 'Books.xls' );

ImportExcelData($data,'books',array('ISBN','Pubdate'),true);

/**
 * ����ȡ����Excel���ݵ��뵽���ݿ���
 *
 * @access public
 * @param hasColumnHeader	�Ƿ������ͷ
 * @param columnArray		Ҫ�������
 * @param tableName 		Ҫ����ı�
 * @param batchSize			ÿ��ִ�в�����������
 * @return bool
 */
function ImportExcelData($data,$tableName,$columnArray,$hasColumnHeader = false, $batchSize = 100){
	
	// Ĭ�ϲ�������ͷ����ʼ�о�Ϊ1
	$start = 1;
	
	if($hasColumnHeader){
		// ���������ͷ��������ͷ����ʼ��Ϊ2
		$start = 2;
	}
	// ��¼ѭ������
	$loop = 0;
	$sql = "";
	// ����insert����ǰ�벿��
	// ��ʽ�����֣�insert into table_name('field1','field2'...) values
	$insert_statement = CreateInsertStatement($tableName, $columnArray);
	for($i = $start; $i <= $data->sheets[0]['numRows']; $i++){ // ������
		$sql .= $insert_statement;
		$sql .= "(";
		for ($j = 1; $j <= $data->sheets[0]['numCols']; $j++){ // ������
			$sql .= "'".$data->sheets[0]['cells'][$i][$j]."',";
		}
		$sql = trimEnd($sql,",");
		$sql .= ");";
		
		$loop ++;
		// ��loopֵ����batchSizeʱ��ִ�в������
		if($loop == $batchSize){
			$res = mysql_query ( $sql );
			$loop = 0;
		}
		//echo $sql;
	}
	
	// �����950����¼��ִ����ǰ9��batch��ʣ��50��ҲӦ��ִ��
	if($loop != 0){
		echo $sql;
		$res = mysql_query ( $sql );
	}
}

/**
 * ��������sql�����
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
 * �Ƴ��ַ�����ָ����β���ַ�
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
