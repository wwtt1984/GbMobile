/**
 * Created by USER on 14-5-9.
 */

Ext.define('YzMobile.store.TfStore', {
    extend: 'Ext.data.Store',
    requires: 'Ext.DateExtras',
    config: {
        model: 'YzMobile.model.TfModel',
        proxy: {
            type: 'sk'
        },
        sorters: {
            property: 'tfbh',
            direction: 'DESC'
        },
        grouper: {
            groupFn: function(record) {
                return record.get('tfyear');
            },
//            sortProperty: 'tfbh',
            direction: 'desc'
        }
    }
});