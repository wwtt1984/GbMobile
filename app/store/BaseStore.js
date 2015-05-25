/**
 * Created by USER on 14-8-15.
 */

Ext.define('YzMobile.store.BaseStore', {
    extend: 'Ext.data.Store',
    requires: 'Ext.DateExtras',
    config: {
        model: 'YzMobile.model.BaseModel',
        proxy: {
            type: 'sk'
        }
    }
});