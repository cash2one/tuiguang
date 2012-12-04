Ext.define('MyApp.view.StuffName', {
    extend: 'MyApp.view.utils.AppWindow',
    alias:'widget.stuffname',
    width: 356,
    layout: {
        type: 'fit'
    },
    title: '企业名称设置',
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
                            xtype: 'textfield',
                            fieldLabel: '企业名称',
                            labelWidth: 60,
                            name:'stuff_name',
                            id:'stuff_name',
                            value:'数据读取中...',
                            allowBlank:false,
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
                                    	win=btn.up('window');
                                    	if(form.isValid())
                                    	{
                                    		form.submit({
                                    			url:'setup_stuffname.php',
                                    			waitMsg:'正在提交...',
                                    			success:function(form,action){
                                    				ExtAlert(action.result.msg);
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
                                    action:'cancel',
                                    text: '取消'
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },
    listeners:{
    	'render':function(){
    		Ext.Ajax.request({
    			url:'get_general_info.php?type=stuffname',
    			success:function(res)
    			{
    				Ext.getCmp('stuff_name').setValue(res.responseText);
    			}
    		});
    	}
    }

});