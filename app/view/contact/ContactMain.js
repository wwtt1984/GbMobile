Ext.define('YzMobile.view.contact.ContactMain', {
    extend: 'Ext.Container',
    xtype: 'contactmain',

    requires: [
        'YzMobile.view.contact.ContactList'
    ],

    config: {
        itemId: 'contactmain',
        title: '防汛通讯录',
        layout: 'fit',
        items: [
            {
                xclass: 'YzMobile.view.contact.ContactList'
            }
        ]
    }

});