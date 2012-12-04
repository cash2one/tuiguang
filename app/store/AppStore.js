/**
 * 这里定义的是store父类
 */
Ext.define('MyApp.store.AppStore', {
	model:'Cate',
	extend:'Ext.data.Store',
	pageSize:20,
    autoLoad:true
});