/**
 * 这是分类的store
 */
Ext.define('MyApp.store.Cates', {
	extend:'Ext.data.Store',
    model: 'MyApp.model.Cate',
    proxy: {
        type: 'ajax',
        url : 'cates/list_cates.php',
        reader: {
            type: 'json',
            root: 'root'
        }
    },
    autoLoad: true
});