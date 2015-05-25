/**
 * Created by kukiss on 2015/3/9 0009.
 */

Ext.define('YzMobile.view.project.ProjectMenu', {
    extend: 'Ext.List',
    xtype: 'projectmenu',

    requires: [
        'Ext.plugin.PullRefresh',
        'Ext.plugin.ListPaging',
        'YzMobile.store.ProjectMenuStore'
    ],

    config: {

        title: '工情信息',

        store: 'ProjectMenuStore',
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
    }
});