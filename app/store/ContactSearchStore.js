/**
 * Created by kukiss on 2015/3/16 0016.
 */
Ext.define('YzMobile.store.ContactSearchStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'YzMobile.model.ContactSearchModel',
        proxy: {
            type: 'sk',
            extraParams: {
                t: 'GetAdressSearch'
            }
        }
    }
});