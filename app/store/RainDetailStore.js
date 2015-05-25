/**
 * Created by USER on 14-5-4.
 */

Ext.define('YzMobile.store.RainDetailStore', {
    extend: 'Ext.data.Store',
    requires: 'Ext.DateExtras',
    config: {
        model: 'YzMobile.model.RainDetailModel',

//        data: [
//            {stnm: '测试', stcd: '001', time: '8时', value: '0.5'},
//            {stnm: '测试', stcd: '001', time: '9时', value: '0.5'},
//            {stnm: '测试', stcd: '001', time: '10时', value: '0.5'},
//            {stnm: '测试', stcd: '001', time: '11时', value: '2.0'},
//            {stnm: '测试', stcd: '001', time: '12时', value: '0.5'},
//
//            {stnm: '测试', stcd: '001', time: '13时', value: '0.5'},
//            {stnm: '测试', stcd: '001', time: '14时', value: '0.5'},
//            {stnm: '测试', stcd: '001', time: '15时', value: '0.5'},
//            {stnm: '测试', stcd: '001', time: '16时', value: '0.5'},
//            {stnm: '测试', stcd: '001', time: '17时', value: '0.5'},
//
//            {stnm: '测试', stcd: '001', time: '18时', value: '1.0'},
//            {stnm: '测试', stcd: '001', time: '19时', value: '0.5'}
//        ]
        proxy: {
            type: 'sk'
        }
    }
});