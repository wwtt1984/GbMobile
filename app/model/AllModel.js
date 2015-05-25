/**
 * Created by kukiss on 2015/4/29 0029.
 */
Ext.define('YzMobile.model.AllModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            'Sid',
            'Sname',
            'Mobile',
            'Company',
            'Position',
            'Tel',
            'HomeTel',
            'PlanUrl',
            'MySearchName'
        ]
    }
});