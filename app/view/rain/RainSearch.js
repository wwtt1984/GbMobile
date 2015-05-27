/**
 * Created by kukiss on 2015/3/19 0019.
 */
Ext.define('YzMobile.view.rain.RainSearch', {
    extend: 'Ext.List',
    xtype: 'rainSearch',

    requires: [],

    config: {
        title: '雨情搜索',
        itemId: 'ctsearch',

        cls: 'contact-list',

        pinHeaders: false,

        //itemTpl defines the template for each item in the list
        itemTpl: Ext.create('Ext.XTemplate',
            '<div class="contact-list-item">',
            '    <h1>{stnm}</h1>',
            '</div>'
        ),

        //give it a link to the store instance
        store: {
            model: 'YzMobile.model.AllModel'
        },

        useSimpleItems: true,

        emptyText: '<div style="margin-top: 20px; text-align: center">无匹配的记录</div>',
        disableSelection: true,

        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                ui: 'light',

                cls: 'contact-search',
                style: 'border:none;',

                items: [
                    {
                        xtype: 'searchfield',
                        placeHolder: '请输入汉字或拼音首字母组合...',
                        style: 'width:96%; border: none;margin: 0 2% 0 2%;',
                        listeners: {
                            clearicontap: function () {
                                Ext.ComponentQuery.query('#ctsearch')[0].onSearchClearIconTap();
                            },
                            keyup: function (field) {
                                Ext.ComponentQuery.query('#ctsearch')[0].onSearchKeyUp(field);
                            }
                        }
                    }
                ]
            }
        ]
    },

    onSearchKeyUp: function (field) {
        var me = this;

        //get the store and the value of the field
        var value = field.getValue(),
            store = Ext.getStore('RainSearchStore');

        //first clear any current filters on the store. If there is a new value, then suppress the refresh event
        store.clearFilter(!!value);

        if (value) {

            store.filter([{
                filterFn: function (item) {
                    return item.get('MySearchName').toUpperCase().indexOf(value.toUpperCase()) >= 0;
                }
            }]);

            me.getStore().setData(store.getData().items);
        }
    },

    onSearchClearIconTap: function () {
        var me = this;
        //call the clearFilter method on the store instance
        Ext.getStore('ContactSearchStore').clearFilter();
        me.getStore().removeAll();
    }
});