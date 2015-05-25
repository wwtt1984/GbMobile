/**
 * Created by kukiss on 2015/3/19 0019.
 */
Ext.define('YzMobile.store.ContactTreeStore', {
    extend: 'Ext.data.Store',
    config: {
        model: 'YzMobile.model.ContactListModel',
        proxy: {
            type: 'sk'
        }
        //grouper: {
        //    groupFn: function(record) {
        //        return record.get('MySearchName')[0];
        //    }
        //}
    }
});