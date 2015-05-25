/**
 * Created by USER on 14-7-13.
 */

Ext.define('YzMobile.store.RadarStore', {
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