/**
 * Created by Stiffen on 2015/4/17.
 */
Ext.define('YzMobile.view.typhoon.TfAnimation', {
    extend: 'Ext.Panel',
    xtype: 'tfAnimation',

    config:{
        width: '50%',
        height: '40%',
        hideOnMaskTap: true,
        modal: true,
        padding:20,
        defaults: {
            xtype : 'button',
            margin:'10 0'
        },
        layout:{
            type:'vbox',
            pack:'top',
            align:'stretch'
        },
        items: [
            {
                itemId: 'startAnimation',
                text: '开始动画',
                ui:'confirm'
            },
            {
                itemId: 'stopAnimation',
                text: '停止动画'
            }
        ]
    }
});