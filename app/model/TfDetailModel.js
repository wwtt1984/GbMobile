/**
 * Created by USER on 14-5-9.
 */

Ext.define('YzMobile.model.TfDetailModel', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'sj', type: 'string' },
            { name: 'jd',convert: function(val, record) {if (val) { return new Number(val).toFixed(1); }},type: 'string'},
            { name: 'wd', convert: function(val, record) { if (val) { return new Number(val).toFixed(1); }}, type: 'string'},
            { name: 'qjfq', type: 'string' },
            { name: 'sjfq', type: 'string' },
            { name: 'fs', type: 'string' },
            { name: 'ydsd', type: 'string' },
            { name: 'zxqy', type: 'string' },
            { name: 'jzxfl', type: 'string' }
        ]
    }
});