/**
 * Created by xiaona on 14-1-13.
 */

Ext.define('YzMobile.view.settings.Setting', {
    extend: 'Ext.Panel',
    xtype: 'setting',
    requires: [
        'Ext.app.Route'
    ],

    config: {
        title: '系统设置',

        items:[
            //{
            //    xtype: 'list',
            //    cls: 'setting',
            //    itemId: 'settinglist',
            //    scrollable: false,
            //    height: '80%',
            //    ui: 'round',
            //    store: 'SettingStore',
            //    itemTpl: '<div>{title}<img src="resources/images/code3.png" style="height:18px;width:18px;margin:2px 0 0 0;float:right;"></div>'
            //},
            {
                xtype: 'panel',
                docked: 'bottom',
                style: 'background-color:none !important;margin:0 13px 20px 13px;',
                defaults: {
                    xtype : 'button',
                    width: '100%'
                },
                items: [
                    {
                        text: '切换用户',
                        style: 'height: 2.2em;margin:0 0 20px 0;',
                        itemId: 'changeuser'
                    },
                    {
                        text: '退出系统',
                        style: 'color:white;height: 2.2em;background-color: #c70505;background-image: -moz-linear-gradient(top, #f91f1f, #e00606 3%, #ae0404);background-image: -o-linear-gradient(top, #f91f1f, #e00606 3%, #ae0404);background-image: linear-gradient(top, #f91f1f, #e00606 3%, #ae0404);background-image: -webkit-linear-gradient(top, #f91f1f, #e00606 3%, #ae0404);',
                        itemId: 'sysquit',
                        hidden:true
                    }
                ]
            }
        ]
    }
});