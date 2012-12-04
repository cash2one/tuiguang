//这是批量上传关键词的界面
Ext.define('MyApp.view.keywords.AddBatKeywords', {
    extend: 'MyApp.view.utils.AppWindow',
	alias:'widget.addbatkeywords',
    width: 400,
    layout: {
        type: 'fit'
    },
    title: '批量上传关键词',
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
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'label',
                                    margin: '',
                                    text: '一、请先下载制定格式的Excel文件'
                                },
                                {
                                    xtype: 'button',
                                    margin: '0 0 0 10',
                                    text: '点击下载',
									handler:function(){
										window.open('file/batkeywords.xls');
									}
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '10 0 0 0 ',
                            items: [
                                {
                                    xtype: 'label',
                                    text: '二、请严格按照格式填写关键词'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '15 0 0  0',
                            items: [
                                {
                                    xtype: 'label',
                                    text: '三、上传Excel'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '10 0 0 0',
                            layout: {
                                type: 'fit'
                            },
                            items: [
                                {
                                    xtype: 'filefield',
                                    fieldLabel: '选择文件',
									name:'bat',
									allowBlank:false,
									buttonConfig:{
										text:'选择...'
									},
                                    labelWidth: 60
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '5 0 0 0',
                            layout: {
                                type: 'fit'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: '上传到',
									allowBlank:false,
									name:'cate_id',
                                    labelWidth:60,
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
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '15 0 0 0',
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
												url:'keywords/add_keywords_bat.php',
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