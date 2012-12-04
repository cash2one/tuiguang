Ext.define('Login', {
    extend: 'Ext.window.Window',
	alias:'widget.login',
    width: 403,
    layout: {
        type: 'vbox',
		align:'stretch'
    },
    title: '用户登录',
	autoShow:true,
	border:false,
	closable:false,
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
				{
					xtype:'image',
					src:'img/login_banner.png',
					height:60
				},
                {
                    xtype: 'form',
                    bodyPadding: 10,
                    title: '',
					flex:1,
					defaults:{
						allowBlank:false
					},
                    items: [
						{
							xtype:'hiddenfield',
							name:'submitted',
							value:1
						},
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            height: 50,
							name:'username',
                            fieldLabel: '用户名',
                            labelAlign: 'top',
                            labelWidth: 60
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            height: 50,
                            fieldLabel: '密码',
							name:'password',
							inputType:'password',
                            labelAlign: 'top',
                            labelWidth: 60
                        },
                        {
                            xtype: 'container',
                            margin: '10 0 0 0',
                            items: [
                                {
                                    xtype: 'button',
                                    text: '登录',
									iconAlign:'top',
									padding:'5 15 5 15',
									iconCls:'safe-button',
									handler:function(btn){
										var form=btn.up('form').getForm();
										if(form.isValid())
										{
											form.submit({
												url:'prologin.php',
												waitMsg:'正在提交...',
												success:function(form,action){
													Ext.Msg.alert('信息提示',action.result.msg);
													location.href="index.php";
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
                                    text: '重置',
									iconAlign:'top',
									margin:'0 0 0 5',
									padding:'5 15 5 15',
									iconCls:'delete-button',
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