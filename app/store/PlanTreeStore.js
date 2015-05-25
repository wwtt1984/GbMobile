/**
 * Created by kukiss on 2015/4/21 0021.
 */
Ext.define('YzMobile.store.PlanTreeStore', {
    extend: 'Ext.data.TreeStore',

    requires: [
        'YzMobile.model.PlanTreeModel'
    ],

    config: {
        model: 'YzMobile.model.PlanTreeModel',
//        storeId: 'ContactTreeStore',
        defaultRootProperty: 'items',
        proxy: {
            type: 'sk'
            //extraParams: {
            //    t: 'GetTodayList'
            //}
//            reader: {
//                type: 'json'
//            }
        },
        root: {
            id: 'td'
//            expanded: false
        }
    }
});