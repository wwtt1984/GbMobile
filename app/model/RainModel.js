/**
 * Created by USER on 14-4-28.
 */

Ext.define('YzMobile.model.RainModel', {
    extend: 'Ext.data.Model',
    config: {
        idProperty: 'stcd',
        fields: [
            'stcd',
            'stnm',
            'rain1h',
            'rain3h',
            'raintoday',
            'type',
            'x',
            'y',
            'Warn1h',
            'Danger1h',
            'Warn3h',
            'Danger3h',
            'Warn24h',
            'Danger24h'
        ]
    }

});