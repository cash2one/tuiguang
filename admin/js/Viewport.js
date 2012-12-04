/**********************************
*
* 后台主界面
*
**********************************/

Ext.define('Viewport', {
	extend:'Ext.container.Viewport',
	alias:'widget.viewport',
    layout: 'border',
    items: [{
        region: 'north',
        html: '<h1 class="logo">百度推广关键词排名跟踪-系统后台</h1>',
        autoHeight: true,
		bodyStyle:'background-color:#003E73',
        border: false,
        margins: '0 0 5 0',
		dockedItems:[
			{
				xtype:'toolbar',
				items:[
					{
						icon:'../img/flag.png',
						text:'我们致力于让网络推广更简单、高效'
					},
					'->',
					{
						xtype:'button',
						text:"欢迎你，<span class='red'>超级管理员</span>"
					},
					{
						text:'退出',
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
		split:true,
		xtype:'menu',
        title: '导航菜单',
        width: 150
        // could use a TreePanel or AccordionLayout for navigational items
    }, {
        region: 'south',
		split:'true',
        xtype:'toolbar',
        items:[
			'->',
			{
				text:'天津九胜网络 2012 版权所有 All Rights Reserved'
			},
			'->'
		]
    }, {
        region: 'center',
        xtype: 'tabpanel', // TabPanel itself has no title
        activeTab: 0,      // First tab active by default
        items: {
            xtype:'stuffsgrid'
        }
    }]
});

