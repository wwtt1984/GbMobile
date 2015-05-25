Ext.define('YzMobile.store.VersionStore', {
    extend: 'Ext.data.Store',
    config: {
        model: 'YzMobile.model.VersionModel',

        proxy: {
            type: 'sk'
        }
    }
});