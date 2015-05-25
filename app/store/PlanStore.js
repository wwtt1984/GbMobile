/**
 * Created by kukiss on 2015/3/19 0019.
 */
Ext.define('YzMobile.store.PlanStore', {
    extend: 'Ext.data.Store',
    config: {
        model: 'YzMobile.model.AllModel',
        proxy: {
            type: 'sk'
        }
    }
});