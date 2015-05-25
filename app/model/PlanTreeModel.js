/**
 * Created by kukiss on 2015/4/21 0021.
 */
Ext.define('YzMobile.model.PlanTreeModel', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            'fileName',
            'Sttype',
            'Stvalue',
            'Stwarnnm',
            'Stthreshold'
        ]
    }
});