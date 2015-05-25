/**
 * Created by xiaona on 14-1-13.
 */

Ext.define('WebInspect.view.settings.Version', {
    extend: 'Ext.Panel',
    xtype: 'version',

    requires: [

    ],

    config: {
        title: '软件版本',

//        items:[
//            {
//                xtype: 'fieldset',
//                title: '软件二维码(android版)',
//                defaults: {
//                    labelWidth: '40%'
//                },
//
//                items:[
//                    {
//                        xtype: 'image',
//                        height: 280,
//                        width: '100%',
//                        style: {
//                            "background-position": "0 0"
//                        },
//                        src: 'resources/images/qrcode.png'
//                    }
//                ]
//            }
//        ]

        style: 'background:#f7f7f7; padding: 10px;',

        tpl: Ext.create('Ext.XTemplate',
            '<div style="text-align:center;"><img src="resources/images/qrcode.png" style="height:200px; width: auto; padding:3px; border:1px #f7f7f7 solid;background:white;"/></div>',
            '<div style="text-align:center; width:100%; font-size:18px; height:2.2em; line-height:2.2em;">软件二维码(android版)</div>',
            '<div style="text-align:center; width:100%; color: #666; font-size:14px; height:2.2em; line-height:2.2em;">软件版本：{version}</div>',
            '<div style="text-align:center; width:100%; color: #666;font-size:14px; height:2.2em; line-height:2.2em;">杭州定川信息技术有限公司 版权所有</div>'
        )
    },

//    initialize: function(){
//        this.setData({});
//    },

    onDataSet: function(){
        var version = WebInspect.app.user.version;
        this.setData({version: version});
    }
});