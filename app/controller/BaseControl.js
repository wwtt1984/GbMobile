/**
 * Created by USER on 14-8-15.
 */

Ext.define('YzMobile.controller.BaseControl', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.app.Route'
    ],

    config: {

        refs: {
            main: 'main',
            info: 'main info',
            infofunction: '[itemId=infofunction]',

            baselist: 'info baselist',

            basedetail: 'info basedetail'
        },

        control: {
            baselist: {
                itemtap: 'onBaseItemTap'
            }
        }
    },

    onBaseInitialize: function(){
        var me = this;
        me.onBaseStoreLoad();

        me.baselist = me.getBaselist();
        if(!me.baselist){
            me.baselist= Ext.create('YzMobile.view.base.BaseList');
        }
        me.getInfo().push(me.baselist);
        me.getMain().setActiveItem(me.getInfo());
    },

    onBaseStoreLoad: function(){

        var store = Ext.getStore('BaseStore');

        //store.removeAll();
        //store.getProxy().setExtraParams({
        //    t: 'GetXZxx'
        //});
        //
        //store.load(function(records, operation, success) {
        //    if(!success)
        //    {
        //        plugins.Toast.ShowToast("网络不给力，无法读取数据!",3000);
        //    }
        //    Ext.Viewport.setMasked(false);
        //}, this);
        Ext.data.proxy.SkJsonp.setUrl(localStorage.getItem('proxyUrl'));
        Ext.data.proxy.SkJsonp.loadstore(store, 'GetXZxx', null);
    },

    onBaseItemTap: function(list, index, target, record, e, eOpts){

        var me = this;
        me.basedetail = me.getBasedetail();
        if(!me.basedetail){
            me.basedetail= Ext.create('YzMobile.view.base.BaseDetail');
        }
        me.basedetail.onDataSet(record);
        me.getInfofunction().hide();
        me.getInfo().push(me.basedetail);
    }
});