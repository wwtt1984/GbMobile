Ext.define('YzMobile.store.UserStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'YzMobile.model.UserModel',

        proxy: {
            type: 'sk'
        }
    }
});