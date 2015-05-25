/**
 * Created by kukiss on 2015/3/12 0012.
 */
Ext.define('YzMobile.store.NameValueStore', {
    extend: 'Ext.data.Store',
    config: {
        model: 'YzMobile.model.NameValueModel',
        proxy: 'sk'
    }
});