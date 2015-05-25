/**
 * Created by kukiss on 2015/5/7.
 */
Ext.define('YzMobile.store.SiteStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'YzMobile.model.SiteModel',
        proxy: {
            type: 'sk'
        }
    }
});