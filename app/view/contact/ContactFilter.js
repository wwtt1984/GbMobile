    Ext.define('YzMobile.view.contact.ContactFilter', {
    extend: 'Ext.form.Panel',
    xtype: 'contactfilter',

    config:{
        width: '15%',
        height: '10%',
        modal: true,
        hideOnMaskTap: true,
        defaults: {
            labelAlign: 'left',
            labelWidth: '60%'
        },
        items: [
            {
                xtype: 'button',
                text:'区划排列',
                ui:'plain',
                itemId:'contactFilterPart'
            },
            {
                xtype: 'button',
                text:'姓名排列',
                ui:'plain',
                itemId:'contactFilterName'
            }
        ]
    }
});