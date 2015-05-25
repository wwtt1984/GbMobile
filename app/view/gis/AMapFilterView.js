/**
 * Created by teddy on 15/4/20.
 */


//选择显示界面

Ext.define('YzMobile.view.gis.AMapFilterView',{

    extend:'Ext.form.Panel',
    xtype:'filterView',

    config:{
        modal: true,
        hideOnMaskTap: true,
        defaults: {
            labelAlign: 'center',
            labelWidth: '60%'
        },

        items:[
            {
                xtype:'toolbar',
                docked:'top',
                title:'选择要显示的站点',
                items:[{
                    xtype:'button',
                    itemId:'backBtn',
                    ui:'back',
                    text:'返回'
                }]
            },
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
            },
            {
                xtype: 'togglefield',
                name: 'enable',
                value:0,
                label: '是否显示预警',
                itemId:'toggleselect'
            }
        ]
    }
});