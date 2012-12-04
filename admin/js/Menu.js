var MenuStore = Ext.create('Ext.data.TreeStore', {
	fields:['expanded','text','leaf','type'],
    root: {
        expanded: true,
        children: [
            { text: "企业管理", leaf: true },
			/**
            { text: "帐号管理", expanded: true, children: [
                { text: "修改密码", leaf: true },
                { text: "", leaf: true}
            ] },**/
            { text:"修改密码", type:'password',leaf: true }
        ]
    }
});

Ext.define('Menu', {
	extend:'Ext.tree.Panel',
	alias:'widget.menu',
    title:'Simple Tree',
    width:200,
    height:150,
    store:MenuStore,
    rootVisible: false,
	listeners:{
		'itemclick':function(grid,rec){
			if(rec.get('type')=='password')
			{
				Ext.widget('password');
			}
		}
	}
});
