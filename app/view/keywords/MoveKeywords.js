Ext.define('MyApp.view.keywords.MoveKeywords', {
    extend: 'MyApp.view.utils.AppWindow',
	alias:'widget.movekeywords',
    width: 365,
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
                            fieldLabel: '移动到',
							name:'cate_id',
                            labelWidth: 60,
                            anchor: '100%',
							allowBlank:false,
							editable:false,
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
								}
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
												url:'keywords/move_keywords.php',
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