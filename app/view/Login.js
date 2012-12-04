// JavaScript Document
//这是用户登录的界面
Ext.define('MyApp.view.Login', {
    extend: 'Ext.window.Window',
	alias:'widget.login',
    width: 397,
    layout: {
        type: 'fit'
    },
    title: '百度推广关键词排名跟踪系统',
	autoShow:true,
	modal:true,
	border:false,
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
                            fieldLabel: '用户名',
							name:'username',
							allowBlank:false,
                            labelWidth: 60,
                            anchor: '100%'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '密码',
							name:'password',
							allowBlank:false,
							inputType:'password',
                            labelWidth: 60,
                            anchor: '100%'
                        },
                        {
                            xtype: 'container',
                            margin: '10 0 0 65',
                            items: [
                                {
                                    xtype: 'button',
									icon:'img/safe.png',
                                    text: '登录',
									handler:function(btn){
										var form=btn.up('form').getForm();
										if(form.isValid())
										{
											form.submit({
												url:'prologin.php',
												waitMsg:'正在提交...',
												success:function(form,action){
													Ext.Msg.alert('信息提示','登陆成功,正在跳转...');
													
												},
												failure:function(form,action){
													
												}
											});	
										}
									}
                                },
                                {
                                    xtype: 'button',
                                    margin: '0 0 0 5',
									icon:'img/reset.png',
                                    text: '重置',
									handler:function(btn){
										var form=btn.up('form').getForm();
										form.reset();
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