/**
 * Created by kukiss on 2015/3/25 0025.
 */
Ext.define('YzMobile.view.contact.ContactPopup', {
    extend: 'Ext.Panel',
    xtype: 'contactPopup',

    requires: [],

    initialize: function () {
        var self = this;
    },

    config: {
        modal: true,
        centered: false,
        hideOnMaskTap: true,
        height: '40%',
        scrollable: true,

        ui: 'detail',

        // we always want the sheet to be 400px wide and to be as tall as the device allows
        width: '100%',
//        top: '48%',
        bottom: 0,
        right: 0,

        defaults: {
            xtype: 'button',
            style: 'min-height:1.8em; max-height: 2em;width:94%;margin:10px 3% 10px 3%;',
            cls: 'demobtn',
            flex: 1
        },
        layout: {
            type: 'vbox',
            align: 'middle'
        },
        items: [
            {
                text: '手机号',
                itemId: 'fullnum'
            },
            {
                text: '家庭号码',
                itemId: 'shortnum'
            },
            {
                text: '办公号码',
                itemId: 'officenum'
            },
            {
                text: '取消',
                itemId: 'numcancel',
                listeners: {
                    tap: function () {
                        Ext.ComponentQuery.query('contactPopup')[0].hide();
                    }
                }
            }]
    },

    onDataSet: function (record) {
        this.onButtonSet(Ext.ComponentQuery.query('#fullnum')[0], ('手机号(' + (record.data.Mobile != '' ? record.data.Mobile : '无') + ')'));
        this.onButtonSet(Ext.ComponentQuery.query('#shortnum')[0], ('家庭号码(' + (record.data.HomeTel != '' ? record.data.Mobile : '无') + ')'));
        this.onButtonSet(Ext.ComponentQuery.query('#officenum')[0], ('办公号码(' + (record.data.Tel != '' ? record.data.Mobile : '无') + ')'));
    },

    onButtonSet: function (button, text) {
        button.setText(text);
    }
});
