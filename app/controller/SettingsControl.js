/**
 * Created by Stiffen on 2015-03-27.
 */

Ext.define('YzMobile.controller.SettingsControl', {
    extend: 'Ext.app.Controller',
    requires: [

    ],
    config: {

        refs: {
            main: 'main',
            info: 'info',
            infofunction: '[itemId=infofunction]',
            setting: 'info setting',
            settinglist: '[itemId=settinglist]',
            pushsetting: 'info pushsetting',
            module: 'info module',
            version: 'info version',
            update: 'info update',
            newscheck: 'checkboxfield[itemId=newscheck]',
            infocheck: 'checkboxfield[itemId=infocheck]',
            noticecheck: 'checkboxfield[itemId=noticecheck]',
            sysquit: '[itemId=sysquit]',
            moduleconfirm: '[itemId=moduleconfirm]',
            pushconfirm: '[itemId=pushconfirm]',
            changeuser: '[itemId=changeuser]',
            modulefield: '[itemId=modulefield]'
        },

        control: {
            settinglist: {
                initialize: function () {
                    Ext.ComponentQuery.query('#infomore')[0].hide();
                    Ext.ComponentQuery.query('#modelsearch')[0].hide();
                },
                itemtap: 'onSettingListTap'
            },
            pushconfirm: {
                tap: 'onPushConfirmTap'
            },
            sysquit: {
                tap: 'onQuitSystemTap'
            },
            moduleconfirm: {
                tap: 'onModuleConfirmTap'
            },
            changeuser: {
                tap: 'onChangeUserTap'
            }
        }
    },

    onSettingInitialize: function(){
        var store = Ext.getStore('SettingStore');
        store.load();
        this.setting = this.getSetting();
        if(!this.setting){
            this.setting = Ext.create('YzMobile.view.settings.Setting');
        }
        this.getInfo().push(this.setting);
        this.getMain().setActiveItem(this.getInfo());
    },

    onSettingListTap: function(list, index, target, record, e, eOpts ){

        var me = this;
        var titlestr = ['pushsetting', 'module', 'version', 'update','qrcode'];

        switch(record.data.name){
            case titlestr[0]:
                //me.onPushSettingSet();
                Ext.Msg.alert("系统建设中...");
                break;
            case titlestr[1]:
                //me.onModuleSet();
                Ext.Msg.alert("系统建设中...");
                break;
            case titlestr[2]:
                //me.onVersionSet();
                Ext.Msg.alert("系统建设中...");
                break;
            case titlestr[3]:
                //me.onUpdateSet();
                Ext.Msg.alert("系统建设中...");
                break;
            case titlestr[4]:
                //me.onQrCodeSet();
                Ext.Msg.alert("系统建设中...");
                break;
        }
    },

    onPushSettingSet: function(){
        var me = this;
        me.pushsetting = me.getPushsetting();
        if(!me.pushsetting){
            me.pushsetting = Ext.create('WebInspect.view.settings.PushSetting');
        }
        me.getInfofunction().hide();
        me.getInfo().push(me.pushsetting);
    },

    onPushConfirmTap: function(){
        var me = this;
        me.getPushsetting().onPushRequest();
    },

    onModuleSet: function(){
        var me = this;

        me.module = me.getModule();
        if(!me.module){
            me.module = Ext.create('WebInspect.view.settings.Module');
        }
        me.getInfofunction().hide();
        me.getModulefield().setItems(me.getApplication().getController('MainControl').moduledata);
        me.module.onDataSet();
        me.getInfo().push(me.module);
    },

    onQrCodeSet: function(){
        var me = this;
        plugins.barcodeScanner.scan(function(result){me.getQrSuccess(result,me);}, me.getQrFail);
    },

    getQrSuccess:function(result,me)
    {

        var name = this.getQrLastName(result.text);

        alert(name);
        if(name == ".apk" || name =='.APK')
        {
            me.getApplication().getController('MainControl').downLoad('qgjapp.apk', result.text, WebInspect.app.mainthis);
        }
    },

    getQrLastName:function(name)
    {
        var result =/\.[^\.]+/.exec(name);
        return result;
    },

    getQrFail:function()
    {
        plugins.Toast.ShowToast("扫码失败，请重试！",2000);
    },

    onModuleConfirmTap: function(){
        var me = this;
        me.getModule().onModuleRequest();
    },

    onVersionSet: function(){
        var me = this;

        me.version = me.getVersion();
        if(!me.version){
            me.version = Ext.create('WebInspect.view.settings.Version');
        }
        me.getInfofunction().hide();
        me.version.onDataSet();
        me.getInfo().push(me.version);
    },

//    onNewsCheckChange: function(toggle, newValue, oldValue, eOpts){
//
//        var me = this;
//
//        me.getPushsetting().onCheckChange('news', me.getNewscheck(), newValue);
//
//    },
//
//    onInfoCheckChange: function(toggle, newValue, oldValue, eOpts){
//        var me = this;
//
//        me.getPushsetting().onCheckChange('info', me.getInfocheck(), newValue);
//    },
//
//    onNoticeCheckChange: function(toggle, newValue, oldValue, eOpts){
//        var me = this;
//
//        me.getPushsetting().onCheckChange('notice', me.getNoticecheck(), newValue);
//    },

    onUpdateSet: function(){
        var me = this;

        me.update = me.getUpdate();
        if(!me.update){
            me.update = Ext.create('WebInspect.view.settings.Update');
        }
        me.getInfofunction().hide();
        me.update.onDataSet();
        me.getInfo().push(me.update);
    },

    onQuitSystemTap: function(){
        var me = this;
        me.getApplication().getController('MainControl').onQuitSystemTap();
    },

    onChangeUserTap: function(){
        var me = this;
        var src = me.getMain();
        me.getInfo().destroy();

        // 删除用户登录信息
        localStorage.removeItem('uname');
        localStorage.removeItem('upass');

        src.setActiveItem(me.getApplication().getController('MainControl').getLogin());
    }

})