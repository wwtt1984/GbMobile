Ext.define('YzMobile.view.gis.AMapFilter', {
    extend: 'Ext.form.Panel',
    xtype: 'amapfilter',

    config:{
        width: '50%',
        height: '40%',
        modal: true,
        hideOnMaskTap: true,
        defaults: {
            labelAlign: 'left',
            labelWidth: '60%'
        },
        items: [
            {
                xtype: 'checkboxfield',
                name: 'water',
                label: '水位站',
                itemId:'filtersw',
                checked:true,
                value: 'sw'
            },
            {
                xtype: 'checkboxfield',
                name: 'rain',
                label: '雨量站',
                value: 'yl',
                checked:true,
                itemId:'filteryl'
            },
            {
                xtype: 'checkboxfield',
                name: 'nsk',
                label: '水库站',
                value: 'sk',
                itemId:'filtersk'
            },
            {
                xtype: 'checkboxfield',
                name: 'nsz',
                label: '水闸',
                value: 'sz',
                itemId:'filtersz'
            },
            {
                xtype: 'checkboxfield',
                name: 'ndf',
                label: '堤防',
                value: 'df',
                itemId:'filterdf'
            },
            {
                xtype: 'checkboxfield',
                name: 'nsdz',
                label: '水电站',
                value: 'sdz',
                itemId:'filtersdz'
            },
            {
                xtype: 'checkboxfield',
                name: 'nst',
                label: '山塘',
                value: 'st',
                itemId:'filterst'
            }
        ]
    }
});