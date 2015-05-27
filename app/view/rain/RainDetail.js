/**
 * Created by kukiss on 2015/4/10 0010.
 */
Ext.define('YzMobile.view.rain.RainDetail', {
    extend: 'Ext.tab.Panel',
    xtype:'raindetail',

    //show: function () {
    //    Ext.ComponentQuery.query('#infofunction')[0].hide();
    //},

    config: {
        title: '雨情详细',
        tabBar: {
            layout: {pack: 'center'}
        },
        activeTab: 1,
        defaults: {
            scrollable: true
        },
        items: [
            {title: '雨量柱状图', xtype: 'rainbar', cls: 'card'},
            {title: '预警信息', xtype: 'rainwarn', cls: 'card'}
        ]
    }
});