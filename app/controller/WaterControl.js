/**
 * Created by USER on 14-8-14.
 */

/**
 * Created by USER on 14-8-14.
 */

Ext.define('YzMobile.controller.WaterControl', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.app.Route'
    ],

    config: {

        refs: {
            main: 'main',
            info: 'main info',
            infofunction: '[itemId=infofunction]',
            waterwarning: '[itemId=waterwarning]',

            water: 'info water',

            waterline: 'info waterline',
            waterview: 'water',
            dateselect:'dateselect'
        },

        control: {
            water: {
                show: function () {
                    WYTool.queryComponent('#info_search').show();
                },
                hide: function () {
                    WYTool.queryComponent('#info_search').hide();
                },
                itemsingletap: 'onWaterItemTap'
            },
            waterview: {
                show: function () {
                   // this.getWaterwarning().show();
                },
                hide: function () {
                  //  this.getWaterwarning().hide();
                }
            },
            waterwarning: {
                tap: 'onWarningTap'
            },

            'waterSearch': {
                initialize: function() {
                    Ext.ComponentQuery.query('#infosearch')[0].hide();

                    var store = Ext.getStore('WaterSearchStore');
                    Ext.data.proxy.SkJsonp.setUrl(localStorage.getItem('proxyUrl'));
                    Ext.data.proxy.SkJsonp.loadStore(store, 'GetSqInfoSearch', null);
                },
                itemsingletap: 'onWaterItemTap'
            }
        }
    },

    onWaterInitialize: function () {
        var me = this;
        me.onWaterStoreLoad();

        me.water = me.getWater();
        if (!me.water) {
            me.water = Ext.create('YzMobile.view.water.Water');
        }
        me.getInfo().push(me.water);
        me.getMain().setActiveItem(me.getInfo());
    },

    /* 显示预警信息的弹窗 */
    onWarningTap: function () {

        var store = Ext.getStore('WaterStore');

        // 统计数据, 1, 24小时内降水超过30的, 以及最大的降雨测站
        var max = 0, warn = 0, danger = 0;
        for (var i = 0; i < store.getCount(); i++) {
            var record = store.getAt(i);
            var num = parseFloat(record.get('max'));
            if (max < num) max = num;
            if (record.get('Warn') == 'true') warn++;
            if (record.get('Danger') == 'true') danger++;
        }

        // 将多个最大的降雨测站信息连接成字符串
        var html = '<h1 style="text-align: center; color: #ff0000">预警信息</h1><h2 style="font-size: 20px">最高水位:</h2><p style="font-size: 18px; color: deeppink; margin-left: 16px">';
        for (var j = 0; j < store.getCount(); j++) {
            var record = store.getAt(j);
            if (parseFloat(record.get('max')) == max) {
                html += record.get('stnm') + '(' + record.get('maxTime') + ')<br/>';
            }
        }
        html += '</p>' + '<h2 style="font-size: 20px">危险测站个数</h2><p style="font-size: 16px; color: deeppink; margin-left: 16px">' + danger + '个</p><h2 style="font-size: 20px">超预警测站个数</h2><p style="font-size: 16px; color: deeppink; margin-left: 16px">' + warn + '个</p>';

        this.warnOverlay = Ext.Viewport.add({
            xtype: 'panel',
            width: '80%',
            height: '55%',
            modal: true,
            centered: true,
            hideOnMaskTap: true,
            scrollable: true,
            items: [
                {
                    styleHtmlContent: true,
                    html: html
                }
            ]
        });
        this.warnOverlay.show();
    },

    onWaterStoreLoad: function () {
        var store = Ext.getStore('WaterStore');

        store.removeAll();
        Ext.data.proxy.SkJsonp.setUrl(localStorage.getItem('proxyUrl'));
        Ext.data.proxy.SkJsonp.loadStore(store, 'GetSqInfo', null);
        //store.getProxy().setExtraParams({
        //    t: 'GetSqInfo'
        //});
        //
        //store.load(function (records, operation, success) {
        //    if (!success) {
        //        plugins.Toast.ShowToast("网络不给力，无法读取数据!", 3000);
        //    }
        //    Ext.Viewport.setMasked(false);
        //}, this);
    },

    onWaterItemTap: function (list, index, target, record, e, eOpts) {
        //Ext.Viewport.setMasked({xtype: 'loadmask', message: '正在加载中...'});
        var me = this;
        me.waterline = me.getWaterline();
        if (!me.waterline) {
            me.waterline = Ext.create('YzMobile.view.water.WaterLine');
        }

        var date = Ext.Date.format(new Date(), 'Y-m-d').toString();

        me.stcd = record.data.stcd;
        me.stnm = record.data.stnm;
        me.onWaterDetailLoad(record, date);

    },

    onWaterBarAdd: function () {
        var me = this;
        me.getInfofunction().hide();
        me.getApplication().getController('MainControl').getInfosearch().show();
        me.getInfo().push(me.waterline);
    },

    onWaterDetailLoad: function (record, date, index) {
        var me = this;
        var store = Ext.getStore('RainDetailStore');
        store.removeAll();
        Ext.data.proxy.SkJsonp.setUrl(localStorage.getItem('proxyUrl'));
        Ext.data.proxy.SkJsonp.loadStore(store, 'GetStDaySW', record.data.stcd + '$' + date, {
            success: function(records) {
                if (records.length == 0) {
                    Ext.Msg.alert('数据为空');
                }
                me.waterline.SelectLineValue(record, date);
                me.onWaterBarAdd();
            }
        });
        //store.getProxy().setExtraParams({
        //    t: 'GetStDaySW',
        //    results: record.data.stcd + '$' + date
        //});
        //
        //store.loadPage(1, {
        //    callback: function (records, operation, success) {
        //        if (!success) {
        //            plugins.Toast.ShowToast("网络不给力，无法读取数据!", 3000);
        //        }
        //        else  {
        //            if (records.length == 0) {
        //                Ext.Msg.alert('数据为空');
        //            }
        //            me.waterline.SelectLineValue(record, date);
        //            me.onWaterBarAdd();
        //        }
        //        Ext.Viewport.setMasked(false);
        //    },
        //    scope: this
        //});
//        store.load(function(records, operation, success) {
//            if(!success)
//            {
//                plugins.Toast.ShowToast("网络不给力，无法读取数据!",3000);
//            }
//            else{
//                me.waterline.SelectLineValue(record, date);
//                me.onWaterBarAdd();
//            }
//            Ext.Viewport.setMasked(false);
//
//        }, this);
    },

    // 按日期搜索WaterLine
    onWaterDayDetailLoad: function (start, end) {


        //Ext.Viewport.setMasked({xtype: 'loadmask', message: '正在加载中...'});
        var me = this;
        me.getDateselect().hide();
        var store = Ext.getStore('RainDetailStore');
        store.removeAll();
        Ext.data.proxy.SkJsonp.setUrl(localStorage.getItem('proxyUrl'));
        Ext.data.proxy.SkJsonp.loadStore(store, 'GetStSdSW', me.stcd + '$' + start + '$' + end, {
            success: function () {
                me.getWaterline().onWaterDayDetailValue(start + '至' + end, store);
            }
        });
        //store.getProxy().setExtraParams({
        //    t: 'GetStSdSW',
        //    results: me.stcd + '$' + start + '$' + end
        //});
        //
        //store.load(function (records, operation, success) {
        //    if (!success) {
        //        plugins.Toast.ShowToast("网络不给力，无法读取数据!", 3000);
        //    }
        //    else {
        //        me.getWaterline().onWaterDayDetailValue(start + '至' + end, store);
        //    }
        //    Ext.Viewport.setMasked(false);
        //
        //}, this);
    }

});