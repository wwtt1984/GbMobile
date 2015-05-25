/**
 * Created by USER on 14-7-12.
 */

Ext.define('YzMobile.model.CloudModel', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'img', type: 'string' },
            { name: 'index', type: 'int' }
        ]
    }
});