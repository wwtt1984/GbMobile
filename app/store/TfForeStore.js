/**
 * Created by USER on 14-5-9.
 */

Ext.define('YzMobile.store.TfForeStore', {
    extend: 'Ext.data.Store',
    requires: 'Ext.DateExtras',
    config: {
        model: 'YzMobile.model.TfForeModel',
        proxy: {
            type: 'sk'
        }
    }
});