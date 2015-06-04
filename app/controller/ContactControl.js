/**
 * Created by kukiss on 2015/3/19 0019.
 */
Ext.define('YzMobile.controller.ContactControl', {
    extend: 'Ext.app.Controller',
    requires: ['Ext.WYTool'],

    config: {
        refs: {
            main: 'main',
            info: 'main info',
            contactSearch: 'contactSearch', // 通讯录搜索界面
            backBtn: '[itemId=backBtn]', // 通讯录的返回按钮
            contactSearchBtn: '[itemId=contactSearch]', // 跳转到通讯录搜索的按钮
            contactList: 'contactList', // 通讯录List
            contactmain: 'info contactmain'
        },

        control: {
            contactList: {
                initialize: function () {
                  //  WYTool.queryComponent('#infomore').show();
                    this.listInfo = {type: 'name', index: 0, value: '', isLast: false}; // list显示需要的相关的参数
                    this.listBackStack = []; // 缓存返回需要的数据
                },
                //show: function () {
                //    debugger;
                //},
                //hide:function(){
                //    WYTool.queryComponent('#infomore').hide();
                //},

                itemtap: 'onContactListTap',
                itemtaphold: 'onContactListLongTap'
            },
            contactSearch : {
                initialize: function () {
                    WYTool.queryComponent('#infofunction').hide();
                    WYTool.queryComponent('#showByWhat').hide();
                    WYTool.queryComponent('#infoBack').hide();


                    var store = Ext.getStore('ContactSearchStore');
                    Ext.data.proxy.SkJsonp.setUrl(localStorage.getItem('proxyUrl'));
                    Ext.data.proxy.SkJsonp.loadStore(store, 'GetAdressSearch', null);
                },

                destroy: function () {
                    if(this.listBackStack.length > 0){
                        WYTool.queryComponent('#infoBack').show();
                        WYTool.queryComponent('#infofunction').hide();
                    }
                },

                itemsingletap: function (list, index, target, record, e, eOpts) {
                    var popup = Ext.create('YzMobile.view.contact.ContactPopup');
                    popup.onDataSet(record);
                    popup.showBy(target);
                }
            },
            contactmain: {
                show: function () {
                    WYTool.queryComponent('#infomore').show();

                },
                hide: function () {
                    WYTool.queryComponent('#infomore').hide();

                }

                //hide: function () {
                //    Ext.ComponentQuery.query('#infomore')[0].hide();
                //}
            },
            '[itemId=showByName]': {
                tap: function () {
                    Ext.ComponentQuery.query('#showByWhat')[0].hide();

                    this.listBackStack.splice(0, this.listBackStack.length); // 移除所有的缓存
                    WYTool.queryComponent('#infoBack').hide();
                    WYTool.queryComponent('#infofunction').show();
                    WYTool.queryComponent('#longTapTip').setHtml('<div style="width:100%;text-align: center; color: #ff0000;margin-top: 10px;">按人员姓名首字母查询</div>');

                    this.listInfo.type = 'name';
                    this.listInfo.index = 0;

                    var store = Ext.getStore('ContactTreeStore');
                    Ext.data.proxy.SkJsonp.setUrl(localStorage.getItem('proxyUrl'));
                    Ext.data.proxy.SkJsonp.loadStore(store, 'GetAdressTree', this.listInfo.type + '$' + this.listInfo.index + '$' + this.listInfo.value + '$false');
                    //store.removeAll();
                    //store.getProxy().setExtraParams({
                    //    t: 'GetAdressTree',
                    //    results: this.listInfo.type + '$' + this.listInfo.index + '$' + this.listInfo.value + '$false'
                    //});
                    //store.load();
                }
            },
            '[itemId=showByArea]': {
                tap: function () {
                    Ext.ComponentQuery.query('#showByWhat')[0].hide();

                    this.listBackStack.splice(0, this.listBackStack.length); // 移除所有的缓存
                    WYTool.queryComponent('#infoBack').hide();
                    WYTool.queryComponent('#infofunction').show();
                    WYTool.queryComponent('#longTapTip').setHtml('<div style="width:100%;text-align: center; color: #ff0000;margin-top: 10px;">长按显示人员信息</div>');

                    this.listInfo.type = 'adcd';
                    this.listInfo.index = 0;

                    var store = Ext.getStore('ContactTreeStore');
                    Ext.data.proxy.SkJsonp.setUrl(localStorage.getItem('proxyUrl'));
                    Ext.data.proxy.SkJsonp.loadStore(store, 'GetAdressTree', this.listInfo.type + '$' + this.listInfo.index + '$' + this.listInfo.value + "$false");
                    //store.removeAll();
                    //store.getProxy().setExtraParams({
                    //    t: 'GetAdressTree',
                    //    results: this.listInfo.type + '$' + this.listInfo.index + '$' + this.listInfo.value + "$false"
                    //});
                    //store.load();
                }
            },
            '[itemId=showByJob]': {
                tap: function () {
                    Ext.ComponentQuery.query('#showByWhat')[0].hide();

                    this.listBackStack.splice(0, this.listBackStack.length); // 移除所有的缓存
                    WYTool.queryComponent('#infoBack').hide();
                    WYTool.queryComponent('#infofunction').show();
                    WYTool.queryComponent('#longTapTip').setHtml('<div style="width:100%;text-align: center; color: #ff0000;margin-top: 10px;">按人员职位查询</div>');

                    this.listInfo.type = 'job';
                    this.listInfo.index = 0;

                    var store = Ext.getStore('ContactTreeStore');
                    Ext.data.proxy.SkJsonp.setUrl(localStorage.getItem('proxyUrl'));
                    Ext.data.proxy.SkJsonp.loadStore(store, 'GetAdressTree', this.listInfo.type + '$' + this.listInfo.index + '$' + this.listInfo.value + '$false');
                    //store.removeAll();
                    //store.getProxy().setExtraParams({
                    //    t: 'GetAdressTree',
                    //    results: this.listInfo.type + '$' + this.listInfo.index + '$' + this.listInfo.value + '$false'
                    //});
                    //store.load();
                }
            },

           '[itemId=contact_search]': {
               tap: function () {
                   WYTool.queryComponent('info').push({xtype:'contactSearch'});
               }
           }
        }
        //
        //    contactSearchBtn: {
        //        tap: function () {
        //            if (this.getInfo() == null) {
        //                this.getMain().setActiveItem(Ext.create('YzMobile.view.Info'));
        //            }
        //            this.getInfo().push(Ext.create('YzMobile.view.contact.ContactSearch'));
        //            this.getMain().setActiveItem(this.getInfo());
        //        }
        //    },
        //
        //    contactSearch: {
        //        initialize: function () {
        //            // 初始化通讯录用的store
        //            Ext.Viewport.setMasked({xtype: 'loadmask', message: '加载中,请稍后...'});
        //            Ext.getStore('ContactSearchStore').load(function (records, operation, success) {
        //                if (!success) {
        //                    plugins.Toast.ShowToast("网络不给力，无法读取数据!", 3000);
        //                }
        //                Ext.Viewport.setMasked(false);
        //            }, this);
        //        }
        //    },
        //
        //    '[itemId=vNameSort]': {
        //        tap: function (me, e, eOpts) {
        //            Ext.ComponentQuery.query('#vPartSort')[0].show();
        //            this.getContactList().getStore().setGrouper({
        //                groupFn: function (record) {
        //                    return record.get('MySearchName')[0];
        //                }
        //            });
        //            this.getContactList().setIndexBar(true);
        //        }
        //    },
        //
        //    '[itemId=vPartSort]': {
        //        tap: function (me, e, eOpts) {
        //            me.hide();
        //            this.getContactList().getStore().setGrouper({
        //                groupFn: function (record) {
        //                    return record.get('ADNM');
        //                }
        //            });
        //            this.getContactList().setIndexBar(false);
        //        }
        //    },
        //
        //    '[itemId=vContactSearch]': {
        //        tap: function () {
        //            this.getMain().setActiveItem(Ext.create('YzMobile.view.contact.ContactSearch'));
        //        }
        //    },
        //
        //    'contactList': {
        //        initialize: function () {
        //            var self = this;
        //
        //            Ext.Viewport.setMasked({xtype: 'loadmask', message: '正在加载中...'});
        //
        //            self.store = Ext.getStore('ContactTreeStore');
        //            self.store.load(function (records, operation, success) {
        //                if (!success) {
        //                    plugins.Toast.ShowToast("网络不给力，无法读取数据!", 3000);
        //                }
        //                Ext.Viewport.setMasked(false);
        //            }, this);
        //        }
        //    },
        //
        //    '[itemId=contactListFilter]': {
        //        tap: function (me, e, eOpts) {
        //            if (!self.contactFilter) {
        //                self.contactFilter = Ext.create(YzMobile.view.contact.ContactFilter);
        //            }
        //            self.contactFilter.showBy(me);
        //        }
        //    },
        //
        //    '[itemId=contactFilterPart]': {
        //        tap: function () {
        //            self.contactFilter.hide();
        //
        //            this.getContactList().getStore().setGrouper({
        //                groupFn: function (record) {
        //                    return record.get('ADNM');
        //                }
        //            });
        //            this.getContactList().setIndexBar(false);
        //        }
        //    },
        //
        //    '[itemId=contactFilterName]': {
        //        tap: function () {
        //            self.contactFilter.hide();
        //
        //            this.getContactList().getStore().setGrouper({
        //                groupFn: function (record) {
        //                    return record.get('MySearchName')[0];
        //                }
        //            });
        //            this.getContactList().setIndexBar(true);
        //        }
        //    }
        //}
    },

    //Gis页面初始化
    onContactInitialize: function () {

        var me = this;
        //me.contactmain = me.getContactmain();
        //if (!me.contactmain) {
        //    me.contactmain = Ext.create('YzMobile.view.contact.ContactMain');
        //}
        me.getInfo().push(Ext.create('YzMobile.view.contact.ContactMain'));
        me.getMain().setActiveItem(me.getInfo());
        var store = Ext.getStore('ContactTreeStore');
        Ext.data.proxy.SkJsonp.setUrl(localStorage.getItem('proxyUrl'));
        Ext.data.proxy.SkJsonp.loadStore(store, 'GetAdressTree', 'name$0$$false');
        //store.getProxy().setExtraParams({
        //    t: 'GetAdressTree',
        //    results: 'name$0$$false'
        //});
        //store.load();
    },

    //打电话
    onContactListTap: function (list, index, target, record, e, eOpts) {

        if (this.isLongTap == true) {
            this.isLongTap = false;
        } else {

            var store = list.getStore('ContactTreeStore');

            if (this.listInfo.isLast == true) {
                var phone = record.get('Mobile');
                window.open('tel:' + phone, '_system');
            } else if (this.listInfo.type == 'name') { // 按姓名显示
                if (this.listInfo.index == 0) {
                    this.listInfo.index = 1;

                    this.listBackStack.push(store.getData().all.slice(0));

                    Ext.ComponentQuery.query('#infoBack')[0].show();
                    Ext.ComponentQuery.query('#infofunction')[0].hide();

                    store.removeAll();
                    Ext.data.proxy.SkJsonp.setUrl(localStorage.getItem('proxyUrl'));
                    Ext.data.proxy.SkJsonp.loadStore(store,'GetAdressTree', 'name$1$' + record.data.Sname + '$false');
                    //store.removeAll();
                    //store.getProxy().setExtraParams({
                    //    t: 'GetAdressTree',
                    //    results: 'name$1$' + record.data.Sname + '$false'
                    //});
                    //store.load();
                } else {
                    var phone = record.get('Mobile');
                    window.open('tel:' + phone, '_system');
                }
            } else if (this.listInfo.type == 'adcd') { // 按行政区划显示
                this.listInfo.index++; // 增加层级

                this.listBackStack.push(store.getData().all.slice(0));

                Ext.ComponentQuery.query('#infoBack')[0].show();
                Ext.ComponentQuery.query('#infofunction')[0].hide();

                store.removeAll();
                Ext.data.proxy.SkJsonp.setUrl(localStorage.getItem('proxyUrl'));
                Ext.data.proxy.SkJsonp.loadStore(store,'GetAdressTree', 'adcd$' + this.listInfo.index + '$' + record.data.Sid + '$false');
                //store.removeAll();
                //
                //if (this.listInfo.index <= 3) {
                //    store.getProxy().setExtraParams({
                //        t: 'GetAdressTree',
                //        results: 'adcd$' + this.listInfo.index + '$' + record.data.Sid + '$false'
                //    });
                //} else {
                //    store.getProxy().setExtraParams({
                //        t: 'GetAdressTree',
                //        results: 'adcd$' + this.listInfo.index + '$' + record.data.Sid + '$false'
                //    });
                //}
                //
                //store.load();

            }
        }

    },

    onBack: function () {
        // 退回先前显示的数据
        var store = Ext.getStore('ContactTreeStore');
        store.setData(this.listBackStack.pop());

        this.listInfo.index--;
        this.listInfo.isLast = false; // 返回后肯定不是显示人员的最后一级

        if (this.listBackStack.length == 0) { // 无缓存时退出到主界面
            Ext.ComponentQuery.query('#infoBack')[0].hide();
            Ext.ComponentQuery.query('#infofunction')[0].show();
        }
    },

    onContactListLongTap: function (list, index, target, record, e, eOpts) {
        this.isLongTap = true; // 防止单击事件触发

        if (this.listInfo.type == 'adcd') {
            var store = list.getStore('ContactTreeStore');

            this.listInfo.index++;
            this.listInfo.isLast = true; // 最后一级list

            this.listBackStack.push(store.getData().all.slice(0));

            Ext.ComponentQuery.query('#infoBack')[0].show();
            Ext.ComponentQuery.query('#infofunction')[0].hide();

            store.removeAll();
            Ext.data.proxy.SkJsonp.setUrl(localStorage.getItem('proxyUrl'));
            Ext.data.proxy.SkJsonp.loadStore(store,'GetAdressTree', 'adcd$' + 'adcd$1$' + record.data.Sid + '$true');
            //store.removeAll();
            //store.getProxy().setExtraParams({
            //    t: 'GetAdressTree',
            //    results: 'adcd$1$' + record.data.Sid + '$true'
            //});
            //store.load();
        }
    },

    //选择按什么显示的panel
    showChioce: function () {
        if (!this.showType) {
            this.showType = Ext.create('Ext.Panel', {
                left: 0,
                padding: 10,
                modal: true,
                hideOnMaskTap: true,
                itemId: 'showByWhat',
                items: [
                    {xtype: 'button', text: '直接搜索', itemId: 'contact_search'},
                    {xtype: 'spacer', height: 10},
                    {xtype: 'button', text: '按姓名', itemId: 'showByName'}, // 按名字显示
                    {xtype: 'spacer', height: 10},
                    {xtype: 'button', text: '按行政区划', itemId: 'showByArea'}, // 按行政区划显示

                ]
            });
        }
        this.showType.showBy(Ext.ComponentQuery.query('#infomore')[0]);
    },

    //按行政区划显示联系人
    showByArea: function () {

    },

    //按职位显示联系人
    showByJob: function () {

    }

});