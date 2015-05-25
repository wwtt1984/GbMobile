/**
 * Created by kukiss on 2015/4/10 0010.
 */

Ext.define('YzMobile.view.rain.RainWarnFromPush', {
    extend: 'Ext.Panel',
    xtype: 'rainwarnpush',

    initialize: function () {
        this.isLoad = false; // 是否已经加载过一遍
    },

    requires: [
        'Ext.XTemplate'
    ],

    config: {
        itemId: 'rainWarn',
        title: 'TITLE',

        scrollable: {
            direction: 'vertical',
            directionLock: true
        },

        style: 'background-color: #f7f7f7;',

        styleHtmlContent: true,
        tpl: Ext.create('Ext.XTemplate',
            '<table width="100%">',
            '<tpl for=".">',
            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:16px;text-align:center;">',
            '<td width="40%" style="border:1px solid #ccc;">{type}</td>',
            '<td width="60%" style="border:1px solid #ccc;">{value]}</td>',
            '</tr>',
            '</tpl>',
            '</table>',
            {
                formatNull: function (data, zt) {
                    if (data == '') {
                        return '--';
                    }
                    else if (zt == 'false') { // 预警的信息高亮红色显示
                        return '<span style="color: #ff0000; font-weight: 600;" >' + data + '</span>';
                    } else {
                        return data;
                    }
                }
            }
        )
    },

    fillData: function (json) {
        var me = this;

        if (json) {
            me.setData(json);
        } else {
            me.setHtml('<p class="no-searches" style="margin-top:50%;text-align:center;">没有详细字段</p>');
        }
    }
});