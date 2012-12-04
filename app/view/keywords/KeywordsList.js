Ext.define('MyApp.view.keywords.KeywordsList', {
    extend: 'Ext.grid.Panel',
	alias:'widget.keywordslist',
    height:'100%',
    width:'100%',
    title:'关键词列表',
    store:'Keywords',
	id:'keywordslist',
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            columns: [
                {
                    xtype: 'rownumberer',
					resizable:true
                },
                {
                	xtype:'actioncolumn',
                	width:40,
                	items:[
					   {
						   icon:'img/baidu.png',
						   iconCls:'action-img',
						   tooltip:'在百度中查看',
						   handler:function(grid,row){
							  var rec=grid.getStore().getAt(row);
							   var keyword=encodeURIComponent(rec.get('keyword'));
							   ExtOpenLocal("keywords/getBaidu.php?wd="+keyword,{
								  title:rec.get('keyword'),
								  width:920
							   });
						   }
					   }
                	]
                },
				{
					xtype:'gridcolumn',
					dataIndex:'mark',
					width:30,
					renderer:function(val){
						if(val==1)
						{
							return "<span class='green' >好</span>";
						}
						else if(val==2)
						{
							return "<span class='gray' >中</span>";
						}
						else if(val==3)
						{
							return "<span class='red' >差</span>";
						}
					}
				},
                {
                    xtype: 'gridcolumn',
                    dataIndex:'keyword',
                    flex:1,
                    text: '关键词'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex:'cate_name',
                    text: '所属分类'
                },
                {
                    xtype: 'gridcolumn',
                    text: '推广排名分布',
                    columns:[
                            {
                            	xtype:'gridcolumn',
                            	width:200,
								dataIndex:'top_ranks',
                            	text:'顶部'
                            },
                            {
                            	xtype:'gridcolumn',
                            	width:200,
								dataIndex:'right_ranks',
                            	text:'右侧'
                            }
                    ]
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
							handler:function(){
								Ext.widget('addkeyword');
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
									ExtAlert('请选择关键词');
								}
								else
								{
									var win=Ext.widget('addkeyword',{
										title:'编辑关键词'
									});
									win.down('form').getForm().loadRecord(sel[0]);
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
									ExtAlert('请选择关键词');
								}
								else
								{
									Ext.Msg.confirm('信息提示','确定删除吗？',function(btn){
										if(btn=='yes')
										{
											var arr=[];
											Ext.Array.each(sel,function(item){
												arr.push(item.get('id'));
											});
											
											Ext.Ajax.request({
												url:'keywords/delete_keywords.php',
												params:{
													ids:arr.join(',')
												},
												success:function(res){
													ExtAlert(res.responseText);
													Ext.getCmp('keywordslist').getStore().load();
												},
												failure:function(){
													ExtAlert('请求失败');
												}
											});
										}
									});
								}
							}
                        },
                        '-',
                        {
                        	xtype:'button',
                        	text:'企业名称设置',
                        	icon:'img/site.png',
                        	handler:function(){
                        		Ext.widget('stuffname');
                        	}
                        },
						'-',
                        {
                        	xtype:'tool',
                        	type:'help',
                        	handler:function(){
                        		Ext.widget('tipwindow',{
                        			html:'这是用来匹配搜索结果的，只要匹配到该名称或站点管理里的任意站点，就会认定为自身站点的排名'
                        		});
                        	}
                        },
                        '-',
                        {
                        	xtype:'button',
                        	icon:'img/search.png',
                        	text:'查询推广排名',
                        	handler:function(btn){
                        		var sel=btn.up('grid').getSelectionModel().getSelection();
                        		if(sel.length==0)
                        		{
                        			Ext.Msg.alert('信息提示','请选择关键词');
                        		}
                        		else
                        		{
                        			Ext.widget('window',{
                        				width:600,
                        				height:500,
                        				title:'正在查询...',
                        				bodyPadding:10,
                        				bodyStyle:"background-color:white;",
                        				autoShow:true,
                        				html:"<div id='loading' style='height:480px;overflow:scroll;'></div>",
										listeners:{
											'close':function(){
												Ext.getCmp('keywordslist').getStore().load();
											}
										}
                        			});
                        			
                        			//id数组
                        			var arr1=[];
                        			
                        			//关键词数组
                        			var arr2=[];
                        			Ext.Array.each(sel,function(item){
                        				arr1.push(item.get('id'));
                        				arr2.push(item.get('keyword'));
                        			});
                        			
                        			for(var i=0;i<arr1.length;i++)
                        			{
                        				var index  =i;
										var id     =arr1[i];
                        				var keyword=arr2[i];
                        				$('#loading').append("<p id='p"+index+"'>"+keyword+"<span><img src='img/loading.gif' /></span></p>");
                        				$.post('keywords/get_ranks.php',{index:index,id:id,keyword:keyword},function(data){
                        					var obj=Ext.decode(data);
											//alert(obj.index);
											//alert(obj.index);
                        					$('#p'+obj.index).html(obj.keyword+"<span><img src='img/ok.png' /></span>");
                        				})
                        			}
                        		}
                        	}
                        },
						'->',
						{
							text:'关键词数量'+"<span class='red'> 234 </span>",
							id:'k_num',
							icon:'img/keyword.png'
						},
						'-',
						{
							text:'当前排名分布：',
							icon:'img/status.png'
						},
						'-',
						{
							text:'顶部'+"<span class='red'> 22 </span>"+'个',
							id:'top_num',
							icon:'img/top.png'
						},
						'-',
						{
							text:'右侧'+"<span class='red'> 30 </span>"+'个',
							id:'right_num',
							icon:'img/right.png'
						},
						'-',
						{
							text:'无排名',
							id:'rest_num',
							icon:'img/none.png'
						}
                    ]
                },
                {
                    xtype: 'pagingtoolbar',
                    store:'Keywords',
                    displayInfo: true,
                    dock: 'bottom'
                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            text: '批量上传',
							iconCls:'upload-button',
							handler:function(){
								Ext.widget('addbatkeywords');
							}
                        },
						'-',
                        {
                            xtype: 'button',
                            text: '移动关键词',
							iconCls:'move-button',
							handler:function(btn){
								var sel=btn.up('grid').getSelectionModel().getSelection();
								if(sel.length==0)
								{
									ExtAlert('请选择关键词');
								}
								else
								{
									var arr=[];
									Ext.Array.each(sel,function(item){
										arr.push(item.get('id'));
									});
									
									var ids=arr.join(',');
									var num=arr.length;
									
									var win=Ext.widget('movekeywords');
									var form=win.down('form').getForm();
									form.findField('knum').setValue('选中了'+num+'个关键词');
									form.findField('ids').setValue(ids);
									
								}
								
							}
                        },
						'-',
                        {
                            xtype: 'button',
                            text: '标记关键词',
							iconCls:'mark-button',
							handler:function(btn){
								var sel=btn.up('grid').getSelectionModel().getSelection();
								if(sel.length==0)
								{
									ExtAlert('请选择关键词');
								}
								else
								{
									var arr=[];
									Ext.Array.each(sel,function(item){
										arr.push(item.get('id'));
									});
									var win=Ext.widget('markkeywords');
									var knum=arr.length;
									var ids=arr.join(',');
									var form=win.down('form').getForm();
									
									form.findField('knum').setValue('选中了'+knum+'个关键词');
									form.findField('ids').setValue(ids);
								}
								
							}
                        },
						'-',
						{
							text:'导出Excel',
							icon:'img/excel.png',
							handler:function(){
								Ext.widget('outputkeywords');
							}
						},
						'-',
						{
							xtype:'button',
							text:'重置列表',
							icon:'img/refresh.png',
							handler:function(){
								Ext.getCmp('keyword').setValue('');
								Ext.getCmp('cate_id').setValue('');
								Ext.getCmp('mark').setValue('');
								
								Ext.getCmp('keywordslist').getStore().load();
							}
						},
						'->',
                        {
                            xtype: 'textfield',
                            emptyText:'搜索关键词...回车',
							name:'keyword',
							id:'keyword',
							listeners:{
								'specialkey':function(field,e){
									if(e.getKey()==e.ENTER)
									{
										var val=field.getValue();
										
										Ext.getCmp('cate_id').setValue('');
										Ext.getCmp('mark').setValue('');
										
										Ext.getCmp('keywordslist').getStore().load();
									}
								}
							}
                        },
						'-',
                        {
                            xtype: 'combobox',
                            emptyText:'按分类查看',
                            id:'selectcate',
                            valueField:'id',
							name:'cate_id',
							id:'cate_id',
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
                            },
							listeners:{
								'select':function(field,recs){
									//alert(recs[0].getValue());
									var cate_id=recs[0].get('id');
										
									Ext.getCmp('keyword').setValue('');
									Ext.getCmp('mark').setValue('');
									
									Ext.getCmp('keywordslist').getStore().load();
								}
							}
                        },
						'-',
                        {
                            xtype: 'combobox',
                            emptyText:'按标记查看',
							name:'mark',
							id:'mark',
							allowBlank:false,
							valueField:'value',
							displayField:'label',
							store:{
								fields:['value','label'],
								data:[
									{value:'1',label:'好'},
									{value:'2',label:'中'},
									{value:'3',label:'差'}
								]
							},
							listeners:{
								'select':function(field,recs){
									var mark=recs[0].get('value');
									
									Ext.getCmp('keyword').setValue('');
									Ext.getCmp('cate_id').setValue('');
									
									Ext.getCmp('keywordslist').getStore().load();
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
    }

});// JavaScript Document