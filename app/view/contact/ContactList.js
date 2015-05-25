/**
 * Created by USER on 14-4-3.
 */

Ext.define('YzMobile.view.contact.ContactList', {
    extend: 'Ext.List',
    xtype: 'contactList',
    config: {
        title: '通讯录',
        store: 'ContactTreeStore',
        loadingText: '加载中,请稍后...',
        emptyText: '<p class="no-searches">没有符合要求的记录</p>',

        ui: 'round',
        pinHeaders: false,
        grouped: false,
        indexBar: false,
        cls: 'x-contacts',
        itemTpl: [
            //'<div class="contact">{PersonNM} <strong>{lastName}</strong></div>'
            //'<div class="headshot" style="background-image:url(resources/icons/contact.png);"></div>',
            '<div style="font-weight: 600; margin-bottom: 4px;margin-bottom: 10px;">{Sname}</div>',
            '<div>{[this.getMobile(values.Mobile)]}</div>',
            {
                getMobile: function (value) {
                    return value == '' ? '' : value;
                }
            }
        ],

        items: [
            {
                itemId: 'longTapTip',
                xtype: 'panel',
                docked: 'top',
                html: '<div style="width:100%;text-align: center; color: #ff0000;margin-top: 10px;">按人员姓名首字母查询</div>'
            }
        ]

        //items: [
        //    {
        //        xtype: 'toolbar', title: '通讯录', docked: 'top', ui:'light',
        //        items: [
        //            {
        //                xtype: 'button', ui: 'back', text: '主页面',
        //                listeners: {
        //                    tap: function () {
        //                        Ext.ComponentQuery.query('#vMain')[0].setActiveItem(Ext.ComponentQuery.query('#vFunction')[0]); // back
        //                    }
        //                }
        //            },
        //            {xtype: 'button', itemId: 'vContactSearch', right: '3%', iconCls: 'search', ui: 'plain'},
        //            {xtype: 'button', itemId: 'contactListFilter', right: 0, ui: 'plain', iconCls:'settings'}
        //            //{xtype: 'button', itemId: 'vNameSort', right: 0, text: '姓名排列'},
        //            //{xtype: 'button', itemId: 'vPartSort', right: 0, text: '区划排列'}
        //        ]
        //    }
        //]


    }

    //listeners: {
    //    itemtap: function (me, index, target, record, e, eOpts) {
    //
    //        var popup = Ext.create('YzMobile.view.contact.ContactPopup');
    //        popup.onDataSet(record);
    //        popup.showBy(target);
    //    }
    //}

});