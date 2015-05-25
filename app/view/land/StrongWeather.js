/**
 * Created by USER on 14-8-15.
 */

Ext.define('YzMobile.view.land.StrongWeather', {

    extend: 'Ext.Container',
    xtype: 'strongweather',

    requires: [
        'Ext.XTemplate',
        'Ext.field.Slider'
    ],

    config: {
        title: '强天气预报',
        itemId: 'cloud',
        items: [
            {
                xtype: 'toolbar',
                docked: 'bottom',
                items: [
                    {
                        iconCls: 'arrow_right',
                        xtype: 'button',
                        itemId: 'cloudstart',
                        iconMask: true
                    },
                    {
                        xtype: 'sliderfield',
                        name: 'single_slider',
                        itemId: 'cloudslider',
                        value: 0,
                        listeners: {
                            change: function (thisSlider, slider, thumb, newValue, oldValue, eOpts) {
                                Ext.ComponentQuery.query('#cloud')[0].sliderChangePic(newValue);
                            }
                        }
                    }
                ]
            }

        ],
        cls: 'detail-card',
        styleHtmlContent: true,
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        tpl: Ext.create('Ext.XTemplate',
            '<div style="width:100%; height:100%;text-align:center;"><img width="100%" src="{img}" alt="暂无图片数据"/></div>'
        )
    },

    initialize: function () {
        this.loadstore();
    },

    loadstore: function () {
        var me = this;
        me.currentIndex = 0;
        me.imgsLength = 0;
        me.imgloadindex = 0;

        me.store = Ext.getStore('CloudStore');
        me.store.removeAll();
        Ext.data.proxy.SkJsonp.setUrl(localStorage.getItem('proxyUrl'));
        Ext.data.proxy.SkJsonp.loadStore(me.store, 'GetHtmlSource', 'wxyt$', {
            success: function() {
                me.imgsLength = me.store.getData().all.length;
                for (var i = me.store.getCount() - 1; i >= 0; i--) {
                    me.checkimgload(me.store.getAt(i).get('img'));
                }
                me.imgloadsj(me.store.getCount());
                me.setData(me.store.getData().all[me.currentIndex].data);
            }
        });
        //me.store.getProxy().setExtraParams({
        //    t: 'GetHtmlSource',
        //    results: 'wxyt$'
        //});
        //me.store.load(function (records, operation, success) {
        //
        //    me.imgsLength = me.store.getData().all.length;
        //    for (var i = me.store.getCount() - 1; i >= 0; i--) {
        //        me.checkimgload(me.store.getAt(i).get('img'));
        //    }
        //    me.imgloadsj(me.store.getCount());
        //    me.setData(me.store.getData().all[me.currentIndex].data);
        //}, this);
    },

    imgloadsj: function (count) {
        var me = this;
        if (this.imgloadindex < count) {
            window.setTimeout(function () {
                me.imgloadsj(count);
            }, 200);
        }
    },

    checkimgload: function (url) {
        var img = new Image();
        img.src = url;
        if (img.complete) {
            this.imgloadindex++;
        } else {
            img.onload = function () {
                img.onload = null;
            }
        }
    },

    changePic: function (that) {
        that.currentIndex++;
        if (that.currentIndex == that.imgsLength) {
            if (this.stopIntervalWxyt != undefined) {
                window.clearInterval(this.stopIntervalWxyt);
            }
            Ext.ComponentQuery.query('#cloudstart')[0].enable();
            that.currentIndex = 0;
        }
        that.setData(that.store.getData().all[that.currentIndex % that.imgsLength].data);
        Ext.ComponentQuery.query('#cloudslider')[0].setValue(that.currentIndex == that.imgsLength ? 0 : that.currentIndex * 110 / that.imgsLength);
    },

    clickStartToChangePic: function () {
        Ext.ComponentQuery.query('#cloudstart')[0].disable();
        var that = this;
        if (this.stopIntervalWxyt != undefined) {
            window.clearInterval(this.stopIntervalWxyt);
        }
        this.stopIntervalWxyt = window.setInterval(function () {
            that.changePic(that)
        }, 1000);
    },

    sliderChangePic: function (newValue) {
        var currentSliderValue = Math.floor(newValue / 100 * this.imgsLength) == this.imgsLength ? this.imgsLength - 1 : Math.floor(newValue / 100 * this.imgsLength);
        this.currentIndex = currentSliderValue;
        if (this.currentIndex >=0) {
            this.setData(this.store.getData().all[this.currentIndex].data);
        }
    },

    changePicToLeft: function () {
        if (this.stopIntervalWxyt != undefined) {
            window.clearInterval(this.stopIntervalWxyt);
        }
        this.setData(this.store.getData().all[this.currentIndex = (((this.currentIndex - 1) == -1 ? this.imgsLength - 1 : this.currentIndex - 1) % this.imgsLength)].data);
    },

    changePicToRight: function () {
        if (this.stopIntervalWxyt != undefined) {
            window.clearInterval(this.stopIntervalWxyt);
        }
        this.currentIndex++;
        this.setData(this.store.getData().all[(this.currentIndex) % this.imgsLength].data);
    },

    loadDataWxytFromHtmlSource: function (yuntuData) {
        var me = this;
        Ext.ComponentQuery.query('#cloudstart')[0].enable();
        this.currentIndex = 0;
        if (this.store != undefined) {
            this.store.clearFilter();
        }
        this.store = Ext.getStore('HtmlSource');
        Ext.data.proxy.SkJsonp.setUrl(localStorage.getItem('proxyUrl'));
        Ext.data.proxy.SkJsonp.loadStore(this.store, 'GetHtmlSource', yuntuData, function () {
            me.imgsLength = me.store.getData().all.length;
            for (var i = 0; i < me.store.getCount(); i++) {
                this.checkimgload(me.store.getAt(i).get('img'));
            }
            this.imgloadsj(me.store.getCount());
            this.setData(me.store.getData().all[me.currentIndex].data);
        });
        //this.store.getProxy().setExtraParams({
        //    t: 'GetHtmlSource',
        //    weixingyuntuType: yuntuData
        //
        //});
        //
        //this.store.load(function (records, operation, success) {
        //    this.imgsLength = this.store.getData().all.length;
        //    for (var i = 0; i < this.store.getCount(); i++) {
        //        this.checkimgload(this.store.getAt(i).get('img'));
        //    }
        //    this.imgloadsj(this.store.getCount());
        //    this.setData(this.store.getData().all[this.currentIndex].data);
        //}, this);

        var that = this;
        if (that.stopIntervalWxyt != undefined) {
            window.clearInterval(that.stopIntervalWxyt);
        }
        Ext.ComponentQuery.query('#cloudslider')[0].setValue(0);

    },

    stopIntervalWxytToBack: function () {
        Ext.ComponentQuery.query('#cloudslider')[0].setValue(0);
        Ext.ComponentQuery.query('#cloudstart')[0].enable();
        if (this.store != undefined) {
            this.store.clearFilter();
        }
        if (this.stopIntervalWxyt != undefined) {
            window.clearInterval(this.stopIntervalWxyt);
        }
    }
});