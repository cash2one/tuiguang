// JavaScript Document
//关键词控制器
Ext.define('MyApp.controller.KeywordsController', {
    extend: 'Ext.app.Controller',
	models:[
	   'Keyword'
	],
	stores:[
	    'Keywords'
	],
	views:[
		'keywords.KeywordsList',
		'keywords.AddKeyword',
		'keywords.AddBatKeywords',
		'keywords.MoveKeywords',
		'keywords.MarkKeywords',
		'keywords.OutputKeywords'
	]
});// JavaScript Document