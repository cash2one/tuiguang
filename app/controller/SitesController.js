// JavaScript Document
//站点控制器
Ext.define('MyApp.controller.SitesController', {
    extend: 'Ext.app.Controller',
	models:[
		'Site'			
	],
	stores:[
	   'Sites'
	],
	views:[
		'sites.SitesList',
		'sites.AddSite'
	],
	init:function(){
		this.callParent(arguments);
	}
});