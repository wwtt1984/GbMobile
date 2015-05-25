/**
 * Created by USER on 14-7-15.
 */

Ext.define('YzMobile.view.gis.GMap', {
//    id: 'TfMap',
    extend: 'Ext.Map',
    xtype: 'gmap',


    config: {
        itemId: 'gmap',
//        margin: '25px 0 0 0'
        height: '100%'

    },


    initialize:function()
    {
       // this.arr= ['sw'];
        this.onWaterRainStoreLoad();

    },


    onWaterRainStoreLoad: function () {

        Ext.Viewport.setMasked({xtype:'loadmask',message:'加载中,请稍后...'});
        var me = this;
        me.showArr = [];//搜索显示的record的数租
        me.stationArr = [true,false,false,false,false,false,false];// 声明一个状态数组
        me.store = Ext.getStore('WaterRainStore');
        me.store.removeAll();
        me.store.getProxy().setExtraParams({
            t: 'GetGisInfo'
        });
        me.store.load(function (records, operation, success) {

            Ext.Viewport.setMasked(false);
            if (!success) {
                plugins.Toast.ShowToast("网络不给力，无法读取数据!", 3000);
                Ext.Viewport.setMasked(false);
            }
            else {
                var arr = [];
                me.addpolyline(me.store,arr);
            }
        }, this);
    },

    //生成台风路径以及台风数据点上的提示信息
    addpolyline: function (store,arr1) {

        var me = this;
        me.map = this.getMap();
        me.markers = []; //存放显示在地图上面的marker

        //将搜索到得站点删除
         me.deleteSearchStation();

        //store.filter('MyType','sw');


        store.clearFilter();


       // if(zt == "f") {
            if (arr1.length == 0) {
                arr1 = ['sw'];
            }
       // }
        store.filterBy(function(record,id){
            var name = record.get('MyType');
            switch (arr1.length){
                case 1:
                    return name == arr1[0];
                break;
                case 2:
                    return name == arr1[0] || name == arr1[1];
                break;
                case 3:
                    return name == arr1[0] || name == arr1[1] || name == arr1[2];
                break;
                case 4:
                    return name == arr1[0] || name == arr1[1] || name == arr1[2] || name == arr1[3];
                break;
                case 5:
                    return name == arr1[0] || name == arr1[1] || name == arr1[2] || name == arr1[3] || name == arr1[4];
                break;
                case 6:
                    return name == arr1[0] || name == arr1[1] || name == arr1[2] || name == arr1[3] || name == arr1[4] || name == arr1[5];
                break;
                case 7:
                    return name == arr1[0] || name == arr1[1] || name == arr1[2] || name == arr1[3] || name == arr1[4] || name == arr1[5] || name == arr1[6];
                break;
                default:
                    return null;
                    break;
            }
        })
        for (var i = 0; i < store.getCount(); i++) {
            record = store.getAt(i);
            if(record.data.Y && record.data.X && record.data.Y != "0" && record.data.X != "0") {
                var latlng = new google.maps.LatLng(record.data.Y, record.data.X);
                var time,image;
                switch (record.data.MyType){
                    case 'sw':
                        var ww = this.getValueContent(record.get('VALUE1'));
                        var maxWw = this.getValueContent(record.get('VALUE3'));
                        time = "测站：" + record.get('STNM') + "<br>水位：" + ww + " m" + "<br>最大水位：" + maxWw + " m";
                        var image = 'resources/images/gis/y.png';
                        break;
                    case 'yl':
                        var rw = this.getValueContent(record.get('VALUE3'));
                         time = "测站：" + record.get('STNM') + "<br>雨量：" + record.get('VALUE3') + " mm";
                         image = 'resources/images/gis/s.png';
                        break;
                    case 'sk':
                        time = "水库名称：" + record.get('STNM') + "<br>所属乡镇：" + record.get('VALUE2');
                        image = 'resources/images/gis/sk.png';
                        break;
                    case 'sz':
                        time = "水闸名称:"+record.get('STNM')+"<br>所属乡镇:"+record.get('VALUE2');
                        image = 'resources/images/gis/Y1.png';
                        break;
                    case 'df':
                        time = "堤防名称:"+record.get('STNM')+"<br>所属乡镇:"+record.get('VALUE1');
                        image = 'resources/images/gis/difang.png';
                        break;
                    case 'sdz':
                        time = "水电站名称:"+record.get('STNM')+"<br>所属乡镇:"+record.get('VALUE2');
                        image = 'resources/images/gis/shuidianzhan.png';
                        break;
                    case 'st':
                        time = "山塘名称:"+record.get('STNM')+"<br>所属乡镇:"+record.get('VALUE1');
                        image = 'resources/images/gis/shantang.png';
                        break;
                }
                var marker = new google.maps.Marker({
                    position: latlng,
                    map:me.map,
                    visible:true,
                    optimized:false,
                    icon:image,
                    title:record.get('STCD')
                });
                me.markers.push(marker);
                me.infowindow(marker,time);
            }
        }

        me.map = me.getMap();
        var latlng = new google.maps.LatLng(YzMobile.app.mapCenter[1], YzMobile.app.mapCenter[0]);
        me.map.setZoom(YzMobile.app.mapCenter[2]);
        me.map.setCenter(latlng);
        me.markerCluster = new MarkerClusterer(me.map, me.markers);


        //Ext.Viewport.setMasked({xtype: 'loadmask', message: '正在加载中...'});
        //var me = this;
        //
        //var record, marker;
        //
        //var flightPlanCoordinates = [];
        //var time = [];
        //me.makerarr0 = []; //markers集合(水位)
        //me.makerarr1 = []; //markers集合(雨量)
        //me.makerarr2 = []; //markers集合(水库)
        //me.makerarr3 = []; //makers集合(水闸)
        //me.makerarr4 = []; //makers集合（堤防）
        //me.makerarr5 = []; //makers集合(水电站)
        //me.makerarr6 = []; //makers集合(山塘)
        //var image;
        //
        //
        //for (var i = 0; i < store.getAllCount(); i++) {
        //    record = store.getAt(i);
        //    var latlng = new google.maps.LatLng(record.data.Y, record.data.X);
        //    flightPlanCoordinates.push(latlng);
        //
        //    switch (record.data.MyType) {
        //
        //        case 'sw':
        //            me.onWaterStationShow(record, me);
        //            break;
        //
        //        case 'yl':
        //            me.onRainStationShow(record, me);
        //            break;
        //        case  'sk':
        //            me.onWaterRainStationShow(record, me);
        //            break;
        //        case 'sz':
        //            me.onWaterZhaStationShow(record, me);
        //            break;
        //        case 'df':
        //            me.onEmbankmentStationShow(record, me);
        //            break;
        //        case 'sdz':
        //            me.onHydropowerStationShow(record,me);
        //            break;
        //        case 'st':
        //            me.onShantangStationShow(record, me);
        //            break;
        //
        //    }
        //}
    },


    //得到有效的数值
    getValueContent:function(value){
        if(value == ''){
            return '--';
        }else{
            return value;
        }
    },

    /*
    //水位站显示
    onWaterStationShow: function (record, me) {
        if(record.get('Y') && record.get('X')){
            var flightPlanCoordinates = new google.maps.LatLng(record.get('Y'), record.get('X'));
            var ww = this.getValueContent(record.get('VALUE1'));
            var maxWw = this.getValueContent(record.get('VALUE3'));
            var time = "测站：" + record.get('STNM') + "<br>水位：" + ww + " m" + "<br>最大水位：" + maxWw + " m";
            var image = 'resources/images/gis/y.png';

            var marker = new google.maps.Marker({
                position: flightPlanCoordinates,
                map: me.getMap(),
                visible: true,
                optimized: false,
                icon: image,
                title: record.get('STCD')
            });

            me.makerarr0.push(marker);

            me.infowindow(marker, time);
        }

    },


    //雨量站显示
    onRainStationShow: function (record, me) {

        if(record.get('Y') && record.get('X')){
            var flightPlanCoordinates = new google.maps.LatLng(record.get('Y'), record.get('X'));

            var rw = this.getValueContent(record.get('VALUE3'));
            var time = "测站：" + record.get('STNM') + "<br>雨量：" + record.get('VALUE3') + " mm";
            var image = 'resources/images/gis/s.png';

            var marker = new google.maps.Marker({
                position: flightPlanCoordinates,
                map: null,
                visible: true,
                optimized: false,
                icon: image,
                title: record.get('STCD')
            });

            me.makerarr1.push(marker);

            me.infowindow(marker, time);
        }
    },


    //水库站显示
    onWaterRainStationShow: function (record, me) {

        if(record.get('X') && record.get('Y')){
            var flightPlanCoordinates = new google.maps.LatLng(record.get('Y'), record.get('X'));
            var time = "水库名称：" + record.get('STNM') + "<br>所属乡镇：" + record.get('VALUE2');
            var image = 'resources/images/gis/sk.png';

            var marker = new google.maps.Marker({
                position: flightPlanCoordinates,
                map: null,
                visible: true,
                optimized: false,
                icon: image,
                title: record.get('STCD')
            });

            me.makerarr2.push(marker);

            me.infowindow(marker, time);
        }
    },


    //水闸站显示
    onWaterZhaStationShow:function(record,me){
        if(record.get('X') && record.get('Y')){
            var flightPlanCoordinates = new google.maps.LatLng(record.get('Y'),record.get('X'));
            var time = "水闸名称:"+record.get('STNM')+"<br>所属乡镇:"+record.get('VALUE2');
            var image = 'resources/images/gis/Y1.png';

            var marker = new google.maps.Marker({
                position:flightPlanCoordinates,
                map:null,
                visible:true,
                optimized:false,
                icon:image,
                title:record.get('STCD')

            });
            me.makerarr3.push(marker);
            me.infowindow(marker,time);
        }
    },


    //提防站显示
    onEmbankmentStationShow:function(record, me){
        if(record.get('X') && record.get('Y')){
            var flightPlanCoordinates = new google.maps.LatLng(record.get('Y'), record.get('X'));
            var time = "堤防名称:"+record.get('STNM')+"<br>所属乡镇:"+record.get('VALUE1');
            var image = 'resources/images/gis/difang.png';

            var marker = new google.maps.Marker({
                position:flightPlanCoordinates,
                map:null,
                visible:true,
                optimized:false,
                icon:image,
                title:record.get('STCD')
            });
            me.makerarr4.push(marker);
            me.infowindow(marker,time);
        }
    },

    //水电站显示
    onHydropowerStationShow:function(record,me){

        if(record.get('X') && record.get('Y')){
            var flightPlanCoordinate = new google.maps.LatLng(record.get('Y'), record.get('X'));
            var time = "水电站名称:"+record.get('STNM')+"<br>所属乡镇:"+record.get('VALUE2');
            var image = 'resources/images/gis/shuidianzhan.png';

            var marker = new google.maps.Marker({
                position:flightPlanCoordinate,
                map:null,
                visible:true,
                optimized:false,
                icon:image,
                title:record.get('STCD')
            });

            me.makerarr5.push(marker);
            me.infowindow(marker, time);
        }
    },

    //山塘站显示
    onShantangStationShow:function(record, me){
        if(record.get('X') && record.get('Y')){
            var flightPlanCoordinate = new google.maps.LatLng(record.get('Y'),record.get('X'));
            var time = "山塘名称:"+record.get('STNM')+"<br>所属乡镇:"+record.get('VALUE1');
            var image = 'resources/images/gis/shantang.png';

            var marker = new google.maps.Marker({
                position:flightPlanCoordinate,
                map:null,
                visible:true,
                optimized:false,
                icon:image,
                title:record.get('STCD')
            });
            me.makerarr6.push(marker);
            me.infowindow(marker, time);
        }
    },

*/
    //在地图上显示一个
    showSingleInfoWindow:function(record){
        var me = this;
        me.stationArr = [false,false,false,false,false,false,false];
        //if(me.showArr.length){
        //    //将上次搜索得到的marker隐藏起来
        //    me.onStationHide(me.showArr);
        //    me.showArr.pop();//将上一次搜索得到的marker从这个数组里面移除
        //}
        me.deleteSearchStation();
        //删除聚合里面的点，只显示搜索到得站点
        me.markerCluster.clearMarkers();
        me.filterMaker(record);
    },

    //将搜索到得站点删除
    deleteSearchStation:function(){
        var me = this;
        if(me.showArr.length){
            //将上次搜索得到的marker隐藏起来
            me.onStationHide(me.showArr);
            me.showArr.pop();//将上一次搜索得到的marker从这个数组里面移除
        }
    },


//弹出提示信息
    infowindow: function (marker, content) {

        var me = this;
        var infowindow = new google.maps.InfoWindow(
            {
                content: content,
                size: new google.maps.Size(50, 50)
            });
        infowindow.open(me.getMap(), marker);

        google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(me.getMap(), marker);
        });
    },

    onStationHide: function (makerarr) {
        for (var i in makerarr) {
            makerarr[i].setMap(null);
        }
    },

    onStationShow: function (makerarr) {
        var me = this;
        me.map = me.getMap();
        for (var i in makerarr) {
            makerarr[i].setMap(me.map);
        }
    },


    filterMaker: function(record){
        var me = this;
        var time,image;
        switch(record.get('MyType')){
            case 'sw':
                var ww = this.getValueContent(record.get('VALUE1'));
                var maxWw = this.getValueContent(record.get('VALUE3'));
                time = "测站：" + record.get('STNM') + "<br>水位：" + ww + " m" + "<br>最大水位：" + maxWw + " m";
                var image = 'resources/images/gis/y.png';
                break;
            case 'yl':
                var rw = this.getValueContent(record.get('VALUE3'));
                time = "测站：" + record.get('STNM') + "<br>雨量：" + record.get('VALUE3') + " mm";
                image = 'resources/images/gis/s.png';
                break;
            case 'sk':
                time = "水库名称：" + record.get('STNM') + "<br>所属乡镇：" + record.get('VALUE2');
                image = 'resources/images/gis/sk.png';
                break;
            case 'sz':
                time = "水闸名称:"+record.get('STNM')+"<br>所属乡镇:"+record.get('VALUE2');
                image = 'resources/images/gis/Y1.png';
                break;
            case 'df':
                time = "堤防名称:"+record.get('STNM')+"<br>所属乡镇:"+record.get('VALUE1');
                image = 'resources/images/gis/difang.png';
                break;
            case 'sdz':
                time = "水电站名称:"+record.get('STNM')+"<br>所属乡镇:"+record.get('VALUE2');
                image = 'resources/images/gis/shuidianzhan.png';
                break;
            case 'st':
                time = "山塘名称:"+record.get('STNM')+"<br>所属乡镇:"+record.get('VALUE1');
                image = 'resources/images/gis/shantang.png';
                break;
        }
        var latlng = new google.maps.LatLng(record.data.Y, record.data.X);
        var marker = new google.maps.Marker({
            position: latlng,
            visible:true,
            map:me.getMap(),
            optimized:false,
            icon:image,
            title:record.get('STCD')
        });
        me.infowindow(marker,time);
        me.showArr.push(marker);

        /*
        var length = me.markers.length;


        var maker;
        for(var i= 0; i<length; i++){
            if(me.markers[i].title == record.get('STCD')){
                maker = me.markers[i];
                break;
            }
        }

        maker.setMap(me.getMap());
         */
    }
});