/**
 * Created by USER on 14-5-4.
 */

Ext.define('YzMobile.store.WaterStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'YzMobile.model.WaterModel',

        pageSize: 15,
//        clearOnPageLoad: false,

        proxy: {
            type: 'sk'
        }
    }
});