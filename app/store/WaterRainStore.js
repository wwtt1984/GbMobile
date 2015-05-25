/**
 * Created by USER on 14-7-12.
 */

Ext.define('YzMobile.store.WaterRainStore', {
    extend: 'Ext.data.Store',
    requires: 'Ext.DateExtras',
    config: {
        model: 'YzMobile.model.WaterRainModel',
        proxy: {
            type: 'sk'
        }

    }
});