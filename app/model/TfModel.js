/**
 * Created by USER on 14-5-9.
 */

Ext.define('YzMobile.model.TfModel', {
    extend: 'Ext.data.Model',
    config: {
        idProperty: 'tfbh',
        fields: [
            { name: 'tfbh', type: 'float' },
            { name: 'tfname', type: 'string' },
            { name: 'tfyear', type: 'float' },
            { name: 'tfactive', type: 'string' }]
    }
});