/**
 * Created by kukiss on 2015/4/10 0010.
 */

Ext.define('YzMobile.view.rain.RainWarn', {
    extend: 'Ext.Panel',
    xtype: 'rainwarn',

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
            '<td width="40%" style="border:1px solid #ccc;">{data.type}</td>',
            '<td width="60%" style="border:1px solid #ccc;">{[this.formatNull(values.data.value, values.data.zt)]}</td>',
            '</tr>',
            '</tpl>',
            '</table>',
            {
                formatNull: function (data, zt) {
                    if (data == '') {
                        return '--';
                    }
                    else if (zt == 'true') { // 预警的信息高亮红色显示
                        return '<span style="color: #ff0000; font-weight: 600;" >' + data + '</span>';
                    } else {
                        return data;
                    }
                }
            }
        )
    },

    // 填充数据
    fillData: function (record) {
        var me = this;

        if (!me.isLoad) {
            var store = Ext.getStore('NameValueStore');
            store.removeAll();

            Ext.data.proxy.SkJsonp.setUrl(localStorage.getItem('proxyUrl'));
            Ext.data.proxy.SkJsonp.loadStore(store, 'GetYqYjInfo', record.data.stcd + '$R$' + '1,' + (record.data.rain1h == '' ? '0' : record.data.rain1h) + '@' + '3,' + (record.data.rain3h == '' ? '0' : record.data.rain3h) + '@' + '24,' + (record.data.raintoday == '' ? '0' : record.data.raintoday),
                {
                    success: function () {
                        if (store.getAllCount()) {
                            me.setData(store.getData().all);
                        } else {
                            me.setHtml('<p class="no-searches" style="margin-top:50%;text-align:center;">没有详细字段</p>');
                        }
                    }
                });

            //Ext.Viewport.setMasked({xtype: 'loadmask', message: '加载中,请稍后...'});
            //
            //store.getProxy().setExtraParams({
            //    t: 'GetYqYjInfo',
            //    results: record.data.stcd + '$R$' + '1,' + (record.data.rain1h == '' ? '0' : record.data.rain1h) + '@' + '3,' + (record.data.rain3h == '' ? '0' : record.data.rain3h) + '@' + '24,' + (record.data.raintoday == '' ? '0' : record.data.raintoday)
            //});
            //
            //store.load(function (records, operation, success) {
            //    Ext.Viewport.setMasked(false);
            //
            //    if (!success) {
            //        plugins.Toast.ShowToast("网络不给力，无法读取数据!", 3000);
            //    } else {
            //        if (store.getAllCount()) {
            //            me.setData(store.getData().all);
            //        } else {
            //            me.setHtml('<p class="no-searches" style="margin-top:50%;text-align:center;">没有详细字段</p>');
            //        }
            //    }
            //    Ext.Viewport.setMasked(false);
            //});

            me.isLoad = true;
        }
    }
});