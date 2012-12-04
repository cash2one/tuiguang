/**
 * 这是站点的store
 */
Ext.define('MyApp.store.Sites', {
	extend:'Ext.data.Store',
    model: 'MyApp.model.Site',
    proxy: {
        type: 'ajax',
        url : 'sites/list_sites.php',
        reader: {
            type: 'json',
            root: 'root'
        }
    },
    autoLoad: true
});