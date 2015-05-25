/**
 * Created by USER on 14-4-28.
 */

Ext.define('YzMobile.view.Site', {
    extend: 'Ext.List',
    xtype: 'site',

    config: {

        title: '雨情信息',

        loadingText: false,
        scrollToTopOnRefresh: false,

        masked: {
            xtype: 'loadmask',
            message: '努力加载中...'
        },
        cls: 'tidelist',
        store: 'SiteStore',

        emptyText: '<p class="no-searches">没有符合要求的记录</p>',

        itemTpl: [
            '<span style="font-size: 16px; line-height: 3em; margin-left: 16px;">{ScityName}</span>'
        ],
        items:[
            {
                xtype:'toolbar',
                docked:'top',
                ui:'light',
                title:'选择地区',
                items: [
                    {xtype:'button', text:'返回', itemId:'site_back', ui:'back'}
                ]
            }
        ]
    }
});