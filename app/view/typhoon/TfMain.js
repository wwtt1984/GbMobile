/**
 * Created by USER on 14-5-12.
 */

Ext.define('YzMobile.view.typhoon.TfMain', {
    extend: 'Ext.Container',
    xtype: 'tfmain',

    requires: [
        'YzMobile.view.typhoon.TfMap'
    ],

    config: {
        itemId: 'tfmain',
        title: '台风',
        layout: 'fit',

        items: [
            {
                xclass: 'YzMobile.view.typhoon.TfMap'
            }
        ]
    }

});
