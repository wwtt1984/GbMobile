/**
 * Created by USER on 14-8-15.
 */

Ext.define('YzMobile.controller.GisControl', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.app.Route'
    ],

    config: {

        refs: {
            main: 'main',
            info: 'main info',
            infofunction: '[itemId=infofunction]',
            gismain: 'info gismain',
            amap: 'aimap',
            amapfilter:'amapfilter',
            mapfilterView:'filterView' , //选择页面

            load: '[itemId=load]',
            gistitle: '[itemId=gistitle]',
            filtersw: '[itemId=filtersw]',// 选择显示站点的按钮
            filteryl: '[itemId=filteryl]',// 选择显示站点的按钮
            filtersk: '[itemId=filtersk]',// 选择显示站点的按钮
            filtersz: '[itemId=filtersz]',// 选择显示站点的按钮
            filterdf: '[itemId=filterdf]',// 选择显示站点的按钮
            filtersdz: '[itemId=filtersdz]',// 选择显示站点的按钮
            filterst: '[itemId=filterst]',// 选择显示站点的按钮
            infomapSearch: 'info mapSearch',
            infomore:  '[itemId = infomore]',
            infosearch:'[itemId = infosearch]',

            toggleselect:'[itemId=toggleselect]', //是否显示预警
            backBtn:'[itemId=backBtn]' //toolbar上的backBtn
        },

        control: {

            filtersw: { change: 'onGisFilter' },
            filteryl: { change: 'onGisFilter' },
            filtersk: { change: 'onGisFilter' },
            filtersz: { change: 'onGisFilter' },
            filterdf: { change: 'onGisFilter' },
            filtersdz: { change: 'onGisFilter' },
            filterst: { change: 'onGisFilter' },
            toggleselect:{ change:'onWarnSelect'},
            backBtn:{tap:'onBackMap'},
            amap:{
                //complete:'OnComplete'
            },
            infomapSearch:{
                itemtap: 'onMapSearchItemTap'
            }
        }
    },

    OnComplete:function()
    {
        this.map = this.getAmap().getMap();
       // this.map.setZoomAndCenter(YzMobile.app.mapCenter[2], new AMap.LngLat(YzMobile.app.mapCenter[0],YzMobile.app.mapCenter[1]));
        this.map.setZoomAndCenter(localStorage.getItem('mapZoom'), new AMap.LngLat(localStorage.getItem('mapLng'),localStorage.getItem('mapLat')));

        this.onWaterRainStoreLoad();
        this.getInfomore().show();
        this.getInfosearch().show();
    },

    onShowPlace:function()
    {
        /*
        if(!this.myfilter){
            this.myfilter = Ext.create('YzMobile.view.gis.AMapFilter');
        }
        this.myfilter.showBy(this.getInfomore());
        */


        //进入到搜索界面
        /*
        if (this.getInfo() == null) {
            this.getMain().setActiveItem(Ext.create('YzMobile.view.Info'));
        }


        this.getInfo().push(Ext.create('YzMobile.view.gis.AMapFilterView'));
        this.getMain().setActiveItem(this.getInfo());
        //隐藏“主页面按钮”
        this.getInfofunction().hide();
         */
        this.getInfomore().hide();
        this.getInfosearch().hide();
        if(!this.myfilter){
            this.myfilter = Ext.create('YzMobile.view.gis.AMapFilterView');
        }
        this.getMain().setActiveItem(this.myfilter);
    },


    onDestroy:function()
    {
        if(this.getMapfilterView())
        {
            this.getMapfilterView().destroy();
            this.myfilter = null;
        }

    },

    onInfoSearch:function()
    {
        this.getInfomore().hide();
        this.getInfosearch().hide();
        //进入到搜索界面
        if (this.getInfo() == null) {
            this.getMain().setActiveItem(Ext.create('YzMobile.view.Info'));
        }

        this.getInfo().push(Ext.create('YzMobile.view.gis.GMapSearch'));
        this.getMain().setActiveItem(this.getInfo());
        //隐藏“主页面按钮”
        this.getInfofunction().hide();
    },

    onGisFilter: function (comman) {

        var filter = "";
        var form = Ext.ComponentQuery.query('formpanel')[1],
            values = form.getValues();
        if (((values.water) ? "yes" : "no") == "yes") {
            filter += "sw,";
        }
        if (((values.rain) ? "yes" : "no") == "yes") {
            filter += "yl,";
        }
        if (((values.nsk) ? "yes" : "no") == "yes") {
            filter += "sk,";
        }
        if (((values.nsz) ? "yes" : "no") == "yes") {
            filter += "sz,";
        }
        if (((values.ndf) ? "yes" : "no") == "yes") {
            filter += "df,";
        }
        if (((values.nsdz) ? "yes" : "no") == "yes") {
            filter += "sdz,";
        }
        if (((values.nst) ? "yes" : "no") == "yes") {
            filter += "st,";
        }
        if (filter.length > 0)
        {
            filter = filter.substr(0, filter.length - 1);
            this.addpolyline(filter);
        }
        else
        {
            this.delMakers();
            Ext.Msg.alert("提示","当前无任何叠加数据！");
        }

    },

    //Gis页面初始化
    onGisMapInitialize: function () {
        var me = this;
        me.gismain = me.getGismain();
        if (!me.gismain) {
            me.gismain = Ext.create('YzMobile.view.gis.GisMain');
        }

        me.getInfo().push(me.gismain);
        me.getMain().setActiveItem(me.getInfo());
        me.OnComplete();
    },

    /////////////////点击搜索结果事件
    onMapSearchItemTap: function(list, index, target, record, e, eOpts){
        this.getInfomore().show();
        this.getInfosearch().show();
        var lat = record.get('Y');
        var lng = record.get('X');
        if(lat && lng){
            var stcd = record.get('MyType') + record.get('STCD') ;
            this.showSingleInfoWindow(stcd,lat,lng);
            this.getInfo().pop();
            this.getMain().setActiveItem(this.getInfo());
            this.getInfofunction().show();

        }else{
            Ext.Msg.alert('你选择的测站在地图上没有显示坐标');
        }
    },

    onWaterRainStoreLoad:function()
    {
        Ext.Viewport.setMasked({xtype:'loadmask',message:'数据加载中,请稍后...'});
        var me = this;
        me.showArr = [];
        me.store = Ext.getStore('WaterRainStore');
        me.store.removeAll();
        var results = null;
        Ext.data.proxy.SkJsonp.setUrl(localStorage.getItem('proxyUrl'));
        Ext.data.proxy.SkJsonp.loadStore(me.store,'GetGisInfo',results,{
            success: function(records) {
                Ext.Viewport.setMasked(false);
                me.addpolyline("sw,yl");
            },
            failure: function() {
                Ext.Viewport.setMasked(false);
            }
        });


        //me.store.getProxy().setExtraParams({
        //    t: 'GetGisInfo'
        //});
        //me.store.load(function (records, operation, success) {
        //
        //    Ext.Viewport.setMasked(false);
        //    if (!success) {
        //      //  plugins.Toast.ShowToast("���粻�������޷���ȡ����!", 3000);
        //    }
        //    else {
        //
        //        me.addpolyline("sw,yl");
        //    }
        //}, this);
    },

    delMakers:function() //删除标记点
    {
        if(this.Markerarr) {
            for (var i = 0; i < this.Markerarr.length; i++) {
                this.Markerarr[i].setMap(null);
            }
            this.Markerarr.length = 0;
            this.cluster.setMap(null);
        }
    },

    addMarkers:function(div ,lat ,lng ,imgindex ,id, comman,stcd,stnm,type){//增加标记点

        var marker = new AMap.Marker({
            position:new AMap.LngLat(lng,lat),
            extData:{id:id}
        });
        marker.setMap(this.map);  //设置点
        this.Markerarr.push(marker);
        var markerContent = document.createElement("div");
        if(comman == "true")
        {
            //表示打开预警的情况下
            markerContent.className = "markerContentStyle";
        }else{
            //表示关闭预警情况下
            markerContent.className = "markerContentStyle2";
        }

        var markerImg = document.createElement("img");
        markerImg.className = "markerlnglat";
        markerImg.src = "resources/images/gis/amap/" + imgindex + ".png";
        markerContent.appendChild(markerImg);

        var markerSpan = document.createElement("span");
        markerSpan.innerHTML = div;
        markerContent.appendChild(markerSpan);

        marker.setContent(markerContent);

        var title = "";
        var content = "";

        //实例化信息窗体
        var infoWindow = new AMap.InfoWindow({
            isCustom:true,  //使用自定义窗体
            //size:new AMap.Size(250, 300),
            content:this.createInfoWindow(title,content),
            offset:new AMap.Pixel(16, -26)//-113, -140
        });

        var me = this;

        AMap.event.addListener(marker,'click',function(){
            infoWindow.open(me.map,marker.getPosition());

            if(type !="sw" && type !="yl") {
                me.getStoreProInfo(stcd, infoWindow, stnm, me, type);
            }
            else
            {
                title = stnm;
                content = "水位雨量站详细信息正在完善中..."
                infoWindow.setContent(me.createInfoWindow(title,content));
            }

            //infoWindow.setContent(me.createInfoWindow("555","666"));
        });

        marker.setPosition(new AMap.LngLat(lng,lat));

    },

    //增加点
    addpolyline: function (filters) {

        if(filters.length > 0)
        {
            this.delMakers();//先删除点的集合
            var arr =  filters.split(",");
            this.Markerarr = [];///marker点集合
            for(var i = 0 ; i < arr.length ; i++) {
                this.getStoreDate(i,arr[i]);
            }
            this.addCluster(0);//增加点聚合。
        }
    },


    getStoreProInfo:function(stcd,infoWindow,stnm,me,type){        ///得到工情详细信息

        var store = Ext.getStore('NameValueStore');
        var me = this;
        store.removeAll();

        var results = type + '$' + stcd;
        Ext.data.proxy.SkJsonp.loadStore(store,'GetProjectsView',results,{
            success: function(records) {
                var title = stnm;
                var content = me.getDivInfo(records);
                infoWindow.setContent(me.createInfoWindow(title,content));
            },
            failure: function() {
                Ext.Viewport.setMasked(false);
            }
        });

        //store.getProxy().setExtraParams({
        //    t: 'GetProjectsView',
        //    results: type + '$' + stcd
        //});
        //store.load(function (records, operation, success) {
        //    if (!success) {
        //        plugins.Toast.ShowToast("网络不给力，无法读取数据!", 3000);
        //    }
        //    else {
        //
        //         var title = stnm;
        //         var content = me.getDivInfo(records);
        //         infoWindow.setContent(me.createInfoWindow(title,content));
        //    }
        //});

    },

    getStoreDate:function(index,stype){    //////数据源处理

        var store = this.store;
        store.clearFilter();
        store.filter("MyType", stype);
        for (var i = 0; i < store.getCount(); i++) {
            record = store.getAt(i);
            var lat = record.get("Y");
            var lng = record.get("X");
            var stcd = record.get("STCD");
            var type = record.get("MyType");
            var name = record.get("STNM");
            var warnzt = record.get("WarnZt"); //是否预警
            if (lat && lng && lat != "0" && lng != "0") {
                var div = this.getDiv(record);
                this.addMarkers(div, lat, lng, index + 1, type + stcd, warnzt,stcd,name,type);
            }
        }

    },

    addCluster:function(tag)
    {
        var me = this;
        this.map.plugin(["AMap.MarkerClusterer"],function(){
            me.cluster = new AMap.MarkerClusterer(me.map,me.Markerarr);
        });
    },

    getDiv:function(record)
    {
        var time ="";
        switch (record.data.MyType){
            case 'sw':
                var ww = this.getValueContent(record.get('VALUE1'));
                var maxWw = this.getValueContent(record.get('VALUE3'));
                time = "水位测站：" + record.get('STNM') + "<br>当前水位：" + ww + " m" + "<br>最大水位：" + maxWw + " m";
                break;
            case 'yl':
                var rw = this.getValueContent(record.get('VALUE3'));
                time = "雨量测站：" + record.get('STNM') + "<br>1h雨量：" + record.get('VALUE3') + " mm";
                break;
            case 'sk':
                time = "水库名称：" + record.get('STNM') + "<br>所属乡镇：" + record.get('VALUE2');
                break;
            case 'sz':
                time = "水闸名称:"+record.get('STNM')+"<br>所属乡镇:"+record.get('VALUE2');
                break;
            case 'df':
                time = "堤防名称:"+record.get('STNM')+"<br>所属乡镇:"+record.get('VALUE1');
                break;
            case 'sdz':
                time = "水电站名称:"+record.get('STNM')+"<br>所属乡镇:"+record.get('VALUE2');
                break;
            case 'st':
                time = "山塘名称:"+record.get('STNM')+"<br>所属乡镇:"+record.get('VALUE1');
                break;
        }

        return time;

    },

    getDivInfo:function(record){

        var content = "";
        for(var i = 0; i < record.length; i++)
        {
            content += record[i].get('type') + "：" + record[i].get('value') + "<br/>";
        }
        return content;
    },

    //得到有效的数值
    getValueContent:function(value){
        if(value == ''){
            return '--';
        }else{
            return value;
        }
    },

    //在地图上显示一个
    showSingleInfoWindow:function(id,lat,lng){

        var bser = "false";
        if(this.Markerarr) {
            for (var i = 0; i < this.Markerarr.length; i++) {
                if(this.Markerarr[i].getExtData().id == id)
                {
                    bser = "true";
                    this.map.setZoomAndCenter(13, new AMap.LngLat(lng,lat));
                    this.Markerarr[i].setAnimation("AMAP_ANIMATION_DROP");
                    break;
                }
            }
        }

        if(bser == "false") Ext.Msg.alert("提示","该点对应的图层未叠加，请先叠加。")
    },

    //选择是否显示预警信息
    onWarnSelect:function(field, newValue, oldValue){

        if(newValue){
            //显示预警
        this.addWarnmarke("true");
        }else
        {
            this.onGisFilter();
        }
    },

    //返回地图
    onBackMap: function () {

        this.getInfomore().show();
        this.getInfosearch().show();
       // this.getMain().setActiveItem(this.getGismain());
       // this.getInfo().show();


        this.getMain().setActiveItem(2);
    },


    //增加预警点
    addWarnmarke: function (filters) {

        var me = this;
        if(filters.length > 0)
        {
            me.delMakers();//先删除点的集合
            var store = this.store;

            this.Markerarr = [];///marker点集合
            store.clearFilter();
            store.filter("WarnZt", filters);
            if(store.getCount() > 0)
            {
                for (var j = 0; j < store.getCount(); j++) {
                    record = store.getAt(j);
                    var lat = record.get("Y");
                    var lng = record.get("X");
                    var stcd = record.get("STCD");
                    var type = record.get("MyType");
                    var warnzt = record.get("WarnZt"); //是否预警
                    if (lat && lng && lat != "0" && lng != "0") {
                        var div = me.getDiv(record);
                        this.addMarkers(div, lat, lng, 1,type + stcd, warnzt);
                    }
                }
            }else{
                Ext.Msg.alert("提示","当前没有超预警的测站点", function () {
                    me.getToggleselect().setValue(0);// 若是没有预警测站点的时候，强制将toggle的值设置为0
                });

            }
        }
    },
    createInfoWindow:function(title,content)
    {
        var info = document.createElement("div");
        info.className = "myinfo";
        //可以通过下面的方式修改自定义窗体的宽高

        // 定义顶部标题
        var me = this;
        var top = document.createElement("div");
        var titleD = document.createElement("div");
        var closeX = document.createElement("img");
        top.className = "myinfo-top";
        titleD.innerHTML = title;
        closeX.src = "resources/images/gis/amap/close2.gif";
        //添加时间
        closeX.onclick = function(){me.closeInfoWindow(me)};

        top.appendChild(titleD);
        top.appendChild(closeX);
        info.appendChild(top);

        // 定义中部内容
        var middle = document.createElement("div");
        middle.className = "myinfo-middle";
        middle.style.backgroundColor='white';
        middle.style.width = "250px";
        middle.style.height = "300px";
        middle.style.overflowY ="scroll";
        middle.innerHTML = content;
        info.appendChild(middle);

        // 定义底部内容
        var bottom = document.createElement("div");
        bottom.className = "myinfo-bottom";
        bottom.style.position = 'relative';
        bottom.style.top = '0px';
        bottom.style.margin = '0 auto';
        var sharp = document.createElement("img");
        sharp.src = "resources/images/gis/amap/sharp.png";
        bottom.appendChild(sharp);
        info.appendChild(bottom);
        return info;
    },

    closeInfoWindow:function(me){
        me.map.clearInfoWindow();
    }

});