/**
 * Created by USER on 14-5-4.
 */

Ext.define('YzMobile.model.WaterModel',{
    extend: 'Ext.data.Model',
    config: {
        idProperty: 'stcd',
        fields: [
            'stcd',
            'stnm',
            'new',
            'newTime',
            'max',
            'maxTime',
            'warning',
            'type',
            'Warn',
            'Danger'
        ]
    }

});