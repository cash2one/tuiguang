Ext.define('MyApp.view.keywords.MarkKeywords', {
    extend: 'MyApp.view.utils.AppWindow',
    alias:'widget.markkeywords',
    width: 367,
    layout: {
        type: 'fit'
    },
    title: '移动关键词',
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
                            xtype: 'displayfield',
                            value: '',
							name:'knum',
                            fieldLabel: '选中了',
                            labelWidth: 60,
                            anchor:'100%'
                        },
						{
							xtype:'hiddenfield',
							name:'ids'
						},
                        {
                            xtype: 'combobox',
                            fieldLabel: '标记为',
                            labelWidth: 60,
                            anchor: '100%',
							name:'mark',
							allowBlank:false,
							editable:false,
							valueField:'value',
							displayField:'label',
							store:{
								fields:['value','label'],
								data:[
									{value:'1',label:'好'},
									{value:'2',label:'中'},
									{value:'3',label:'差'}
								]
							}
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
										var win =btn.up('window');
										if(form.isValid())
										{
											form.submit({
												url:'keywords/mark_keywords.php',
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
    }

});