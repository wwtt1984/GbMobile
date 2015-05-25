/**
 * Created by USER on 14-5-8.
 */

Ext.define('YzMobile.store.ProjectTreeStore', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.ProjectTreeStore',

    requires: [
        'YzMobile.model.TreeModel'
    ],

    config: {
        autoLoad:  false,
        model: 'YzMobile.model.TreeModel',
        storeId: 'ProjectTreeStore',
        defaultRootProperty: 'items',
        proxy: {
            type: 'sk',
            reader: {
                type: 'json'
            }
        },
        root: {
            id:'project',
            expanded: false
        }
    }
})