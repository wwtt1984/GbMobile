/**
 * Created by USER on 14-7-12.
 */

Ext.define('YzMobile.model.WaterRainModel', {
    extend: 'Ext.data.Model',
    config: {
        fields: ['STNM', 'STCD', 'MyType', 'X', 'Y', 'VALUE1', 'VALUE2', 'VALUE3','VALUE4','MySearchName','WarnZt']
    }
});
