Ext.define('YzMobile.view.typhoon.popDetail.TfPopDetailList', {
    extend: 'Ext.List',
    xtype: 'TfPopDetailList',

    config: {
        itemId: 'TfPopDetailList',
//        title: 'Address Book',
        cls: 'x-contacts',

        store: 'TfDetailStore',
        itemTpl: [
               '<div class="contact2"><div style="float:left;width:50%;text-align:center;"><strong>{sj}</strong></div>', '<div style="float:left;width:25%;text-align:center;">{jd}</div>', '<div style="float:left;width:25%;text-align:center;">{wd}</div></div>'
            ].join('')
    }
});
