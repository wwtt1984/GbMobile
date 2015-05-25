/**
 * Created by kukiss on 2015/3/16 0016.
 */
Ext.define('YzMobile.model.SearchModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            'rscd',
            'rsnm',
            'X',
            'Y',
            'MyType',
            'MySearchName',
            'MyIndex'
        ]
    }
});