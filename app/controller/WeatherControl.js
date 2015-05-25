/**
/**
 * Created by USER on 14-8-14.
 */

Ext.define('YzMobile.controller.WeatherControl', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.app.Route'
    ],

    config: {

        refs: {
            main: 'main',
            info: 'main info',
            infofunction: '[itemId=infofunction]',

            weather: 'info weather'
        },

        control: {}
    },

    //天气预报页面初始化
    onWeatherInitialize: function () {
        var me = this;

        me.weather = me.getWeather();
        if (!me.weather) {
            me.weather = Ext.create('YzMobile.view.weather.Weather');
        }

        me.getApplication().getController('MainControl').getInfosearch().show();
        me.onWeatherStoreLoad(YzMobile.app.user.cityname, 0);
    },

    onWeatherStoreLoad: function (city, index) {

        var me = this;

        var store = Ext.getStore('WeatherStore');

        store.removeAll();
        Ext.data.proxy.SkJsonp.setUrl(localStorage.getItem('proxyUrl'));
        Ext.data.proxy.SkJsonp.loadStore(store, 'GetSWeather', city, {
            success: function (records) {
                me.weather.onDataSet(records[0]);
                if (index == 0) {
                    me.getInfo().push(me.weather);
                    me.getMain().setActiveItem(me.getInfo());
                }
                me.getInfo().getNavigationBar().setTitle(city + "天气");
            }
        });
        //store.getProxy().setExtraParams({
        //    t: 'GetSWeather',
        //    results: city
        //});
        //
        //store.load(function (records, operation, success) {
        //    if (!success) {
        //        plugins.Toast.ShowToast("网络不给力，无法读取数据!", 3000);
        //    }
        //    else {
        //        me.weather.onDataSet(records[0]);
        //        if (index == 0) {
        //            me.getInfo().push(me.weather);
        //            me.getMain().setActiveItem(me.getInfo());
        //        }
        //        me.getInfo().getNavigationBar().setTitle(city + "天气");
        //    }
        //    Ext.Viewport.setMasked(false);
        //
        //}, this);
    },

    //按日期查询水位过程线
    onWeatherPick: function () {

        var me = this;

        if (!me.onPicker) {
            me.onPicker = Ext.create('Ext.picker.Picker', {

                slots: [
                    {
                        name: 'city',
                        title: '城市',
                        align: 'center',
                        data: [
                            {text: '宁波', value: '宁波'},
                            {text: '杭州', value: '杭州'},
                            {text: '舟山', value: '舟山'},
                            {text: '温州', value: '温州'}
                        ]
                    }
                ],

                doneButton: {
                    text: '确定'
                },
                cancelButton: {
                    text: '取消'
                },
                listeners: {
                    change: function (t, value, op) {
                        me.onWeatherStoreLoad(value.city, 1);
                    }
                }
            });
            if (!me.onPicker.getParent()) {
                Ext.Viewport.add(me.onPicker);
            }
        }
        me.onPicker.show();
    }
})
