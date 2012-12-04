//这是安装界面
Ext.define('Install', {
    extend: 'Ext.window.Window',
	alias:'widget.install',
    width: 574,
    layout: {
        type: 'fit'
    },
    title: '百度推广关键词排名跟踪系统-安装',
	autoShow:true,
	border:false,
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    bodyPadding: 10,
                    title: '',
					defaults:{
						margin:'5 0 0 0'
					},
                    items: [
                        {
                            xtype: 'container',
                            layout: {
                                align: 'middle',
                                type: 'hbox'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: '数据库地址',
									allowBlank:false,
									name:'dbhost',
                                    labelAlign: 'right',
									value:'localhost',
                                    flex: 2
                                },
                                {
                                    xtype: 'label',
                                    padding: '0 0 0 5',
                                    text: '一般不用修改',
                                    flex: 1
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {
                                align: 'middle',
                                type: 'hbox'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: '数据库账号',
									allowBlank:false,
									name:'dbuser',
                                    labelAlign: 'right',
                                    flex: 2
                                },
                                {
                                    xtype: 'label',
                                    padding: '0 0 0 5',
                                    text: '例如:root',
                                    flex: 1
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {
                                align: 'middle',
                                type: 'hbox'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: '数据库密码',
									allowBlank:false,
									name:'dbpass',
                                    labelAlign: 'right',
                                    flex: 2
                                },
                                {
                                    xtype: 'label',
                                    padding: '0 0 0 5',
                                    text: '',
                                    flex: 1
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {
                                align: 'middle',
                                type: 'hbox'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: '数据库名称',
									allowBlank:false,
									value:'tuiguang',
									name:'dbname',
                                    labelAlign: 'right',
                                    flex:2
                                },
                                {
                                    xtype: 'label',
                                    padding: '0 0 0 5',
                                    text: '若不存在将自动创建',
                                    flex: 1
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {
                                align: 'middle',
                                type: 'hbox'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: '管理员账号',
									allowBlank:false,
									name:'username',
                                    labelAlign: 'right',
                                    flex: 2
                                },
                                {
                                    xtype: 'label',
                                    padding: '0 0 0 5',
                                    text: '后台管理账号',
                                    flex: 1
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {
                                align: 'middle',
                                type: 'hbox'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: '管理员密码',
									allowBlank:false,
									name:'password',
                                    labelAlign: 'right',
                                    flex: 2
                                },
                                {
                                    xtype: 'label',
                                    padding: '0 0 0 5',
                                    text: '',
                                    flex: 1
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '10 0 0 105',
                            items: [
                                {
                                    xtype: 'button',
                                    iconAlign: 'top',
									iconCls:'add-button',
									width:60,
                                    text: '安装',
									handler:function(btn){
										var form=btn.up('form').getForm();
										if(form.isValid())
										{
											form.submit({
												url:'install.php',
												waitMsg:'正在提交...',
												success:function(form,action){
													Ext.widget('ok');
												},
												failure:function(form,action){
													Ext.Msg.alert('信息提示',action.result.msg);
												}
											});
										}
									}
                                },
                                {
                                    xtype: 'button',
                                    margin: '0 0 0 5',
                                    iconAlign: 'top',
									iconCls:'delete-button',
									width:60,
                                    text: '重置',
									handler:function(btn){
										btn.up('form').getForm().reset();
									}
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

//成功提示
Ext.define('OK', {
    extend: 'Ext.window.Window',
	alias:'widget.ok',
    width: 382,
    layout: {
        type: 'fit'
    },
    title: '信息提示',
	border:false,
	autoShow:true,
	modal:true,
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
                            xtype: 'label',
                            text: '安装成功！现在你可以：'
                        },
                        {
                            xtype: 'container',
                            margin: '10 0 5 0',
                            items: [
                                {
                                    xtype: 'button',
                                    text: '登录后台',
									iconCls:'safe-button',
									handler:function(){
										open('../admin/');
									}
                                },
                                {
                                    xtype: 'button',
                                    margin: '0 0 0 5',
                                    text: '登录前台',
									iconCls:'add-button',
									handler:function(){
										open('../login.php');
									}
                                }
                            ]
                        },
						{
							xtype:'label',
							text:'*应该先登录后台添加账户'
						}
                    ]
					
                }
            ]
        });

        me.callParent(arguments);
    }

});