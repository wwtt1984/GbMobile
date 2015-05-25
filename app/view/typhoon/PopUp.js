/**
 * Created by USER on 14-5-9.
 */

Ext.define('YzMobile.view.typhoon.PopUp', {
    extend: 'Ext.Panel',
    xtype: 'typop',

    requires: [
        'YzMobile.view.typhoon.popDetail.TfPopDetailInfo',
        'YzMobile.view.typhoon.popDetail.TfPopDetailList',
        'Ext.carousel.Carousel'
    ],

    config: {
        itemId: 'typop',
        modal: true,
        centered: false,
        hideOnMaskTap: true,

        ui: 'detail',

        // we always want the sheet to be 400px wide and to be as tall as the device allows
        width: '100%',
        top: '48%',
        bottom: 0,
        right: 0,

        loan: null,

        layout: {
            type: 'vbox',
            align: 'stretch'
        },

        items: [
            {
                xtype: 'carousel',
                flex: 1,
                items: [
                    { xtype: 'TfPopDetailInfo' },
                    { xtype: 'TfPopDetailList' }
                ]
            }
        ]
    },

    updateLoan: function(newLoan) {
        var carousel = this.down('carousel'),
            information = this.down('TfPopDetailInfo'),
            payments = this.down('TfPopDetailList'),
            coords = newLoan;

        information.setData(newLoan);
    }
});