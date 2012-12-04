/************************************************
*
* 添加用户界面
*
*************************************************/
Ext.define('AddUser', {
    extend: 'Ext.window.Window',
	alias:'widget.adduser',
    width: 404,
    layout: {
        type: 'fit'
    },
    title: '添加用户',
	border:false,
	modal:true,
	autoShow:true,
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    bodyPadding: 10,
                    title: '',
					defaults:{
						allowBlank:false
					},
                    items: [
						{
							xtype:'hiddenfield',
							name:'id'
						},
                        {
                            xtype: 'textfield',
                            anchor: '100%',
							name:'username',
                            fieldLabel: '用户名',
                            labelWidth: 60
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
							name:'password',
                            fieldLabel:'密码',
                            labelWidth: 60
                        },
                        {
                            xtype: 'combobox',
                            anchor: '100%',
							name:'status',
                            fieldLabel: '状态',
							valueField:'value',
							displayField:'label',
                            labelWidth: 60,
							store:{
								fields:['value','label'],
								data:[
									{value:'0',label:'冻结'},
									{value:'1',label:'正常'}
								]
							}
                        },
						{
							xtype:'hiddenfield',
							name:'stuff_id'
						},
                        {
                            xtype: 'displayfield',
                            anchor: '100%',
							name:'stuff_name',
                            fieldLabel:'所属企业',
                            labelWidth:60
                        },
                        {
                            xtype: 'container',
                            margin: '10 0 0 65',
                            items:[
                                {
                                    xtype: 'button',
                                    text: '提交',
									iconCls:'add-button',
									handler:function(btn){
										var form=btn.up('form').getForm();
										if(form.isValid())
										{	
											form.submit({
												url:'stuffs/add_user.php',
												waitMsg:'正在提交...',
												success:function(form,action){
													Ext.Msg.alert('信息提示',action.result.msg);
													var grid=Ext.getCmp('usersgrid');
													grid.getStore().load({
														params:{
															stuff_id:grid.up('window').stuff_id
														}
													});
													btn.up('window').close();
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
                                    text: '取消',
									iconCls:'delete-button',
									handler:function(btn){
										btn.up('window').close();
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

/**********************************************
*
* 企业用户列表数据池
*
**********************************************/

Ext.define('User', {
    extend: 'Ext.data.Model',
    fields: [
		'id',
		'username',
		'status',
		'stuff_id'
    ]
});

var Users= Ext.create('Ext.data.Store', {
    model:'User',
    proxy: {
        type: 'ajax',
        url : 'stuffs/list_users.php',
        reader: {
            type: 'json',
            root: 'root'
        }
    }
});

/************************************************
*
* 企业用户列表
*
************************************************/

Ext.define('UsersGrid', {
    extend: 'Ext.grid.Panel',
	alias:'widget.usersgrid',
    height:400,
    width: 800,
	id:'usersgrid',
	store:Users,
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            columns: [
				{
					xtype:'rownumberer'
				},
                {
                    xtype:'gridcolumn',
                    dataIndex: 'username',
                    text: '用户名',
					width:200
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'status',
					renderer:function(val){
						return val=='1'?'正常':"<span class='red'>冻结</span>";
					},
					flex:1,
                    text: '状态'
                }
            ],
            viewConfig: {

            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            text: '添加',
							iconCls:'add-button',
							handler:function(btn){
								var stuff_id  =btn.up('window').stuff_id;
								var stuff_name=btn.up('window').stuff_name;
								var win=Ext.widget('adduser');
								win.down('form').getForm().findField('stuff_id').setValue(stuff_id);
								win.down('form').getForm().findField('stuff_name').setValue(stuff_name);
							}
                        },
						'-',
                        {
                            xtype: 'button',
                            text: '编辑',
							iconCls:'edit-button',
							handler:function(btn){
								var sel=btn.up('grid').getSelectionModel().getSelection();
								if(sel.length==0)
								{
									Ext.Msg.alert('信息提示','请选择用户');
								}
								else
								{
									var win=Ext.widget('adduser');
									var stuff_id  =btn.up('window').stuff_id;
									var stuff_name=btn.up('window').stuff_name;
									win.down('form').getForm().loadRecord(sel[0]);
									win.down('form').getForm().findField('password').allowBlank=true;
									win.down('form').getForm().findField('stuff_id').setValue(stuff_id);
									win.down('form').getForm().findField('stuff_name').setValue(stuff_name);
								}
							}
                        },
						'-',
                        {
                            xtype: 'button',
                            text: '删除',
							iconCls:'delete-button',
							handler:function(btn){
								var sel=btn.up('grid').getSelectionModel().getSelection();
								if(sel.length==0)
								{
									Ext.Msg.alert('信息提示','请选择用户');
								}
								else
								{
									Ext.Msg.confirm('信息提示','确认删除吗？',function(button){
										if(button=='yes')
										{
											var arr=[];
											Ext.Array.each(sel,function(item){
												arr.push(item.get('id'));
											});
											
											Ext.Ajax.request({
												url:'stuffs/delete_users.php',
												params:{
													ids:arr.join(',')
												},
												success:function(res){
													Ext.Msg.alert('信息提示',res.responseText);
													var grid=Ext.getCmp('usersgrid');
													grid.getStore().load({
														params:{
															stuff_id:grid.up('window').stuff_id
														}
													});
												},
												failure:function(res){
													Ext.Msg.alert('信息提示','请求失败');
												}
											});
										}
									});
								}
							}
                        }
                    ]
                }
            ],
            selModel: Ext.create('Ext.selection.CheckboxModel', {

            })
        });

        me.callParent(arguments);
    },
	listeners:{
		'render':function(grid){
			var stuff_id=grid.up('window').stuff_id;
			grid.getStore().load({
				params:{
					stuff_id:stuff_id
				}
			});
		}
	}

});