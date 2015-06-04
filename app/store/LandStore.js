/**
 * Created by USER on 14-8-15.
 */

Ext.define('YzMobile.store.LandStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'YzMobile.model.LandModel',
        data:[
            {id: '03', name: 'hour_rain_forecast', title: '一小时降水预报'},
            {id: '04', name: 'three_hour_rain_forecast', title: '三小时降水预报'},
            {id: '01', name: 'wxyt', title: '卫星云图'},
            {id: '02', name: 'qxld', title: '气象雷达'}

           // {id: '05', name: 'strong_weather_forecast', title: '强天气预报'}
        ],

        autoLoad: true
    }
});