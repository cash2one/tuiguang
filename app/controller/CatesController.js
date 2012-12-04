// JavaScript Document
//全局控制器
Ext.define('MyApp.controller.CatesController', {
    extend: 'Ext.app.Controller',
	models:[
		'Cate'			
	],
	stores:[
	   'Cates'
	],
	views:[
		'cates.AddCate',
		'cates.CatesList'
	],
	init:function(){
		this.callParent(arguments);
	}
});