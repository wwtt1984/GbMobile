/**
 * Created by USER on 14-7-14.
 */

Ext.define('YzMobile.view.gis.GisMain', {
    extend: 'Ext.Container',
    xtype: 'gismain',

    requires: [
        'YzMobile.view.gis.AMap',
        'YzMobile.view.gis.AMapFilter'
        //'YzMobile.view.gis.AMapFilterView'

    ],

    config: {
        itemId: 'gismain',
        title: '地图',
        layout: 'fit',
        items: [
            {
                xclass: 'YzMobile.view.gis.AMap'
            }
        ]
    }

});