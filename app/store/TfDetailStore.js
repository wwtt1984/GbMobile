/**
 * Created by USER on 14-5-9.
 */

Ext.define('YzMobile.store.TfDetailStore', {
    extend: 'Ext.data.Store',
    requires: 'Ext.DateExtras',
    config: {
        model: 'YzMobile.model.TfDetailModel',

        proxy: {
            type: 'sk'
        }
    }
});