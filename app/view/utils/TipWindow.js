//这里定义的是一个提示窗的父类

Ext.define('MyApp.view.utils.TipWindow',{
	extend:'Ext.window.Window',
	alias:'widget.tipwindow',
	width:300,
	height:200,
	iconCls:'tooltip',
	bodyPadding:10,
	bodyStyle:'background-color:white',
	title:'小贴士',
	autoShow:true
});