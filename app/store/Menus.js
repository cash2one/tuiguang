Ext.define('MyApp.store.Menus', {
	fields:['text','leaf','xtype','id'],
	extend:'Ext.data.TreeStore',
    root: {
        expanded: true,
        children: [
            { text: "关键词管理",leaf:true,xtype:'keywordslist'},
			{ text: "站点管理",leaf:true,xtype:'siteslist'},
			{ text: "分类管理",leaf:true,xtype:'cateslist'},
            { text: "账号管理",expanded:true, children: [
					{ text: "修改密码",leaf:true,xtype:'changepassword'}
            	] 
			}
        ]
    }
});// JavaScript Document