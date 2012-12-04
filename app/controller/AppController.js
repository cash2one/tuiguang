// JavaScript Document
//全局控制器
Ext.define('MyApp.controller.AppController', {
    extend: 'Ext.app.Controller',
	models:[
					
	],
	stores:[
		'Menus'
	],
	views:[
		'Viewport',
		'StuffName',
		'utils.TipWindow',
		'utils.AppWindow',
		'ChangePassword'
	],
	init:function(){
		this.control({
			'button[action=cancel]':{
				'click':function(btn){
					var win=btn.up('window');
					win.close();
				}
			}
		})
	}
});


var ExtAlert=function(msg){
	Ext.Msg.alert('信息提示',msg);
}

//定义一个模态窗口，在窗口内加载另一个网址
var ExtOpen=function(url,config){
	var url=url.replace(/http:\/\//,'');
	url='http://'+url;
	var win=Ext.create('Ext.window.Window',{
		width:800,
		height:500,
		maximizable:true,
		html:"<iframe src='"+url+"' style='width:100%;height:100%;border:none;'/>"
	})
	if(typeof(config)=='object')
	{
		Ext.apply(win,config);
	}	
	win.show();
}

//定义一个模态窗口，在窗口内加载一个本地网址
var ExtOpenLocal=function(url,config){
	var win=Ext.create('Ext.window.Window',{
		width:800,
		height:500,
		maximizable:true,
		html:"<iframe src='"+url+"' style='width:100%;height:100%;border:none;'/>"
	})
	if(typeof(config)=='object')
	{
		Ext.apply(win,config);
	}	
	win.show();
}