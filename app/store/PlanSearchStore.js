/**
 * Created by kukiss on 2015/3/16 0016.
 */
Ext.define('YzMobile.store.PlanSearchStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'YzMobile.model.PlanSearchModel',
        proxy: {
            type: 'sk',
            extraParams: {
                t: 'GetFxPlanSearch'
            }
        }
    }
});