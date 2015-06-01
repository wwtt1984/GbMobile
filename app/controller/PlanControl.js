/**
 * Created by kukiss on 2015/3/19 0019.
 */
Ext.define('YzMobile.controller.PlanControl', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            main: 'main',
            info: 'main info',
            planSearch: 'planSearch',
            planSearchBtn: '[itemId=planSearch]',
            pdfBtn:'[itemId=pdfbtn]'
        },

        control: {
            planSearch: {
                initialize: function () {
                    //Ext.Viewport.setMasked({xtype: 'loadmask', message: '加载中,请稍后...'});
                    //Ext.getStore('PlanSearchStore').load(function (records, operation, success) {
                    //    if (!success) {
                    //        plugins.Toast.ShowToast("网络不给力，无法读取数据!", 3000);
                    //    }
                    //    Ext.Viewport.setMasked(false);
                    //}, this);
                    Ext.data.proxy.SkJsonp.setUrl(localStorage.getItem('proxyUrl'));
                    Ext.data.proxy.SkJsonp.loadStore(Ext.getStore('PlanSearchStore'), 'GetFxPlanSearch', null);
                }
            },
            planSearchBtn: {
                tap: function () {
                    if (this.getInfo() == null) {
                        this.getMain().setActiveItem(Ext.create('YzMobile.view.Info'));
                    }
                    this.getInfo().push(Ext.create('YzMobile.view.plan.PlanSearch'));
                    this.getMain().setActiveItem(this.getInfo());
                }
            },
            pdfBtn:{
                tap:'onPdfBtn'
            },
            'planList': {
                initialize: function () {
                    var store = Ext.getStore('PlanStore');
                    Ext.data.proxy.SkJsonp.setUrl(localStorage.getItem('proxyUrl'));
                    Ext.data.proxy.SkJsonp.loadStore(store, 'GetFxPlanTree', 'name$0$$false');
                    //store.getProxy().setExtraParams({
                    //    t: 'GetFxPlanTree',
                    //    results: 'name$0$$false'
                    //});
                    //store.load();

                    this.listInfo = {type: 'name', index: 0, isLast: false};
                    this.listBackStack = [];
                },

                itemtap: function (list, index, target, record, e, eOpts) {
                    if (this.listInfo.index == 1) {

                        // 最后一级菜单
                        //Ext.Msg.alert(record.data.Sname);
                        this.pdf = Ext.create('YzMobile.view.plan.PlanPDF');
                        //this.getInfo().destroy();
                       // this.getInfo().push(this.pdf);
                        this.getMain().setActiveItem(this.pdf);


                    } else {
                        // 分级菜单
                        this.listInfo.index++;

                        var store = Ext.getStore('PlanStore');

                        this.listBackStack.push(store.getData().all.slice(0));

                        WYTool.queryComponent('#infofunction').hide();
                        WYTool.queryComponent('#infoBack').show();

                        store.removeAll();
                        Ext.data.proxy.SkJsonp.setUrl(localStorage.getItem('proxyUrl'));
                        Ext.data.proxy.SkJsonp.loadStore(store, 'GetFxPlanTree', 'name$' + this.listInfo.index + '$' + record.data.Sid + '$false');
                        //store.removeAll();
                        //store.getProxy().setExtraParams({
                        //    t: 'GetFxPlanTree',
                        //    results: 'name$' + this.listInfo.index + '$' + record.data.Sid + '$false'
                        //});
                        //store.load();
                    }
                }
            }
        }
    },

    onPdfBtn:function(){
        this.getMain().setActiveItem(this.getInfo());
    },

    onBack: function () {
        this.listInfo.index--;

        Ext.getStore('PlanStore').setData(this.listBackStack.pop());

        if (this.listInfo.index == 0) {
            WYTool.queryComponent('#infofunction').show();
            WYTool.queryComponent('#infoBack').hide();
        }
    }

});
