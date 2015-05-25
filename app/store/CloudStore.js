/**
 * Created by USER on 14-7-12.
 */

Ext.define('YzMobile.store.CloudStore', {
    extend: 'Ext.data.Store',
    requires: 'Ext.DateExtras',
    config: {
        model: 'YzMobile.model.CloudModel',
        sorters: 'index',
        proxy: {
            type: 'sk'
        }
    }
});