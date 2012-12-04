/**
 * 这是添加分类的界面
 */
Ext.define('MyApp.view.cates.AddCate', {
    extend: 'MyApp.view.utils.AppWindow',
    alias:'widget.addcate',
    width: 403,
    layout: {
        type:'fit'
    },
    title: '添加分类',
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
                            fieldLabel: '分类名',
                            name:'cate_name',
                            allowBlank:false,
                            labelWidth: 60,
                            anchor: '100%'
                        },
                        {
                            xtype: 'container',
                            margin: '10 0 0 65',
                            items: [
                                {
                                    xtype: 'button',
                                    iconCls:'add-button',
                                    text: '提交',
                                    handler:function(btn){
                                    	var form=btn.up('form').getForm();
                                    	var win=btn.up('window');
                                    	if(form.isValid())
                                    	{
                                    		form.submit({
                                    			url:'cates/add_cate.php',
                                    			waitMsg:'正在提交...',
                                    			success:function(form,action){
                                    				ExtAlert(action.result.msg);
                                    				Ext.getCmp('cateslist').getStore().load();
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
                                    iconCls:'delete-button',
                                    text: '取消',
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