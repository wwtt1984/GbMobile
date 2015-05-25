/**
 * Created by kukiss on 2015/3/11 0011.
 */
Ext.define('YzMobile.view.project.ProjectMenuDetail', {
    extend: 'Ext.Panel',
    xtype: 'projectMenuDetail',

    requires: [
        'Ext.XTemplate'
    ],

    config: {
        title: '',

        scrollable: {
            direction: 'vertical',
            directionLock: true
        },

        style: 'background-color: #f7f7f7;',

        styleHtmlContent: true,
        tpl: Ext.create('Ext.XTemplate',
            '<table width="100%">',
            '<tpl for=".">',
            '<tr width="100%" style="height: 2.2em;line-height:3em;border:1px solid #ccc;font-size:14px;text-align:center;">',
            '<td width="40%" style="border:1px solid #ccc "><div style="font-weight: 700">{data.type}</div></td>',
            '<td width="60%" style="border:1px solid #ccc;">{[this.formatNull(values.data.value)]}</td>',
            '</tr>',
            '</tpl>',
            '</table>',
            {
                formatNull: function (data) {
                    if (data != '') {
                        return data;
                    }
                    else {
                        return '--';
                    }
                },
                getBorderFont:function(value){
                    return '<span style="font-weight: bold">'+value+'</span>';
                }

            }
        )
    },

    onDataSet: function (record, title) {
        var me = this;

        var store = Ext.getStore('NameValueStore');
        store.removeAll();

        Ext.Viewport.setMasked({xtype: 'loadmask', message: '加载中,请稍后...'});

        Ext.data.proxy.SkJsonp.setUrl(localStorage.getItem('proxyUrl'));
        Ext.data.proxy.SkJsonp.loadStore(store, 'GetProjectsView', record.data.MyType + '$' + record.data.MyIndex, {
            success: function () {
                Ext.Viewport.setMasked(false);
                if (store.getAllCount()) {
                    me.setData(store.getData().all);
                } else {
                    me.setHtml('<p class="no-searches" style="margin-top:50%;text-align:center;">没有详细字段</p>');
                }
            },
            failure: function () {
                Ext.Viewport.setMasked(false);
            }
        });
        //store.getProxy().setExtraParams({
        //    t: 'GetProjectsView',
        //    results: record.data.MyType + '$' + record.data.MyIndex
        //});
        //
        //store.load(function (records, operation, success) {
        //    Ext.Viewport.setMasked(false);
        //
        //    if (!success) {
        //        plugins.Toast.ShowToast("网络不给力，无法读取数据!", 3000);
        //    }
        //    else {
        //        if (store.getAllCount()) {
        //
        //            me.setData(store.getData().all);
        //        } else {
        //            me.setHtml('<p class="no-searches" style="margin-top:50%;text-align:center;">没有详细字段</p>');
        //        }
        //    }
        //    Ext.Viewport.setMasked(false);
        //});

        this.setTitle(title);
    }
});