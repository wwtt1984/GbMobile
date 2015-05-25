Ext.define('YzMobile.view.Main', {
    extend: 'Ext.Container',
    xtype: 'main',

    requires: [
        'YzMobile.view.Login',
        'YzMobile.view.Function'
    ],
    config: {

        layout: 'card',
        itemId: 'vMain',

        items: [
            {
                xclass: 'YzMobile.view.Login'
            },
            {
                xclass: 'YzMobile.view.Function'
            }
        ]
    }
});
