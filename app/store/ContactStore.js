/**
 * Created by kukiss on 2015/3/19 0019.
 */
Ext.define('YzMobile.store.ContactStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'ContactModel',
        proxy: 'sk'
    }
});