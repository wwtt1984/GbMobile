/**
 * Created by kukiss on 2015/3/16 0016.
 */
Ext.define('YzMobile.store.SearchStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'YzMobile.model.SearchModel',
        proxy: 'sk'
    }
});