/**
 * 这里定义的是一个通用父类窗口
 */
Ext.define('MyApp.view.utils.AppWindow',{
	extend:'Ext.window.Window',
	alias:'widget.appwindow',
	autoShow:true,
	border:false,
	//shadow:true,
	modal:true
});