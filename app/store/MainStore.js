Ext.define('YzMobile.store.MainStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'YzMobile.model.MainModel',

        proxy: {
            type: 'sk'
        }
    }
});