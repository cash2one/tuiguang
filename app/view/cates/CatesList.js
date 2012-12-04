/**
 * 这是分类列表的界面
 */

Ext.define('MyApp.view.cates.CatesList', {
    extend: 'Ext.grid.Panel',
    alias:'widget.cateslist',
    height: 513,
    width: 769,
    title:'分类管理',
    store:'Cates',
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'cate_name',
                    flex:1,
                    text: '分类名'
                }
            ],
            viewConfig: {

            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            iconCls:'add-button',
                            text: '添加',
                            handler:function(){
                            	Ext.widget('addcate');
                            }
                        },
                        '-',
                        {
                            xtype: 'button',
                            iconCls:'edit-button',
                            text: '编辑',
                            handler:function(btn){
                            	var sel=btn.up('grid').getSelectionModel().getSelection();
                            	if(sel.length==0)
                            	{
                            		ExtAlert('请选择关键词');
                            	}
                            	else
                            	{
                            		var win=Ext.widget('addcate',{
                            			title:'编辑分类'
                            		});
                            		win.down('form').loadRecord(sel[0]);
                            	}
                            }
                        },
                        '-',
                        {
                            xtype: 'button',
                            iconCls:'delete-button',
                            text: '删除',
                            handler:function(btn){
                            	var sel=btn.up('grid').getSelectionModel().getSelection();
                            	if(sel.length==0)
                            	{
                            		ExtAlert('请选择关键词');
                            	}
                            	else
                            	{
                            		Ext.Msg.confirm('信息提示','确认删除吗？',function(btn){
                            			if(btn=='yes')
                            			{
                            				var arr=[];
                            				Ext.Array.each(sel,function(item){
                            					arr.push(item.get('id'));
                            				});
                            				
                            				Ext.Ajax.request({
                            					url:'cates/delete_cates.php',
                            					params:{
                            						ids:arr.join(',')
                            					},
                            					success:function(res){
                            						ExtAlert(res.responseText);
                            						Ext.getCmp('cateslist').getStore().load();
                            					},
                            					failure:function(){
                            						ExtAlert('请求失败');
                            					}
                            				});
                            			}
                            		});
                            	}
                            }
                        }
                    ]
                },
                {
                    xtype: 'pagingtoolbar',
                    store:'Cates',
                    displayInfo: true,
                    dock: 'bottom'
                }
            ],
            selModel: Ext.create('Ext.selection.CheckboxModel', {

            })
        });

        me.callParent(arguments);
    }

});