/**
 * Created by USER on 14-7-12.
 */

Ext.define('YzMobile.model.WeatherModel',{
    extend: 'Ext.data.Model',
    config: {
        fields: [
//            'sdate',
//            'stxt',
//            'simg',
//            'stemperature'
            'name',
            'date',
            'temp',
            'weather',
            'wind',
            'date1',
            'temp1',
            'weather1',
            'wind1',
            'date2',
            'temp2',
            'weather2',
            'wind2',
            'time',
            'tempreal',
            'humidity',
            'air',
            'windreal',
            'image',
            'image1',
            'image2'
        ]
    }

});