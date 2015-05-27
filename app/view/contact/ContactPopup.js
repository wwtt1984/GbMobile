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

    hide: function () {
        this.destroy();
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
                itemId: 'fullnum',
                listeners: {
                    tap: function () {
                        if (self.numbers.mobile)  window.open('tel:' + self.numbers.mobile, '_system');
                    }
                }
            },
            {
                text: '家庭号码',
                itemId: 'shortnum',
                listeners: {
                    tap: function () {
                        if (self.numbers.homeTel) window.open('tel:' + self.numbers.homeTel, '_system');
                    }
                }
            },
            {
                text: '办公号码',
                itemId: 'officenum',
                listeners: {
                    tap: function () {
                        if (self.numbers.tel) window.open('tel:' + self.numbers.tel, '_system');
                    }
                }
            },
            {
                text: '取消',
                itemId: 'numcancel',
                listeners: {
                    tap: function () {
                        Ext.ComponentQuery.query('contactPopup')[0].destroy();
                    }
                }
            }]
    },

    onDataSet: function (record) {
        self.numbers = {mobile: record.data.Mobile, homeTel: record.data.HomeTel, tel: record.data.Tel};

        this.onButtonSet(Ext.ComponentQuery.query('#fullnum')[0], ('手机号(' + (record.data.Mobile != '' ? record.data.Mobile : '无') + ')'));
        this.onButtonSet(Ext.ComponentQuery.query('#shortnum')[0], ('家庭号码(' + (record.data.HomeTel != '' ? record.data.Mobile : '无') + ')'));
        this.onButtonSet(Ext.ComponentQuery.query('#officenum')[0], ('办公号码(' + (record.data.Tel != '' ? record.data.Mobile : '无') + ')'));
    },

    onButtonSet: function (button, text) {
        button.setText(text);
    }

});
