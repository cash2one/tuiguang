// JavaScript Document
//主界面
Ext.define('MyApp.view.Viewport', {
	extend:'Ext.container.Viewport',
	alias:'widget.viewport',
    layout: 'border',
    items: [{
        region: 'north',
        html:"<h1 class='logo'>百度推广关键词排名跟踪系统</h1>",
		bodyStyle:'background-color:#2567A8',
        margins: '0 0 5 0',
		dockedItems:[
			{
				xtype:'toolbar',
				//dock:'bottom',
				items:[
					{
						xtype:'button',
						icon:'img/flag.png',
						text:'我们致力于让网络推广更简洁、高效，欢迎使用！'
					},
					'->',
					{
						xtype:'button',
						id:'username'
					},
					{
						xtype:'button',
						id:'stuffindex'
					},
					{
						xtype:'button',
						id:'stuffname'
					},
					{
						xtype:'button',
						text:'退出',
						icon:'img/logout.png',
						handler:function(btn){
							Ext.Msg.confirm('信息提示','确定退出吗？',function(button){
								if(button=='yes')
								{
									Ext.Ajax.request({
										url:'exit.php',
										success:function(){
											Ext.Msg.alert('信息提示','退出成功');
											location.reload();
										}
									});
								}
							});
						}
					}
				]
			}			 
		]
    }, {
        region: 'west',
        collapsible: true,
        title: '导航菜单',
		split:true,
		layout:'fit',
        width: 150,
		xtype:'treepanel',
		store:'Menus',
		singleExpand:true,
		rootVisible:false,
		listeners:{
			'itemclick':function(panel,rec){
				var xtype=rec.get('xtype');
				if(xtype=='changepassword')
				{
					Ext.widget('changepassword');
				}
				else
				{
					var tab=Ext.getCmp('tabpanel');
					if(!rec.get('children'))	
					{
						if(Ext.getCmp(xtype))
						{
							tab.setActiveTab(xtype);
						}
						else
						{
							tab.add({
								xtype:xtype,
								id:xtype
							});
							
							tab.setActiveTab(xtype);
						}
					}
				}
			}	
		}
        // could use a TreePanel or AccordionLayout for navigational items
    }, {
        region: 'south',
		xtype:'toolbar',
		split:true,
		items:[
			'->',
			{
				xtype:'button',
				text:'开发者：天津九胜网络 2012 All Rights Reserved 业务合作：crazymus@foxmail.com'
			},
			'->'
		]
    },{
        region: 'center',
        xtype: 'tabpanel', 
		id:'tabpanel',// TabPanel itself has no title
        activeTab: 0, // First tab active by default
		items:[
			{
				title: '关键词列表',
				xtype:'keywordslist',
				id:'keywordslist'	
			}	   
		]
    }]
});