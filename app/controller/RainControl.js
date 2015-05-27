/**
 * Created by USER on 14-8-14.
 */


Ext.define('YzMobile.controller.RainControl', {
    extend: 'Ext.app.Controller',

    init: function () {
    },

    requires: [
        'Ext.app.Route'
    ],

    config: {

        refs: {
            main: 'main',
            info: 'main info',
            infofunction: '[itemId=infofunction]',
            rain: 'info rain',
            rainbar: 'info rainbar',
            rainview: 'rain',
            rainWarn: 'rainwarn',
            dateselect:'dateselect'
        },

        control: {
            rain: {
                show: function () {
                    WYTool.queryComponent('#info_search').show();
                },
                hide: function () {
                    WYTool.queryComponent('#info_search').hide();
                },
                itemsingletap: 'onRainItemTap',
                itemtaphold: 'onRainItemTapHold'
            },
            rainwarning: {
                tap: 'onWarningTap'
            },
            rainview: {
                show: function () {
                    //Ext.ComponentQuery.query('#rainwarning')[0].show(); // 显示预警按钮
                },
                hide: function () {
                    //Ext.ComponentQuery.query('#rainwarning')[0].hide(); // 显示预警按钮
                }
            },
            rainWarn: {
                show: function (me, eOpts) {
                    me.fillData(this.rainRecord);
                }
            },

            rainbar: {
                show: function () {
                    Ext.ComponentQuery.query('#infosearch')[0].show();
                },
                hide: function () {
                    Ext.ComponentQuery.query('#infosearch')[0].hide();
                }
            },

            'raindetail': {
                initialize: function () {
                    Ext.ComponentQuery.query('#infosearch')[0].show();
                }
            },

            'rainSearch' : {
                initialize: function () {
                    Ext.ComponentQuery.query('#infosearch')[0].hide();

                    var store = Ext.getStore('RainSearchStore');
                    Ext.data.proxy.SkJsonp.setUrl(localStorage.getItem('proxyUrl'));
                    Ext.data.proxy.SkJsonp.loadStore(store, 'GetYqInfoSearch', null);
                },
                itemsingletap: 'onRainItemTap'
            }
        }
    },

    onRainInitialize: function () {
        var me = this;
        me.onRainStoreLoad();

        me.rain = me.getRain();
        if (!me.rain) {
            me.rain = Ext.create('YzMobile.view.rain.Rain');
        }

        me.getInfo().push(me.rain);
        me.getMain().setActiveItem(me.getInfo());
    },

    onRainStoreLoad: function () {

        var store = Ext.getStore('RainStore');
        store.removeAll();
        Ext.data.proxy.SkJsonp.setUrl(localStorage.getItem('proxyUrl'));
        Ext.data.proxy.SkJsonp.loadStore(store, 'GetYqInfo', null);

        //store.getProxy().setExtraParams({
        //    t: 'GetYqInfo'
        //});
        //
        //store.load(function (records, operation, success) {
        //    if (!success) {
        //        plugins.Toast.ShowToast("网络不给力，无法读取数据!", 3000);
        //    }
        //    Ext.Viewport.setMasked(false);
        //}, this);
    },

    onRainItemTap: function (list, index, target, record, e, eOpts) {

        // 跳转到详细界面
        //Ext.Viewport.setMasked({xtype: 'loadmask', message: '正在加载中...'});
        //var me = this;
        //me.rainbar = me.getRainbar();
        //if (!me.rainbar) {
        //    me.rainbar = Ext.create('YzMobile.view.rain.RainBar');
        //}
        //
        //var date = Ext.Date.format(new Date(), 'Y-m-d').toString();
        //
        //me.stnm = record.data.stnm;
        //me.onRainDetailLoad(record, date);

        this.stcd = record.data.stcd;

        WYTool.queryComponent('info').push(Ext.create('YzMobile.view.rain.RainDetail'));
        this.onRainDetailLoad(record, Ext.Date.format(new Date(), 'Y-m-d').toString());

        this.rainRecord = record;
    },

    onRainItemTapHold: function () {
        //Ext.Msg.alert('');
    },

    /* 显示预警信息的弹窗 */
    onWarningTap: function () {
        var store = Ext.getStore('RainStore');

        // 统计数据, 1, 24小时内降水超过30的, 以及最大的降雨测站
        var warning1h = 0, warning3h = 0, warning24h = 0, maxRain = 0, danger1h = 0, danger3h = 0, danger24h = 0;
        for (var i = 0; i < store.getCount(); i++) {
            var record = store.getAt(i);
            var num24h = parseFloat(record.get('raintoday'));

            if (record.get('Warn1h') == 'true') warning1h++;
            if (record.get('Warn3h') == 'true') warning3h++;
            if (record.get('Warn24h') == 'true') warning24h++;
            if (record.get('Danger1h') == 'true') danger1h++;
            if (record.get('Danger3h') == 'true') danger3h++;
            if (record.get('Danger24h') == 'true') danger24h++;
            if (num24h > maxRain) maxRain = num24h;
        }

        // 将多个最大的降雨测站信息连接成字符串
        var maxStation = "";
        for (var j = 0; j < store.getCount(); j++) {
            var record2 = store.getAt(j);
            if (parseFloat(record2.get('raintoday')) == maxRain) {
                if (maxStation != "") maxStation += ", ";
                maxStation += record2.get('stnm') + "(" + record2.get('raintoday') + "mm)";
            }
        }

        // 拼接成要显示的html内容
        var html = '<h1 style="text-align: center; color: #ff0000">预警信息</h1><h2 style="font-size: 22px">当日最大降雨测站</h2><p style="font-size: 18px; color: deeppink; margin-left: 16px">' + (maxRain > 0 ? maxStation : '均无降雨') +
            '</p><h2 style="font-size: 20px">1h超预警测站个数</h2><p style="font-size: 16px; color: deeppink; margin-left: 16px">' + warning1h + '个</p>' +
            '<h2 style="font-size: 20px">3h超预警测站个数</h2><p style="font-size: 16px; color: deeppink; margin-left: 16px">' + warning3h + '个</p>' +
            '<h2 style="font-size: 20px">24h超预警测站个数</h2><p style="font-size: 16px; color: deeppink; margin-left: 16px">' + warning24h + '个</p>' +
            '<h2 style="font-size: 20px">1h危险测站个数</h2><p style="font-size: 16px; color: deeppink; margin-left: 16px">' + danger1h + '个</p>' +
            '<h2 style="font-size: 20px">3h危险测站个数</h2><p style="font-size: 16px; color: deeppink; margin-left: 16px">' + danger3h + '个</p>' +
            '<h2 style="font-size: 20px">24h危险测站个数</h2><p style="font-size: 16px; color: deeppink; margin-left: 16px">' + danger24h + '个</p>';

        // 显示预警信息的panel
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

    onRainBarAdd: function () {
        var me = this;
        me.getInfofunction().hide();
        me.getApplication().getController('MainControl').getInfosearch().show();
        me.getInfo().push(me.rainbar);
    },

    onRainDetailLoad: function (record, date, index) {
        var me = this;
        var store = Ext.getStore('RainDetailStore');

        Ext.data.proxy.SkJsonp.setUrl(localStorage.getItem('proxyUrl'));
        Ext.data.proxy.SkJsonp.loadStore(store, 'GetStDayYL', record.data.stcd + '$' + date);
        //store.removeAll();
        //store.getProxy().setExtraParams({
        //    t: 'GetStDayYL',
        //    results: record.data.stcd + '$' + date
        //});
        //
        //store.loadPage(1, {
        //    callback: function (records, operation, success) {
        //        if (!success) {
        //            plugins.Toast.ShowToast("网络不给力，无法读取数据!", 3000);
        //        }
        //        else {
        //            //me.rainbar.SelectBarValue(record, date);
        //            me.getRainbar().SelectBarValue(record, date);
        //            //me.onRainBarAdd();
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
//                me.rainbar.SelectBarValue(record, date);
//                me.onRainBarAdd();
//            }
//            Ext.Viewport.setMasked(false);
//
//        }, this);
    },

    onRainDayDetailLoad: function (start, end) {
        //Ext.Viewport.setMasked({xtype: 'loadmask', message: '正在加载中...'});


        var me = this;
        me.getDateselect().hide();
        var store = Ext.getStore('RainDetailStore');
        Ext.data.proxy.SkJsonp.setUrl(localStorage.getItem('proxyUrl'));
        Ext.data.proxy.SkJsonp.loadStore(store, 'GetStDayLjYl', me.stcd + '$' + start + '$' + end);
        //store.removeAll();
        //store.getProxy().setExtraParams({
        //    t: 'GetStDayLjYl',
        //    results: me.stcd + '$' + start + '$' + end
        //});
        //
        //store.load(function (records, operation, success) {
        //    if (!success) {
        //        plugins.Toast.ShowToast("网络不给力，无法读取数据!", 3000);
        //    }
        //    else {
        //        me.getRainbar().onRainDayDetailValue(start + '至' + end, store);
        //    }
        //    Ext.Viewport.setMasked(false);
        //
        //}, this);
    }

});