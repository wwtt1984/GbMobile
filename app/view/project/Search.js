/**
 * Created by USER on 14-4-3.
 */

Ext.define('YzMobile.view.project.Search', {
    extend: 'Ext.List',
    xtype: 'search',

    requires: [],

    config: {
        title: '工情搜索',
        itemId: 'ctsearch',

        cls: 'contact-list',

        pinHeaders: false,

        //itemTpl defines the template for each item in the list
        itemTpl: Ext.create('Ext.XTemplate',
            '<div class="contact-list-item">',
            '    <h1>{rsnm}&nbsp;&nbsp;{MyType}</h1>',
            '</div>'
        ),

        //give it a link to the store instance
        store: {
            model: 'YzMobile.model.SearchModel'
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
        //get the store and the value of the field
        var value = field.getValue(),
            store = Ext.getStore('SearchStore');

        var me = this;

        //first clear any current filters on the store. If there is a new value, then suppress the refresh event
            store.clearFilter(!!value);

        //check if a value is set first, as if it isnt we dont have to do anything
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
       // debugger;
        var me = this;
        //call the clearFilter method on the store instance
        Ext.getStore('SearchStore').clearFilter();
        me.getStore().removeAll();
    }
});