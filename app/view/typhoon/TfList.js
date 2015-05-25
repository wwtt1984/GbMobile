/**
 * Created by USER on 14-5-9.
 */

Ext.define('YzMobile.view.typhoon.TfList', {
    extend: 'Ext.List',

    xtype: 'tflist',

    requires: [
        'Ext.plugin.PullRefresh'
    ],

    config: {
        title: '台风列表',

        loadingText: '努力加载中...',
        scrollToTopOnRefresh: false,

        plugins: [
            {
                xclass: 'Ext.plugin.PullRefresh',
                pullText: '下拉刷新...',

                releaseText: '松开进行刷新...',

                loadingText: '正在刷新...',

                loadedText: '刷新完成.',

                lastUpdatedText: '刷新时间:&nbsp;'
            }
        ],

        cls: 'tidelist',
        store: 'TfStore',
        grouped: true,
        itemTpl: [
            '<div style="line-height:2.2em;float:left;width:25%;text-align:center;"><strong>{tfname}</strong></div>',
            '<div style="line-height:2.2em;float:left;width:40%;text-align:center;">{tfbh}</div>',
            '<div style="line-height:2.2em;float:left;width:35%;text-align:center;">{tfactive}</div>'
        ].join('')
    }

});


