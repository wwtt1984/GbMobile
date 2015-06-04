/**
 * Created by USER on 14-8-13.
 */

Ext.define('YzMobile.controller.MainControl', {
    extend: 'Ext.app.Controller',
    requires: [
    ],

    config: {

        refs: {
            main: 'main',
            login: 'main login',
            maintitle: 'maintitle',
            functionmain: 'functionmain',
            functionlist: '#functionlist',
            confirm: '#confirm',
            info: 'main info',
            infofunction: '[itemId=infofunction]',
            infosearch: '[itemId=infosearch]',
            dateselect: 'dateselect',
            startdate: '[itemId=startdate]',
            enddate: '[itemId=enddate]',
            dateconfirm: '[itemId=dateconfirm]',
            load: '[itemId=load]',
            contactList:'contactList',
            maininfo: 'info maininfo',
            infomore: '[itemId=infomore]',
            floodTree:'floodtree',

            pdfview:'Pdfview'

        },

        control: {
            main: {
                initialize: 'onMainInit'
            },
            confirm: {
                tap: 'onLoginTap'
            },
            functionlist: {
                itemtap: 'onFunctionItemTap'
            },
            info:{
                back: 'onInfoBackTap'
            },
            infofunction: {
                tap: 'onInfoFunctionBackTap'
            },
            infosearch: {
                tap: 'onInfoSearchTap'
            },
            startdate: {
                change: 'onStartDateChange'
            },
            enddate: {
                change: 'onEndDateChange'
            },
            dateconfirm: {
                tap: 'onDateConfirmTap'
            },
            contactList: {},
            infomore: {
                tap: 'onInfoMoreTap'
            },
            '[itemId=login_placePick]': {
                tap: function (button) {
                    var store = Ext.getStore('SiteStore');
                    Ext.data.proxy.SkJsonp.setUrl("http://115.236.2.245:38019/data.ashx");
                    Ext.data.proxy.SkJsonp.loadStore(store, 'GetSite', null);

                    WYTool.queryComponent('main').setActiveItem(Ext.create('YzMobile.view.Site'));
                }
            },
            'site': {
                itemsingletap: function (list, index, target, record, e, eOpts) {
                    localStorage.setItem('siteName', record.data.ScityName);
                    localStorage.setItem('proxyUrl', record.data.SproxyUrl);

                    WYTool.queryComponent('site').destroy();
                    WYTool.queryComponent('main').setActiveItem(WYTool.queryComponent('login'));
                    WYTool.queryComponent('#login_placePick').setHtml(localStorage.getItem('siteName'));


                    ///////

                    // 一些初始化变量
                    //YzMobile.app.mapCenter[0] = record.data.ScenterLng;
                    //YzMobile.app.mapCenter[1] = record.data.ScenterLat;
                    //YzMobile.app.mapCenter[2] = record.data.ScenterZoom;
                    YzMobile.app.user.cityname = record.data.ScityName;
                      localStorage.setItem('cityID',record.data.Scityid);

                    localStorage.setItem('mapLng',record.data.ScenterLng);
                    localStorage.setItem('mapLat',record.data.ScenterLat);
                    localStorage.setItem('mapZoom',record.data.ScenterZoom);

                    Ext.getCmp('name').setValue('');
                    Ext.getCmp('password').setValue('');
                }
            },
            '[itemId=site_back]': {
                tap: function () {
                    WYTool.queryComponent('site').destroy();
                }
            }
        }
    },

    onMainInit: function () {
        var me = this;
        YzMobile.app.mainthis = this;
        me.onBtnConfirm();
        Ext.Date.monthNames = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];

        var url = localStorage.getItem('proxyUrl');
        if (url) {
            Ext.data.proxy.SkJsonp.setUrl(url);
            WYTool.queryComponent('#login_placePick').setHtml(localStorage.getItem('siteName'));
        }

        var uname = localStorage.getItem('uname'), upass = localStorage.getItem('upass'),cityname = localStorage.getItem('siteName');
        if (uname && upass) {
            Ext.getCmp('name').setValue(uname);
            Ext.getCmp('password').setValue(upass);
            YzMobile.app.user.sid = uname;
            YzMobile.app.user.password = upass;
            YzMobile.app.user.cityname = cityname;
            this.onUserCheck();
        }
        //Ext.data.proxy.SkJsonp.setUrl("http://122.227.110.202:8082/WebSerKh/Data.ashx");
        //store.getProxy().setUrl('/your/url');
        //me.getProsk().setUrl("http://122.227.110.202:8082/WebSerKh/Data.ashx");


        //if(window.plugins.jPushPlugin.isPlatformIOS()){
        //    window.plugins.jPushPlugin.setDebugModeFromIos();
        //}


        //me.onUserDataFile();
        //android返回键事件监听s
        //  document.addEventListener("backbutton", me.onBackKeyDown, false);

    },

    onBackKeyDown: function () {
        var me = YzMobile.app.mainthis;
        var mainactive = Ext.Viewport.getActiveItem().getActiveItem().xtype;

        if ((mainactive == "login") || (mainactive == "functionmain")) {
            //当当前页面是“登录”或“主功能页面”时，双击“返回键”退出应用程序
            plugins.Toast.ShowToast("请再点一次退出", 1000);

            document.removeEventListener("backbutton", me.onBackKeyDown, false); // 注销返回键
            document.addEventListener("backbutton", me.onQuitSystemTap, false);//绑定退出事件

            var intervalID = window.setInterval(function () {
                window.clearInterval(intervalID);
                document.removeEventListener("backbutton", me.onQuitSystemTap, false); // 注销返回键
                document.addEventListener("backbutton", me.onBackKeyDown, false); // 返回键

            }, 2000);
        }
        else if (mainactive == "info") {
            document.removeEventListener("backbutton", me.onBackKeyDown, false); // 注销返回键
            me.onBackKeyTap();
        }
        else {
            navigator.app.backHistory();
        }
    },

    //当前页面是其他的页面时，返回上一级页面
    onBackKeyTap: function () {
        var me = YzMobile.app.mainthis;
        var screen = me.getMain();
        var info = screen.getActiveItem();
        var active = info.getActiveItem();
        switch (active.xtype) {

            ////////////////雨情//////////////
            case 'rain':
                me.onInfoFunctionBackTap();
                break;

            //当前汛情界面响应返回键
            case 'maininfo':
                me.onInfoFunctionBackTap();
                break;

            //工情信息界面响应返回键
            case 'projectmenu':
                me.onInfoFunctionBackTap();
                break;

            //通讯录界面响应返回键
            case 'contactmain':
                me.onInfoFunctionBackTap();
                break;

            //防汛预案录界面响应返回键
            case 'planList':
                me.onInfoFunctionBackTap();
                break;

            //系统设置录界面响应返回键
            case 'setting':
                me.onInfoFunctionBackTap();
                break;

            case 'rainbar':
                if (me.dateselect && (me.dateselect.getHidden() == false)) {
                    me.dateselect.hide();
                }
                else {
                    me.getInfosearch().hide();
                    me.getInfo().pop();
                    me.getInfofunction().show();
                }
                break;

            ////////////////水情//////////////
            case 'water':
                me.onInfoFunctionBackTap();
                break;

            case 'waterline':
                if (me.dateselect && (me.dateselect.getHidden() == false)) {
                    me.dateselect.hide();
                }
                else {
                    me.getInfosearch().hide();
                    me.getInfo().pop();
                    me.getInfofunction().show();
                }
                break;

            ////////////////工情//////////////
            case 'projectlist':
                me.onInfoFunctionBackTap();
                break;

            case 'projectdetail':
                me.getInfo().pop();
                me.getInfofunction().show();
                break;

            ////////////////天气预报//////////////
            case 'weather':
                me.onInfoFunctionBackTap();
                break;

            ////////////////气象国土//////////////
            case 'landmain':
                me.onInfoFunctionBackTap();
                break;

            case 'cloud':
                me.getInfo().pop();
                me.getInfofunction().show();
                break;

            case 'radar':
                me.getInfo().pop();
                me.getInfofunction().show();
                break;

            ////////////////GIS应用//////////////
            case 'gismain':
                me.onInfoFunctionBackTap();
                break;
            ////////////////台风信息//////////////
            case 'tfmain':
                me.onInfoFunctionBackTap();
                break;

            case 'tflist':
                me.getInfosearch().show();
                me.getInfo().pop();
                me.getInfofunction().show();
                break;

            ////////////////基本信息//////////////
            case 'baselist':
                me.onInfoFunctionBackTap();
                break;

            case 'basedetail':
                me.getInfosearch().hide();
                me.getInfo().pop();
                me.getInfofunction().show();
                break;
        }

        document.addEventListener("backbutton", me.onBackKeyDown, false); // 返回键
    },


    onQuitSystemTap: function () {
        navigator.app.exitApp(); //////////////////退出系统
    },

    //判断本地文件fail.json中是否有失败记录，若有，则取出放入UploadStore中
    onUserDataFile: function () {
        var me = this;

        Ext.device.FileSystem.requestFileSystem({
            type: LocalFileSystem.PERSISTENT,
            size: 1024 * 1024,
            success: function (fileSystem) {

                me.fs = fileSystem;

                var fe = Ext.create("Ext.device.filesystem.FileEntry", YzMobile.app.local.userfile, fileSystem);

                fe.getEntry(
                    {
                        file: YzMobile.app.local.userfile,
                        options: {create: true},
                        success: function (entry) {

                            fe.read({
                                type: 'text',
                                success: function (data) {

                                    if (data) {
                                        var hq = Ext.JSON.decode(data);

                                        if (hq) {
                                            YzMobile.app.user.sid = hq[0].sid;
                                            YzMobile.app.user.password = hq[0].password;
                                            me.onUserCheck();
                                        }
                                    }

                                },

                                failure: function (error) {
                                    plugins.Toast.ShowToast("不存在记录文件！", 3000);
                                }
                            });
                        },
                        failure: function (error) {
                            plugins.Toast.ShowToast("读取记录文件失败！", 3000);
                        }
                    });
            },
            failure: function (err) {
                plugins.Toast.ShowToast("请求文件系统失败！" + err.code, 3000);
            }
        });
    },

    onBtnConfirm: function () { ////////////////////重写Confirm////////////////////

        if (Ext.MessageBox) {
            var MB = Ext.MessageBox;
            Ext.apply(MB, {
                YES: {text: '确认', itemId: 'yes', ui: 'action'},
                NO: {text: '取消', itemId: 'no'},
                OK: {text: '确定', itemId: 'ok'}
            });
            Ext.apply(MB, {
                YESNO: [Ext.MessageBox.NO, Ext.MessageBox.YES]
            });
        }
    },

    onLoginTap: function () {

      //  localStorage.setItem('siteName', '开化');

        if (!localStorage.getItem('siteName')) {
            Ext.Msg.alert('请先选择一个站点');
            return 0;
        }
        var me = this;
        YzMobile.app.user.sid = Ext.getCmp('name').getValue();
        YzMobile.app.user.password = Ext.getCmp('password').getValue();

        me.onUserCheck();

        // local storage
        //var store = Ext.create('Ext.data.Store', {
        //    model: 'YzMobile.model.Settings'
        //});
        //store.load();
        //store.add({name: 'kukiss', user: '123', pass: '123'});
        //store.sync();

    },

    //用户验证
    onUserCheck: function () {
        var me = this;
        var results = YzMobile.app.user.sid + "$" + YzMobile.app.user.password;
        Ext.Viewport.setMasked({xtype: 'loadmask', message: '登录中,请稍后...'});

        if (YzMobile.app.user.sid && YzMobile.app.user.password) {
            //用户名、密码输入完整
            var store = Ext.getStore('UserStore');
            var results = YzMobile.app.user.sid + '$' + YzMobile.app.user.password + '$' + YzMobile.app.user.version + '$' + YzMobile.app.user.cityname;
            //store.getProxy().setExtraParams({
            //    t: 'Login',
            //    results: results
            //});

            //store.load(function (records, operation, success) {
            //
            //    if (records.length == 0) {
            //        Ext.Viewport.setMasked(false);
            //        plugins.Toast.ShowToast("验证失败！请重新输入！", 3000);
            //    }
            //    else {
            //        Ext.Viewport.setMasked(false);
            //        YzMobile.app.user.name = records[0].data.name;
            //        YzMobile.app.user.mobile = records[0].data.mobile;
            //        records[0].data.password = YzMobile.app.user.password;
            //        Ext.getCmp('maintitle').onDataSet(records[0].data);
            //        me.getMain().setActiveItem(me.getFunctionmain());
            //       // me.onUserWriteJson(store); //将验证成功的用户信息，存在本地
            //       //  me.onCheckVesion(me);  /////////////////判断是否有新版本/////////////////////
            //        //设置别名
            //        //设置tags的时候，传进去的参必须是集合
            //      //  var tagsArr = [YzMobile.app.user.sid];
            //      //  plugins.jPushPlugin.setTags(tagsArr);
            //
            //    }
            //
            //});

            Ext.data.proxy.SkJsonp.setUrl(localStorage.getItem('proxyUrl'));
            Ext.data.proxy.SkJsonp.loadStore(store, 'Login', results, {
                success: function (records) {
                    Ext.Viewport.setMasked(false);
                    if (records.length <= 0) {
                        Ext.Msg.alert('用户名或密码错误');
                        return 0;
                    }

                    // 保存用户登录信息,下次自动登录
                    localStorage.setItem('uname', Ext.getCmp('name').getValue());
                    localStorage.setItem('upass', Ext.getCmp('password').getValue());

                    YzMobile.app.user.name = records[0].data.name;
                    YzMobile.app.user.mobile = records[0].data.mobile;
                    records[0].data.password = YzMobile.app.user.password;
                    Ext.getCmp('maintitle').onDataSet(records[0].data);
                    me.getMain().setActiveItem(me.getFunctionmain());

                    me.onCheckVesion(me);  /////////////////判断是否有新版本/////////////////////

                    //设置别名
                    //设置tags的时候，传进去的参必须是集合
                    var tagsArr = YzMobile.app.user.sid;
                    //  plugins.jPushPlugin.setTags(tagsArr);
                    plugins.jPushPlugin.setAlias(tagsArr);


                    // me.onUserWriteJson(store); //将验证成功的用户信息，存在本地


                },
                failure: function () {
                    Ext.Viewport.setMasked(false);
                    Ext.Msg.alert('网络连接失败,请检查您的网络设置');
                }
            });


        }
        else {
            //用户名、密码输入不完整
            Ext.Viewport.setMasked(false);
            Ext.Msg.alert("用户名和密码不能为空！");
        }


        //注册监听打开通知的事件
        document.addEventListener("jpush.openNotification", me.onOpenNotification, false);
        //注册监听自定义消息事件
        document.addEventListener("jpush.receiveMessage", me.onReceiveMessage, false);


    },


    //接收到通知
    onOpenNotification: function (event) {

        var alertContent;
        //if(device.platform == "Android"){
        //  //  alertContent = plugins.jPushPlugin.onOpenNotification.alert;
        //}else{
        // alertContent = event.aps.alert;
        // }
        // if(Ext.device.Device.platform == "Android"){
        //     alertContent = plugins.jPushPlugin.onOpenNotification.alert
        // }else{
        alertContent = event.aps.alert;

        var content = event.aps.extras.news_id;
        var title = event.aps.extras.my_key;


        // }
         alert(alertContent+content + title);
       // plugins.jPushPlugin.setBadge(0);

        var view = Ext.create('YzMobile.view.rain.RainWarnFromPush');
        view.fillData(alertContent);
        this.getMain().setActiveItem(view);
    },

    //接收到的自定义消息
    onReceiveMessage: function (event) {
        try{
            var content = event.content;
            var title = event.n_title;
            var idnum = event.n_extras.id;
            var type = event.n_extras.type;
            var simgtype = event.n_extras.simgtype;

            Ext.Msg.alert(content+title+idnum+type+simgtype);
        }
        catch(exception){
            console.log("JPushPlugin:onReceiveMessage-->"+exception);
        }
    },


    onUserWriteJson: function (store) {
        var hq = [];
        hq.push({
            sid: YzMobile.app.user.sid,
            name: YzMobile.app.user.name,
            password: YzMobile.app.user.password,
            mobile: YzMobile.app.user.mobile
        });
        var me = this;
        Ext.device.FileSystem.requestFileSystem({
            type: LocalFileSystem.PERSISTENT,
            size: 1024 * 1024,
            success: function (fileSystem) {

                me.fs = fileSystem;
                var fe = Ext.create("Ext.device.filesystem.FileEntry", YzMobile.app.local.userfile, fileSystem);
                fe.getEntry(
                    {
                        file: YzMobile.app.local.userfile,
                        options: {create: true},
                        success: function (entry) {
                            fe.write(
                                {
                                    data: Ext.JSON.encode(hq),
                                    success: function () {
                                        plugins.Toast.ShowToast("用户信息已保存！", 3000);
                                    },
                                    failure: function (error) {
                                        plugins.Toast.ShowToast("用户信息保存失败！请重试！", 3000);
                                    }
                                });
                        },

                        failure: function (error) {
                            plugins.Toast.ShowToast("用户信息获取失败！", 3000);
                        }
                    });
            },

            failure: function (err) {
                plugins.Toast.ShowToast("请求文件系统失败！" + err.code, 3000);
            }
        });
    },

    //监听info页面的“主页面”按钮，点击后，返回“主功能”页面
    onInfoFunctionBackTap: function () {
        var me = this;
        me.getMain().setActiveItem(me.getFunctionmain());
        if (this.getInfo().getActiveItem().xtype == 'gismain') {
            this.getApplication().getController('GisControl').onDestroy();
        }

        if (me.getInfo()) {
            me.getInfo().destroy();
        }
    },

    //info的“返回键”事件，当只有一张页面时，返回至“主功能”页面
    onInfoBackTap: function (view, eOpts) {
        var me = this;
        if (view.getActiveItem() == view.getAt(1)) {
            me.getInfofunction().show();
            me.getInfosearch().hide();

            switch (view.getActiveItem().xtype) {
                case 'tfmain':
                    me.getInfosearch().show();
                    break;
                case 'gismain':
                    me.getInfosearch().show();
                    me.getInfomore().show();
                    break;

            }
        }
    },

    onFunctionItemTap: function (list, index, target, record, e, eOpts) {

        var me = this;

        me.info = me.getInfo();
        if (!me.info) {
            me.info = Ext.create('YzMobile.view.Info');
        }

        me.getMain().add(me.info);

        var titlestr = ['rain', 'water', 'weather', 'land', 'gis', 'typhoon', 'project', 'base', 'contact', 'plan', 'setting', 'flood'];

        switch (record.data.name) {
            case titlestr[0]:
                me.getApplication().getController('RainControl').onRainInitialize();
                me.infotype = 'rain';
                me.searchxtype = 'rain';
                break;
            case titlestr[1]:
                me.getApplication().getController('WaterControl').onWaterInitialize();
                me.infotype = 'water';
                me.searchxtype = 'water';
                break;
            case titlestr[2]:
                me.getApplication().getController('WeatherControl').onWeatherInitialize();
                me.searchxtype = 'weather';
                break;
            case titlestr[3]:
                me.getApplication().getController('LandControl').onLandInitialize();
                break;
            case titlestr[4]:
                me.getApplication().getController('GisControl').onGisMapInitialize();
                me.infotype = 'gis';
                me.searchxtype = "gis";
                break;
            case titlestr[5]:
                me.getApplication().getController('TfControl').onTyphoonInitialize();
                me.searchxtype = 'typhoon';
                me.infotype = 'typhoon';
                break;
            case titlestr[6]:
                me.getApplication().getController('ProjectControl').onProjectInitialize();
                break;
            case titlestr[7]:
                me.getApplication().getController('BaseControl').onBaseInitialize();
                break;
            case titlestr[8]:
                //var view = Ext.create('YzMobile.view.contact.ContactList');
                //me.getMain().setActiveItem(view);//直接显示界面，没有navigationview
                me.infotype = 'contactmain';
                me.getApplication().getController('ContactControl').onContactInitialize();
                break;
            case titlestr[9]:
                me.infotype = 'planlist';
                var view = Ext.create('YzMobile.view.plan.PlanList');
                me.getInfo().push(view);
                me.getMain().setActiveItem(me.getInfo());
                break;
            case titlestr[10]:
                //var view = Ext.create('YzMobile.view.settings.Setting');
                //me.getMain().setActiveItem(view);
                me.getApplication().getController('SettingsControl').onSettingInitialize();
                break;

            case titlestr[11]:
                this.maininfo = this.getMaininfo();
                if (!this.maininfo) {
                    this.maininfo = Ext.create('YzMobile.view.flood.MainInfo');
                }
                this.getInfo().push(this.maininfo);
                this.maininfo.onDataSet();
                this.getMain().setActiveItem(this.getInfo());
                //
                //var floodStore = Ext.getStore('PlanTreeStore');
                //Ext.Viewport.setMasked({xtype: 'loadmask', message: '努力加载中...'});
                //
                //if (!floodStore.getAllCount()) {
                //    floodStore.getProxy().setExtraParams({
                //        t: 'GetTodayList'
                //    });
                //    floodStore.setRoot({expanded: true});
                //}
                //Ext.Viewport.setMasked(false);
                //
                //var floodTree = this.getFloodTree();
                //if (!floodTree) {
                //    floodTree = Ext.create('YzMobile.view.flood.FloodTree');
                //}
                //this.getInfo().push(floodTree);
                //this.getMain().setActiveItem(this.getInfo());
                break;
        }
//        me.getMain().setActiveItem(me.getInfo());
    },

    onInfoSearchTap: function () {

        var me = this;
        switch (me.searchxtype) {
            case 'rain':

            case 'water':
                me.onDateSearchViewShow();
                break;

            case 'weather':
                me.getApplication().getController('WeatherControl').onWeatherPick();
                break;

            case 'gis':
                me.getApplication().getController('GisControl').onInfoSearch();
                break;

            case 'typhoon':
                me.getApplication().getController('TfControl').onTfListShow();
                break;
        }

    },

    onCheckVesion: function (me) {
        var store = Ext.getStore('VersionStore');
        Ext.data.proxy.SkJsonp.setUrl(YzMobile.app.user.global);
        var results = "android$jonsp$"+localStorage.getItem('cityID');
        Ext.data.proxy.SkJsonp.loadStore(store, 'CheckVersion', results, {
            success: function (records) {
                if (records.length > 0) {
                    if (records[0].data.strThisVersion != YzMobile.app.user.version) {
                        Ext.Msg.confirm("当前版本 " + YzMobile.app.user.version,
                            "新版本(" + records[0].data.strThisVersion + ")，是否下载更新？", function (btn) {

                                if (btn == 'yes') {

                                    var filename = records[0].data.strFileName;
                                    var url = records[0].data.strGetNewVersionURL;

                                    document.addEventListener("deviceready", function () {
                                        me.onDeviceReady(me, filename, url);
                                    }, false);
                                }

                            });
                    }
                }
            },
            failure: function () {
                Ext.Msg.alert('网络连接失败,请检查您的网络设置');
            }
        });


//        store.getProxy().setExtraParams({
//            t: 'CheckVersion',
//            results: 'android$jonsp'
//        });
//        store.load(function (records, operation, success) {
//
//            if (records.length > 0) {
//
//                if (records[0].data.strThisVersion != YzMobile.app.user.version) {
//
//                   // window.open("", "_blank");//打开一个新的页面
//
//                    Ext.Msg.confirm("当前版本 " + YzMobile.app.user.version,
//                        "新版本(" + records[0].data.strThisVersion + ")，是否下载更新？", function (btn) {
//                            if (btn == 'yes') {
//
////                                me.load = me.getLoad();
////                                if(!me.load){
////                                    me.load = Ext.create('YzMobile.view.Load',{
////                                        itemId: 'load',
////                                        style: 'height: 20px; position:absolute; top:80%;'
////                                    });
////                                }
////                                me.getLoad().onDataSet(0);
////                                me.getFunctionmain().add(me.load);
////
////                                me.downLoad(records[0].data.strFileName,records[0].data.strGetFileVersionFileURL,me);
//
//                                me.onLoadOrUploadViewShow('更新下载中', '正在下载中');
//                                me.downLoad(records[0].data.strFileName, records[0].data.strGetFileVersionFileURL, me);
//                            }
//                        });
//                }
//            }
//
//        }, this);

    },


    onDeviceReady:function(me,filename,url)
    {
        if(device.platform == "Android") {
            me.onLoadOrUploadViewShow('更新下载中', '正在下载中');
            me.downLoad(filename, url, me);
        }
        else
        {
            me.iosdown(me);
        }
    },

    iosdown:function(me)
    {
        var ll = 'http://122.227.110.202:8082/WebSerKh/index.html';
        window.location.target = "_self";
        window.location.href = ll;

        me.setTimeout(function(me){me.iosdown(me);},800);

    },

    downLoad: function (name, url, me) {

        var uri = encodeURI(url);
        var fileTransfer = new FileTransfer();

        fileTransfer.onprogress = function(progressEvent) {
            if (progressEvent.lengthComputable) {
                var percent = Number((progressEvent.loaded / progressEvent.total) * 100).toFixed(0);
                me.getLoad().onDataSet('更新下载中', '正在下载中', percent);
            } else {
                me.getLoad().hide();
            }
        };

        fileTransfer.download(
            uri,
            "cdvfile://localhost/persistent/Download/" + name,
            function(entry) {
                plugins.Install.InstallApk("mnt/sdcard"+entry.fullPath);
            },
            function(error) {
                me.getLoad().hide();
                Ext.Msg.alert(error.code);
            }
        );
    },

    onLoadOrUploadViewShow: function (header, text) {

        var me = this;

        me.load = me.getLoad();

        if (!me.load) {
            me.load = Ext.create('YzMobile.view.Load');
        }

        if (Ext.os.deviceType.toLowerCase() == "phone") {
            me.load.setMinHeight('35%');
        }

        me.load.onDataSet(header, text, 0);
        if (!me.load.getParent()) {
            Ext.Viewport.add(me.load);
        }
        me.load.show();

    },

    onDateSearchViewShow: function () {
        var me = this;

        me.dateselect = me.getDateselect();

        if (!me.dateselect) {
            me.dateselect = Ext.create('YzMobile.view.DateSelect');
        }

//        if (Ext.os.deviceType.toLowerCase() == "phone") {
        me.dateselect.setMinHeight('55%');
//        }

//        me.dateselect.onDataSet(header, text, 0);
        if (!me.dateselect.getParent()) {
            Ext.Viewport.add(me.dateselect);
        }
        me.dateselect.show();
    },

    onDateSearchViewHide: function () {
        var me = this;
        me.dateselect.hide();
    },

    onStartDateChange: function (datepicker, newDate, oldDate, eOpts) {

        var me = this;

        if (newDate >= new Date()) {
            //plugins.Toast.ShowToast("开始日期应该早于今天！", 3000);
            Ext.Msg.alert("开始日期不能晚于今天！");
            datepicker.setValue(oldDate);
        }
    },

    onEndDateChange: function (datepicker, newDate, oldDate, eOpts) {

        var me = this;

        if (newDate > new Date()) {
            //plugins.Toast.ShowToast("结束日期不能晚于今天！", 3000);
            Ext.Msg.alert("结束日期不能晚于今天！");
            datepicker.setValue(oldDate);
        }
        else if (newDate < me.getStartdate().getValue()) {
            //plugins.Toast.ShowToast("结束不能早于开始日期！", 3000);
            Ext.Msg.alert("结束不能早于开始日期！");
            datepicker.setValue(oldDate);
        }
    },

    onDateConfirmTap: function () {
        var me = this;

        var start = Ext.Date.format(me.getStartdate().getValue(), 'Y-m-d').toString();
        var end = Ext.Date.format(me.getEnddate().getValue(), 'Y-m-d').toString();

        switch (me.searchxtype) {
            case 'rain':
                me.getApplication().getController('RainControl').onRainDayDetailLoad(start, end);
                break;
            case 'water':
                me.getApplication().getController('WaterControl').onWaterDayDetailLoad(start, end);
                break;
        }
    },

    onInfoMoreTap: function ()  /////////////////更多按钮的操作事件
    {
        var me = this;
        switch (me.infotype) {

            case 'typhoon':
                me.getApplication().getController('TfControl').onTfAnimationShow();
                break;
            case 'gis':
                me.getApplication().getController('GisControl').onShowPlace();
                break;
            case 'contactmain':
                me.getApplication().getController('ContactControl').showChioce();
                break;
        }
    }

});