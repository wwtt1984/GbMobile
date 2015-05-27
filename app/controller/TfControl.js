Ext.define('YzMobile.controller.TfControl', {
    extend: 'Ext.app.Controller',
    config: {

        refs: {
            main: 'main',
            info: 'main info',
            infofunction: '[itemId=infofunction]',
            tfmap: '[itemId=tfmap]',
            tfmain: 'info tfmain',
            tflist: 'info tflist',
            tfamap: 'tfmap',
            infomore: '[itemId=infomore]',
            infosearch: '[itemId=infosearch]',
            startAnimation:'[itemId=startAnimation]',
            stopAnimation:'[itemId=stopAnimation]'
        },

        control: {
            tflist: {
                itemtap: 'onTfListItemTap'
            },
            tfamap:{
                //complete:'OnComplete'
            },
            startAnimation: {
                tap: 'onStartAnimationTap'
            },
            stopAnimation: {
                tap: 'onStopAnimationTap'
            }
        }
    },

    OnComplete:function()
    {
        var me = this;
        this.map =  this.getTfamap().getMap();
        this.map.setZoomAndCenter(YzMobile.app.mapCenter[2], new AMap.LngLat(YzMobile.app.mapCenter[0],YzMobile.app.mapCenter[1]));
        this.map.plugin(["AMap.ToolBar"], function(){
            var toolBar = new AMap.ToolBar();
            me.map.addControl(toolBar);
        });
        //Ext.data.proxy.SkJsonp.setUrl(YzMobile.app.user.global);
        me.mytflist();
        me.getInfosearch().show();
        me.getInfomore().show();
    },

    onTyphoonInitialize: function(){
        var me = this;
        me.tfmain = me.getTfmain();
        if(!me.tfmain){
            me.tfmain = Ext.create('YzMobile.view.typhoon.TfMain');
        }
        me.getInfo().push(me.tfmain);
        me.getMain().setActiveItem(me.getInfo());
        me.OnComplete();
    },

    //取得台风数据(年份列表)
    mytflist: function() {

        Ext.Viewport.setMasked({xtype:'loadmask',message:'数据加载中,请稍后...'});
        var me = this;
        var store = Ext.getStore('TfStore');
        var results = null;
        Ext.data.proxy.SkJsonp.loadStore(store,'GetTFzt',results,{
            success: function(records) {
                Ext.Viewport.setMasked(false);
                if (records.length > 0) {
                    var myDate = new Date();
                    if(records[0].get('tfbh').substr(0,4) == (myDate.getFullYear())) {
                        tfbh = store.getAt(0).get('tfbh');
                        tfname = store.getAt(0).get('tfname');
                        tfactive = store.getAt(0).get('tfactive');
                        //me.tfmain.setTitle(tfname + "（" + tfbh + "）");
                        me.tfname = tfname;
                       me.tfbh = tfbh;
                        me.onTitleBarSet();
                        me.mydate(tfname, tfbh, tfactive);
                    }
                    else
                    {
                        Ext.Msg.alert("提示","当前到现在无台风数据!");
                    }
                }
                else
                {
                    Ext.Msg.alert("提示","暂无台风数据!");
                }

            },
            failure: function() {
                Ext.Viewport.setMasked(false);
            }
        });


        //store.getProxy().setExtraParams({
        //    t: 'GetTFzt'
        //});
        //var tfbh = null, tfname = null, tfactive = null;
        //store.load(function(records, operation, success) {
        //    Ext.Viewport.setMasked(false);
        //    if (records.length > 0) {
        //        var myDate = new Date();
        //        if(records[0].get('tfbh').substr(myDate.getFullYear())) {
        //            tfbh = store.getAt(0).get('tfbh');
        //            tfname = store.getAt(0).get('tfname');
        //            tfactive = store.getAt(0).get('tfactive');
        //            me.tfmain.setTitle(tfname + "（" + tfbh + "）");
        //            me.tfname = tfname;
        //            me.tfbh = tfbh;
        //            me.mydate(tfname, tfbh, tfactive);
        //        }
        //        else
        //        {
        //            Ext.Msg.alert("提示","当前到现在无台风数据!");
        //        }
        //    }
        //    else
        //    {
        //        Ext.Msg.alert("提示","暂无台风数据!");
        //    }
        //}, this);

    },

    onTfListShow: function() {
        var me = this;

        me.tflist = me.getTflist();

        if(!me.tflist){
            me.tflist = Ext.create('YzMobile.view.typhoon.TfList');
        }
        me.getInfofunction().hide();
        me.getApplication().getController('MainControl').getInfosearch().hide();
        me.getInfo().push(me.tflist);

    },

    onTfAnimationShow: function() {
        var me = this;
        if(!me.tfanimation){
            me.tfanimation = Ext.create('YzMobile.view.typhoon.TfAnimation');
        }
        me.tfanimation.showBy(this.getInfomore());
    },

    onTfListItemTap: function(list, index, target, record, e, eOpts){

        if(this.Markermove) this.Markermove.setMap(null);
        var me = this;
        me.tfname = record.data.tfname;
        me.tfbh = record.data.tfbh;
        me.getInfofunction().show();
        me.getApplication().getController('MainControl').getInfosearch().show();
        me.reloadtfsj(record);
        me.getInfo().pop();
        me.getInfo().getNavigationBar().setTitle(record.data.tfname);
    },

    onTitleBarSet: function(){
        var me = this;
        me.getInfo().getNavigationBar().setTitle(me.tfname );
    },


    ////////////////////////////////////////////////////////////////台风列表///////////////////////////////////////////////////////

    //取得台风编号,绘制路径
    mydate: function(tfname,tfbh,tfactive) {

        var me = this;
        if(tfbh != null){
            var store = Ext.getStore('TfDetailStore');
            var results = tfbh;
            Ext.data.proxy.SkJsonp.loadStore(store,'GetTFlj',results,{
                success: function(records) {
                    me.addpolyline(records);
                },
                failure: function() {
                    Ext.Viewport.setMasked(false);
                }
            });


            //me.store.getProxy().setExtraParams({
            //    t: 'GetTFlj',
            //    results: tfbh
            //});
            //me.store.load(function(records, operation, success) {
            //
            //    me.addpolyline(records);
            //
            //    //if(tfactive == '活动台风')
            //    //{
            //    //    var forestore = Ext.getStore('TfForeStore');
            //    //    forestore.getProxy().setExtraParams({
            //    //        t: 'GetTFyblj'
            //    //    });
            //    //    if(forestore.getCount() == 0){
            //    //
            //    //        forestore.load(function(records, operation, success) {
            //    //            me.getForecastPath(tfbh);
            //    //        });
            //    //    }
            //    //    else{
            //    //        me.getForecastPath(tfbh);
            //    //    }
            //    //}
            //}, this);
        }
    },

    reloadtfsj: function(record) {
        this.delpolyline();
        this.delMakers();
        //this.map.setZoom(YzMobile.app.mapCenter[2]);
        this.mydate(record.data.tfname,record.data.tfbh,record.data.tfactive);
    },

    addMarker:function(lat,lng,id,record){

        var marker = new AMap.Marker({
            position:new AMap.LngLat(lng,lat),
            icon:"resources/images/typhoon/001.png",
            offset:new AMap.Pixel(-3,-3),
            extData:{id:id}
        });
        marker.setMap(this.map);  //设置点
        var title = record.get('sj');
        var content = "中心气压：" +  record.get('zxqy') + "&nbsp;&nbsp;百帕<br/>"
                    + "移动速度："+  record.get('ydsd') + "&nbsp;&nbsp;公里/小时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>"
                    + "最大风速："+  record.get('fs') + "&nbsp;&nbsp;米/秒<br/>"
                    + "七级风圈："+  record.get('qjfq') +"&nbsp;&nbsp;公里<br/>"
                    + "七级风圈："+  record.get('sjfq') + "&nbsp;&nbsp;公里<br/>"
                    + "当前经度："+  record.get('jd') + "&nbsp;&nbsp;度<br/>"
                    + "当前维度："+  record.get('wd') + "&nbsp;&nbsp;度";
        //实例化信息窗体
        var infoWindow = new AMap.InfoWindow({
            isCustom:true,  //使用自定义窗体
            content:this.createInfoWindow(title,content),
            offset:new AMap.Pixel(16, -26)//-113, -140
        });

        var me = this;

        AMap.event.addListener(marker,'click',function(){
            infoWindow.open(me.map,marker.getPosition());
        });
        this.Markerarr.push(marker);

        marker.setPosition(new AMap.LngLat(lng,lat));

    },

    createInfoWindow:function(title,content)
    {
        var info = document.createElement("div");
        info.className = "myinfo";
        //可以通过下面的方式修改自定义窗体的宽高
        //info.style.width = "400px";

        // 定义顶部标题
        var me = this;
        var top = document.createElement("div");
        var titleD = document.createElement("div");
        var closeX = document.createElement("img");
        top.className = "myinfo-top";
        titleD.innerHTML = title;
        closeX.src = "resources/images/gis/amap/close2.gif";
        closeX.onclick = function(){me.closeInfoWindow(me)};

        top.appendChild(titleD);
        top.appendChild(closeX);
        info.appendChild(top);

        // 定义中部内容
        var middle = document.createElement("div");
        middle.className = "myinfo-middle";
        middle.style.backgroundColor='white';
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
    },

    delMakers:function() //删除标记点
    {
        if(this.Markerarr) {
            for (var i = 0; i < this.Markerarr.length; i++) {
                this.Markerarr[i].setMap(null);
            }
            this.Markerarr.length = 0;
        }
    },

    delpolyline:function()
    {
        if(this.polyline) this.polyline.setMap(null);
    },

    addpolyline: function(records) {

        var me = this;
        this.lineArr = new Array();//创建线覆盖物节点坐标数组
        this.Markerarr = [];
        var midlat , midlng;
        for(var i = 0;i < records.length; i++)
        {
            var lat = records[i].get('wd');
            var lng = records[i].get('jd');
            var id = "m" + records[i].get('tfbh') + i ;
            this.addMarker(lat,lng,id,records[i]);
            this.lineArr.push(new AMap.LngLat(lng,lat));
            var middle = Math.floor(records.length / 2);
            if(i ==  middle)
            {
                midlat = lat;
                midlng = lng;
            }
            else if(i == records.length - 1)
            {
                this.Markermove = new AMap.Marker({
                    map:this.map,
                    position:new AMap.LngLat(lng,lat),//基点位置
                    icon:"resources/images/typhoon/typhoon.png", //marker图标，直接传递地址url
                    offset:new AMap.Pixel(-20,-20), //相对于基点的位置
                    autoRotation:true
                });

            }
        }

        var polyline = new AMap.Polyline({
            path:this.lineArr, //设置线覆盖物路径
            strokeColor:"#3366FF", //线颜色
            strokeOpacity:1, //线透明度
            strokeWeight:5, //线宽
            strokeStyle:"solid", //线样式
            strokeDasharray:[10,5] //补充线样式
        });
        polyline.setMap(this.map);
        this.map.setFitView();
        this.polyline = polyline;
        this.map.setZoomAndCenter(5, new AMap.LngLat(midlng, midlat));


    //    var date;
    //    var record, map, marker;
    //    var flightPlanCoordinates = [];
    //    var time = [];
    //    this.makerarr = []; //markers集合
    //    var infoarr = [];
    //    var image;
    //    this.infosel = []; //选择info集合
    //    //store.sort("sj", "asc");
    ////        store.sort([
    ////            {
    ////                property : 'sj',
    ////                direction: 'ASC'
    ////            }]);
    //    for (var i = 0; i < store.getCount(); i++) {
    //        record = store.getAt(i);
    //        flightPlanCoordinates.push(new google.maps.LatLng(record.get('wd'), record.get('jd')));
    //        time.push("时间:" + record.get('sj') + "<br>经度:" + record.get('jd') + "<br>纬度" + record.get('wd'));
    //        image = 'resources/images/typhoon/001.png';
    //        if (i == store.getCount() - 1) {
    //            date = store.getAt(i).data;
    //            this.tfwd = store.getAt(i).data.wd;
    //            this.tfjd = store.getAt(i).data.jd;
    //            image = new google.maps.MarkerImage(
    //                'resources/images/typhoon/sw.gif',
    //                new google.maps.Size(32, 32),
    //                new google.maps.Point(0, 0),
    //                new google.maps.Point(16, 16)
    //            )
    //        }
    //        marker = new google.maps.Marker({
    //            position: flightPlanCoordinates[i],
    //            map: this.map,
    //            visible: true,
    //            optimized: false,
    //            icon: image,
    //            title: "wd:" + record.get('wd') + "jd" + record.get('jd')
    //        });
    //        this.makerarr.push(marker);
    //        this.infowindow(marker, time[i]);
    //    }
    //    this.circle(date.wd, date.jd, date.qjfq, date.sjfq);
    //    var symbolOne = {
    //        path: 'M -2,0 0,-2 2,0 0,2 z',
    //        strokeColor: '#F00',
    //        fillColor: '#F00',
    //        fillOpacity: 1
    //    };
    //    this.flightPath = new google.maps.Polyline({
    //        path: flightPlanCoordinates,
    //        strokeColor: "#FF0000",
    //        strokeOpacity: 1.0,
    //        strokeWeight: 2
    //    });
    //    this.flightPath.setMap(this.map);
    },

    onStartAnimationTap:function()
    {
        this.tfanimation.hide();
        if(this.Markermove) {
            this.Markermove.moveAlong(this.lineArr, 500000);
        }
        else{
            Ext.Msg.alert("提示","当前没有可以播放动画的台风!");
        }
    },
    onStopAnimationTap:function()
    {
        this.tfanimation.hide();
        if(this.Markermove) {
            this.Markermove.stopMove();
        }
        else
        {
            Ext.Msg.alert("提示","当前没有可以停止动画的台风!");
        }
    }

})