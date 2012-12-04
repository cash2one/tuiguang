//导出关键词的界面

Ext.define('MyApp.view.keywords.OutputKeywords', {
    extend: 'Ext.window.Window',
	alias:'widget.outputkeywords',
    width: 394,
    layout: {
        type: 'fit'
    },
    title: '导出关键词',
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
                            xtype:'combobox',
                            anchor:'100%',
                            fieldLabel:'选择分类',
                            labelWidth:60,
							name:'cate_id',
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
							xtype: 'radiogroup',
							fieldLabel: '导出选项',
							columns: 2,
							labelWidth:60,
							//vertical: true,
							name:'opt',
							items: [
								{ boxLabel: '全部', name: 'rb', inputValue: '1',checked: true},
								{ boxLabel: '顶部有排名', name: 'rb', inputValue: '2'},
								{ boxLabel: '右侧有排名', name: 'rb', inputValue: '3' },
								{ boxLabel: '无排名', name: 'rb', inputValue: '4' }
							]
						},
                        {
                            xtype:'checkboxfield',
                            anchor:'100%',
                            fieldLabel: '',
							name:'ifall',
                            labelWidth: 120,
                            boxLabel: '忽略分类，导出所有'
                        },
                        {
                            xtype: 'container',
                            margin: '20 0 0 0 ',
                            items: [
                                {
                                    xtype: 'button',
                                    text: '提交',
									iconCls:'add-button',
									handler:function(btn){
										var form=btn.up('form').getForm();
										var cate_id=form.findField('cate_id').getValue();
										var ifall=form.findField('ifall').getValue();
										var opt=form.findField('opt').getValue();
										if(cate_id || ifall)
										{
											if(ifall==true)
											{
												window.open('keywords/outputkeywords.php?cate_id=all&rb='+opt.rb);
											}
											else
											{
												window.open('keywords/outputkeywords.php?cate_id='+cate_id+"&rb="+opt.rb)
											}
										}
										else
										{
											Ext.Msg.alert('信息提示','请指定需要导出的内容');
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