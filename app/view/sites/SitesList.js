Ext.define('MyApp.view.sites.SitesList', {
    extend: 'Ext.grid.Panel',
    alias:'widget.siteslist',
    height: 513,
    width: 769,
    title: '站点管理',
    store:'Sites',
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            columns: [
                {
                    xtype:'rownumberer'
                },
                {
                    xtype:'gridcolumn',
                    dataIndex:'site_name',
                    width:200,
                    text:'站点名称'
                },
                {
                    xtype:'gridcolumn',
                    dataIndex:'site_url',
                    flex:1,
                    text:'域名'
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
                            text: '添加',
                            iconCls:'add-button',
                            handler:function(){
                            	Ext.widget('addsite');
                            }
                        },
                        {
                            xtype: 'button',
                            iconCls:'edit-button',
                            text: '编辑',
                            handler:function(btn){
                            	var sel=btn.up('grid').getSelectionModel().getSelection();
                            	if(sel.length==0)
                            	{
                            		ExtAlert('请选择站点');
                            	}
                            	else
                            	{
                            		var win=Ext.widget('addsite',{
                            			title:'编辑站点'
                            		});
                            		
                            		win.down('form').getForm().loadRecord(sel[0]);
                            	}
                            }
                        },
                        {
                            xtype:'button',
                            text:'删除',
                            iconCls:'delete-button',
                            handler:function(btn){
                            	var sel=btn.up('grid').getSelectionModel().getSelection();
                            	if(sel.length==0)
                            	{
                            		ExtAlert('请选择站点');
                            	}
                            	else
                            	{
                            		Ext.Msg.confirm('信息提示','确定删除吗？',function(btn){
                            			if(btn=='yes')
                            			{
                            				var arr=[];
                            				Ext.Array.each(sel,function(item){
                            					arr.push(item.get('id'));
                            				});
                            				Ext.Ajax.request({
                            					url:'sites/delete_sites.php',
                            					params:{
                            						ids:arr.join(',')
                            					},
                            					success:function(res){
                            						ExtAlert(res.responseText);
                            						Ext.getCmp('siteslist').getStore().load();
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
                    width: 360,
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