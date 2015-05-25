/**
 * Created by xiaona on 14-3-4.
 */

Ext.define('WebInspect.view.settings.PushSetting', {
    extend: 'Ext.form.Panel',
    xtype: 'pushsetting',

    requires: [
    ],

    config: {
        title: '推送设置',

        items:[
            {
                xtype: 'fieldset',
                title: '消息推送设置',
                defaults: {
                    labelWidth: '40%'
                },

                items:[
                    {
                        xtype: 'checkboxfield',
                        name: 'news',
                        label: '内网新闻'
                    },
                    {
                        xtype: 'checkboxfield',
                        name: 'info',
                        label: '综合信息'
                    },
                    {
                        xtype: 'checkboxfield',
                        name: 'notice',
                        label: '通知公告'
                    },
                    {
                        xtype: 'checkboxfield',
                        name: 'inspect',
                        label: '海塘巡查'
                    }
                ]
            },
            {
                xtype: 'panel',
                defaults: {
                    xtype : 'button',
                    style: 'min-height: 2.2em;',
                    cls   : 'demobtn',
                    flex  : 1,
                    margin: 10
                },
                layout: {
                    type: 'hbox',
                    align: 'middle'
                },
                items: [
                    {
                        text: '确定',
                        itemId:  'pushconfirm'

                    }]
            }
        ]
    },


    initialize: function(){

        this.onDataSet();
    },

    onCheckValueSet: function(){

        var me = this;

        var store = Ext.create('Ext.data.Store', {

            model: 'WebInspect.model.SettingsModel',
            proxy: {
                type: 'sk'
            }
        });

        store.getProxy().setExtraParams({
            t:'GetPushPersonZt',
            results: WebInspect.app.user.sid + '$jsonp'
        });

        store.load(function(records, operation, success){

            var item = [];
            item.push({xtype: 'checkboxfield',name: 'news',label: '内网新闻',checked: store.getAt(0).data.news});
            item.push({xtype: 'checkboxfield',name: 'info',label: '综合信息',checked: store.getAt(0).data.info});
            item.push({xtype: 'checkboxfield',name: 'notice',label: '通知公告',checked: store.getAt(0).data.notice});
            item.push({xtype: 'checkboxfield',name: 'inspect',label: '海塘巡查',checked: store.getAt(0).data.notice});

            me.getItems().items[0].setItems(item);
        }, this);
    },

    onCheckChange: function(type, checkfield, value){

        var me = this;

        var value1 = 0;
        if(value){
            value1 = 1;
        }

        if(me.tag){

            var results = WebInspect.app.user.sid + '$' + type + ',' + value1 + '$jsonp';

            Ext.data.proxy.SkJsonp.validate('UpdatePushPerson',results,{
                success: function(response) {
                    if(response.success == "true"){

                        plugins.Toast.ShowToast("设置成功！",1000);
                        me.tag = 1;
//                        Ext.Msg.alert('设置成功！');
                    }
                    else{

                        plugins.Toast.ShowToast("设置失败，请重试！",1000);
//                        Ext.Msg.alert('设置失败，请重试！');
                        me.tag = 0;
                        var val = 0;
                        if(value){
                            checkfield.uncheck();
                        }
                        else{
                            checkfield.check();
                        }
                        me.tag = 1;
                    }
                },
                failure: function() {

                    plugins.Toast.ShowToast("请求失败，请重试！",1000);
//                    Ext.Msg.alert('请求失败，请重试！');

                    me.tag = 0;

                    if(value){
                        checkfield.uncheck();
                    }
                    else{
                        checkfield.check();
                    }
                    me.tag = 1;

                }
            });
        }
    },

    onDataSet: function(){

        var me = this;

        var store = Ext.create('Ext.data.Store', {

            model: 'WebInspect.model.SettingsModel',
            proxy: {
                type: 'sk'
            }
        });

        store.getProxy().setExtraParams({
            t:'GetPushPersonZt',
            results: WebInspect.app.user.sid + '$jsonp'
        });

        store.load(function(records, operation, success){
            me.setValues(store.getAt(0).data);
            me.initvalue = store.getAt(0).data;
        });
    },

    onPushRequest: function(){

        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: '努力加载中...'
        });

        var me = this;
        var field = me.getItems().items[0];
        var results = '';

        for(var i=0; i<field.getItems().getCount()-1; i++){

            if(field.getItems().items[i].getChecked()){

                results += field.getItems().items[i].getName() + ',1' + '@';
            }
            else{
                results += field.getItems().items[i].getName() + ',0' + '@';
            }
        }

        results = results.substr(0, results.length - 1);

        results = WebInspect.app.user.sid + '$' + results + '$jsonp';

        Ext.data.proxy.SkJsonp.validate('UpdatePushPerson',results,{
            success: function(response) {

                if(response.success == "true"){

                    Ext.Viewport.setMasked(false);
//                    Ext.Msg.alert('设置成功');
                    plugins.Toast.ShowToast("设置成功！",1000);
                    me.initvalue = me.getValues();
                }
                else{
                    Ext.Viewport.setMasked(false);
//                    Ext.Msg.alert('设置失败，请重试！');
                    plugins.Toast.ShowToast("设置失败，请重试！",1000);
                    me.setValues(me.initvalue);
                }
            },
            failure: function() {
                Ext.Viewport.setMasked(false);
                plugins.Toast.ShowToast("设置失败！",1000);
//                Ext.Msg.alert('设置失败！');
                me.setValues(me.initvalue);
            }
        });
    }
});