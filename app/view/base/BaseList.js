/**
 * Created by USER on 14-8-15.
 */

Ext.define('YzMobile.view.base.BaseList', {
    extend: 'Ext.List',
    xtype: 'baselist',

    requires: [
    ],

    config: {

        title: '基本信息',
        cls: 'setting',

        ui: 'round',

        loadingText: false,
        grouped: false,

        masked: {
            xtype: 'loadmask',
            message: '努力加载中...'
        },

        itemTpl: [
            '<div>{xzmc}({adcd})' +
                '<img src="resources/images/code3.png" style="height:18px;width:18px;margin:2px 0 0 0;float:right;"></div>'
        ],

        store: 'BaseStore'
    }
});