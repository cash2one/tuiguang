/**
 * 这是关键词model
 */
Ext.define('MyApp.model.Keyword', {
    extend: 'Ext.data.Model',
    fields: [
       'id',
       'keyword',
       'cate_id',
       'cate_name',
	   'top_ranks',
	   'right_ranks',
	   'mark'
    ]
});