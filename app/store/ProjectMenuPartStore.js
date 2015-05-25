/**
 * Created by kukiss on 2015/3/11 0011.
 */
Ext.define('YzMobile.store.ProjectMenuPartStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'YzMobile.model.ProjectMenuPartModel',

        pageSize: 15,
        clearOnPageLoad: false,

        proxy: {
            type: 'sk'
        }

    }
});