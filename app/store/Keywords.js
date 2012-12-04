/**
 * 这是关键词的store
 */
Ext.define('MyApp.store.Keywords', {
	extend:'Ext.data.Store',
    model: 'MyApp.model.Keyword',
    proxy: {
        type: 'ajax',
        url : 'keywords/list_keywords.php',
        reader: {
            type: 'json',
            root: 'root'
        }
    },
	pageSize:50,
    autoLoad: true,
	listeners:{
		'beforeload':function(){
			var me=this;
			Ext.apply(me.proxy.extraParams,{
				keyword:Ext.getCmp('keyword').getValue(),
				cate_id:Ext.getCmp('cate_id').getValue(),
				mark:Ext.getCmp('mark').getValue()
			});
			
			Ext.Ajax.request({
			url:'get_general_info.php?type=all',
			success:function(res){
					var obj=Ext.decode(res.responseText);
					Ext.getCmp('username').setText('欢迎你，'+"<span class='red'>"+obj.username+"</span>");
					Ext.getCmp('stuffindex').setText('企业编号：'+"<span class='red'>"+obj.stuff_index+"</span>");
					Ext.getCmp('stuffname').setText('企业名称：'+"<span class='red'>"+obj.stuff_name+"</span>");
					Ext.getCmp('k_num').setText('关键词数量：'+"<span class='red'>"+obj.k_num+"</span>");
					Ext.getCmp('top_num').setText('顶部：'+"<span class='red'>"+obj.top_num+"</span>");
					Ext.getCmp('right_num').setText('右侧：'+"<span class='red'>"+obj.right_num+"</span>");
					Ext.getCmp('rest_num').setText('无排名：'+"<span class='red'>"+obj.rest_num+"</span>");
				}
			});
		}
	}
});