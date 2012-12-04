Ext.define('MyApp.view.sites.AddSite', {
    extend: 'MyApp.view.utils.AppWindow',
    alias:'widget.addsite',
    height: 139,
    width: 425,
    layout: {
        type: 'fit'
    },
    title: '添加站点',
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    bodyPadding: 10,
                    title: '',
                    items: [
                        {
                        	xtype:'hiddenfield',
                        	name:'id'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '站点名',
                            name:'site_name',
                            labelWidth: 60,
							allowBlank:false,
                            anchor: '100%'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '域名',
                            name:'site_url',
							allowBlank:false,
							emptyText:'不需要http://www.',
                            labelWidth: 60,
                            anchor: '100%'
                        },
                        {
                            xtype: 'container',
                            margin: '10 0 0 65',
                            items: [
                                {
                                    xtype: 'button',
                                    text: '提交',
                                    iconCls:'add-button',
                                    handler:function(btn){
                                    	var form=btn.up('form').getForm();
                                    	var win=btn.up('window');
                                    	if(form.isValid())
                                    	{
                                    		form.submit({
                                    			url:'sites/add_site.php',
                                    			waitMsg:'正在提交...',
                                    			success:function(form,action){
                                    				ExtAlert(action.result.msg);
                                    				Ext.getCmp('siteslist').getStore().load();
                                    				win.close();
                                    			},
                                    			failure:function(form,action){
                                    				ExtAlert(action.result.msg);
                                    			}
                                    		});
                                    	}
                                    }
                                },
                                {
                                    xtype: 'button',
                                    margin: '0 0 0 5',
                                    text: '取消',
                                    iconCls:'delete-button',
                                    action:'cancel'
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});