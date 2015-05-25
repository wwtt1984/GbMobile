/**
 * Created by USER on 14-4-28.
 */

Ext.define('YzMobile.store.FunctionStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'YzMobile.model.FunctionModel',

//        proxy: {
//            type: 'sk'
//        },

        data:[
            {id: '08', name: 'flood', title: '当前汛情', url: 'resources/images/function/notice.png'},
            {id: '01', name: 'rain', title: '雨情信息', url: 'resources/images/function/rain.png'},
            {id: '02', name: 'water', title: '水情信息', url: 'resources/images/function/water.png'},
            {id: '03', name: 'project', title: '工情信息', url: 'resources/images/function/project.png'},
            {id: '04', name: 'weather', title: '天气预报', url: 'resources/images/function/news.png'},
            {id: '05', name: 'land', title: '气象国土', url: 'resources/images/function/radar.png'},
            {id: '06', name: 'gis', title: 'GIS应用', url: 'resources/images/function/mark.png'},
            {id: '07', name: 'typhoon', title: '台风信息', url: 'resources/images/function/typhoon.png'},
            {id: '09', name: 'contact', title: '防汛通讯录', url: 'resources/images/function/contacts.png'},
            {id: '10', name: 'plan', title: '防汛预案', url: 'resources/images/function/info.png'},
            {id: '11', name: 'setting', title: '设置', url: 'resources/images/function/setting.png'}
//            {id: '12', name: 'settings', title: '设置', url: 'resources/images/function/setting.png'}
        ],

        autoLoad: true
    }
});