Ext.define('MyApp.view.keywords.AddKeyword', {
    extend: 'MyApp.view.utils.AppWindow',
    alias:'widget.addkeyword',
    height: 139,
    width: 425,
    layout: {
        type: 'fit'
    },
    title: '添加关键词',
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items:[
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
                            fieldLabel: '关键词',
                            labelWidth: 60,
                            name:'keyword',
                            allowBlank:false,
                            anchor: '100%'
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: '所属分类',
                            labelWidth: 60,
                            name:'cate_id',
                            allowBlank:false,
                            anchor:'100%',
                            valueField:'id',
                            displayField:'cate_name',
                            store:{
                            	fields:['id','cate_name'],
                            	proxy:{
                            		type:'ajax',
                            		url:'cates/list_cates.php',
                            		reader:{
                            			type:'json',
                            			root:'root'
                            		}
                            	},
                            	autoLoad:true
                            }
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
                                    			url:'keywords/add_keyword.php',
                                    			waitMsg:'正在提交...',
                                    			success:function(form,action){
                                    				ExtAlert(action.result.msg);
                                    				win.close();
                                    				Ext.getCmp('keywordslist').getStore().load();
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