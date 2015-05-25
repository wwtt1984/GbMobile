/**
 * Created by kukiss on 2015/3/19 0019.
 */
Ext.define('YzMobile.model.ContactListModel', {
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