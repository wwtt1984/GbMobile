/**
 * Created by USER on 14-8-13.
 */

Ext.define('YzMobile.view.Function', {
    extend: 'Ext.Panel',
    xtype: 'functionmain',

    requires: [
        'YzMobile.view.Title',
        'Ext.dataview.List',
        'YzMobile.view.Load'
    ],
    config: {
        itemId:'vFunction',
        layout: 'fit',
        items: [
            {
                xtype: 'maintitle',
                width: '100%',
                height: '100px',
                docked: 'top'
            },
            {
                xtype: 'list',
                id: 'functionlist',
                store: 'FunctionStore',
                cls: 'grid',
                scrollable: {
                    direction: 'vertical',
                    directionLock: true
                },
                itemTpl: Ext.create('Ext.XTemplate',
                    '<div class="movie">',
                    '<div class="img" style="background-image: url({url})"></div>',
                    '<div class="title">{title}</div>',
                    '</div>'
                )
            },{
                xtype:'panel',
                docked:'bottom',
                html:'<div style="width: 100%; height: 100%; text-align: center; background-color: #ffffff">Copyright©:杭州定川信息技术有限公司</div>'
            }
        ]
    }
});