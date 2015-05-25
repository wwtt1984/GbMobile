/**
 * Created by USER on 14-7-12.
 */

Ext.define('YzMobile.store.WeatherStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'YzMobile.model.WeatherModel',

        proxy: {
            type: 'sk'
        }
    }
});