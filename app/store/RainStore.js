/**
 * Created by USER on 14-4-28.
 */

Ext.define('YzMobile.store.RainStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'YzMobile.model.RainModel',

        pageSize: 15,
        clearOnPageLoad: false,

        proxy: {
            type: 'sk'
        }
    }
});