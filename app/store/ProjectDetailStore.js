/**
 * Created by USER on 14-5-8.
 */

Ext.define('YzMobile.store.ProjectDetailStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'YzMobile.model.ProjectDetailModel',

        proxy: {
            type: 'sk'
        }

    }
});