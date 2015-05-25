/**
 * Created by kukiss on 2015/3/11 0011.
 */
Ext.define('YzMobile.controller.ProjectMenuControl', {
    extend: 'Ext.app.Controller',

    initialize: function () {
        this.partType = ''; // 区分是加载水库还是其他
    },

    config: {
        refs: {
            main: 'main',
            info: 'main info',
            projectMenu: 'projectmenu',
            infofunction: '[itemId=infofunction]', // 返回主页面按钮
            modelSearch: '[itemId=modelsearch]', // 搜索水库,大坝等模块
            projectMenuPart: 'projectMenuPart',
            search: 'search', // 搜索页面,
            mapshow: '[itemId=mapshow]',  //观看地图按钮
            projectMenuDetail: 'projectMenuDetail', //工情详细页面,
            gismain: 'info gismain', //地图页面
            amap: 'aimap' //map地图
        },

        control: {
            projectMenu: {
                itemtap: 'loadSks',
                show: function () {
                    this.getModelSearch().show();
                },
                hide: function () {
                    this.getModelSearch().hide();
                }
            },

            modelSearch: {
                tap: function () {
                    this.getInfo().push(Ext.create('YzMobile.view.project.Search'));
                }
            },

            projectMenuPart: {
                initialize: function (list, eOpts) {
                    Ext.Viewport.setMasked({xtype: 'loadmask', message: '加载中,请稍后...'});
                    this.store = Ext.getStore('ProjectMenuPartStore');
                    this.store.removeAll();
                    Ext.data.proxy.SkJsonp.setUrl(localStorage.getItem('proxyUrl'));
                    Ext.data.proxy.SkJsonp.loadStore(this.store, 'GetProjects', this.partType, {
                        success: function () {
                            Ext.Viewport.setMasked(false);
                        },
                        failure: function () {
                            Ext.Viewport.setMasked(false);
                        }
                    });
                    //this.store.getProxy().setExtraParams({
                    //    t: 'GetProjects',
                    //    results: this.partType
                    //});
                    //
                    //this.store.load(function (records, operation, success) {
                    //    if (!success) {
                    //        plugins.Toast.ShowToast("网络不给力，无法读取数据!", 3000);
                    //    }
                    //    Ext.Viewport.setMasked(false);
                    //}, this);

                    var title = '';
                    switch (this.partType) {
                        case 'sk':
                            title = '水库信息';
                            break;
                        case 'sz':
                            title = '水闸信息';
                            break;
                        case 'df':
                            title = '提防信息';
                            break;
                        case 'yb':
                            title = '堰坝信息';
                            break;
                        case 'sdz':
                            title = '水电站信息';
                            break;
                        case 'st':
                            title = '山塘信息';
                            break;
                    }
                    this.getProjectMenuPart().setTitle(title);
                },

                itemsingletap: function (list, index, target, record, e, eOpts) {
                    this.currentRecord = record; //保存

                    var detail = Ext.create('YzMobile.view.project.ProjectMenuDetail');
                    detail.onDataSet(record, record.data.RSNM);
                    this.getInfo().push(detail);
                }
            },


            search: {
                initialize: function () {
                    this.getInfofunction().hide();

                    var store = Ext.getStore('SearchStore');
                    Ext.data.proxy.SkJsonp.setUrl(localStorage.getItem('proxyUrl'));
                    Ext.data.proxy.SkJsonp.loadStore(store, 'GetProjectsSearch', null, {
                        success: function () {
                            Ext.Viewport.setMasked(false);
                        },
                        failure: function () {
                            Ext.Viewport.setMasked(false);
                        }
                    });
                    //store.getProxy().setExtraParams({
                    //    t: 'GetProjectsSearch'
                    //});
                    //store.load(function (records, operation, success) {
                    //    if (!success) {
                    //        plugins.Toast.ShowToast("网络不给力，无法读取数据!", 3000);
                    //    }
                    //    Ext.Viewport.setMasked(false);
                    //}, this);
                },

                itemtap: function (list, index, target, record, e, eOpts) {

                    this.currentRecord = record; //保存
                    var detail = Ext.create('YzMobile.view.project.ProjectMenuDetail');
                    detail.onDataSet(record, record.data.rsnm);
                    this.getInfo().push(detail);
                }
            },

            projectMenuDetail: {
                show: function () {
                    //将info 上的按钮显示
                    this.getMapshow().show();
                },
                hide: function () {
                    //将info 上的按钮显示
                    this.getMapshow().hide();
                }
            },

            //info上面显示地图的按钮
            mapshow: {
                tap: 'onMapShow'
            }
        }
    },

    loadSks: function (list, index, target, record, e, eOpts) {
        this.getInfofunction().hide();
        switch (index) {
            case 0:
                this.partType = 'sk';
                var view = Ext.create('YzMobile.view.project.ProjectMenuPart');
                this.getInfo().push(view);
                break;
            case 1:
                this.partType = 'sz';
                var view = Ext.create('YzMobile.view.project.ProjectMenuPart');
                this.getInfo().push(view);
                break;
            case 2:
                this.partType = 'df';
                var view = Ext.create('YzMobile.view.project.ProjectMenuPart');
                this.getInfo().push(view);
                break;
            case 3:
                this.partType = 'yb';
                this.getInfofunction().show();
                Ext.Msg.alert('暂无堰坝记录');
                //var view = Ext.create('YzMobile.view.project.ProjectMenuPart');
                //this.getInfo().push(view);
                break;
            case 4:
                this.partType = 'sdz';
                var view = Ext.create('YzMobile.view.project.ProjectMenuPart');
                this.getInfo().push(view);
                break;
            case 5:
                this.partType = 'st';
                var view = Ext.create('YzMobile.view.project.ProjectMenuPart');
                this.getInfo().push(view);
                break;

        }
    },

    //在地图上显示
    onMapShow: function () {
        var me = this;
        me.gismain = me.getGismain();
        if (!me.gismain) {
            me.gismain = Ext.create('YzMobile.view.gis.GisMain');
        }

        me.getInfo().push(me.gismain);
        me.getMain().setActiveItem(me.getInfo());

        me.onCreateMarker(this.currentRecord);
    },

    onCreateMarker: function (record) {
        this.map = this.getAmap().getMap();
        this.map.setZoomAndCenter(14, new AMap.LngLat(record.get('X'), record.get('Y')));

        var lat = record.get("Y");
        var lng = record.get("X");
        var stcd = record.get("RSCD");
        var type = record.get("MyType");
        var name = record.get("RSNM");
        if (lat && lng && lat != "0" && lng != "0") {
            var div = this.getDiv(record);
            this.addMarkers(div, lat, lng, type + stcd, stcd, name, type);
        }
    },

    addMarkers: function (div, lat, lng, id, stcd, stnm, type) {//增加标记点

        var marker = new AMap.Marker({
            position: new AMap.LngLat(lng, lat),
            extData: {id: id}
        });
        marker.setMap(this.map);  //设置点
        var markerContent = document.createElement("div");
        markerContent.className = "markerContentStyle2";


        var markerImg = document.createElement("img");
        markerImg.className = "markerlnglat";
        markerImg.src = "resources/images/gis/amap/" + 1 + ".png";
        markerContent.appendChild(markerImg);

        var markerSpan = document.createElement("span");
        markerSpan.innerHTML = div;
        markerContent.appendChild(markerSpan);

        marker.setContent(markerContent);

        var title = "";
        var content = "";

        //实例化信息窗体,并且设置偏移
        //var infoWindow = new AMap.InfoWindow({
        //    isCustom:true,  //使用自定义窗体
        //    //size:new AMap.Size(250, 300),
        //  //  content:this.createInfoWindow(title,content),
        //    offset:new AMap.Pixel(16, -26)//-113, -140
        //});


    },
    //得到有效的数值
    getValueContent: function (value) {
        if (value == '') {
            return '--';
        } else {
            return value;
        }
    },

    getDiv: function (record) {
        var time = "";
        switch (record.data.MyType) {
            case 'sk':
                time = "水库名称：" + record.get('RSNM') + "<br>所属乡镇：" + record.get('ADNM');
                break;
            case 'sz':
                time = "水闸名称:" + record.get('RSNM') + "<br>所属乡镇:" + record.get('ADNM');
                break;
            case 'df':
                time = "堤防名称:" + record.get('RSNM') + "<br>所属乡镇:" + record.get('ADNM');
                break;
            case 'sdz':
                time = "水电站名称:" + record.get('RSNM') + "<br>所属乡镇:" + record.get('ADNM');
                break;
            case 'st':
                time = "山塘名称:" + record.get('RSNM') + "<br>所属乡镇:" + record.get('ADNM');
                break;
        }

        return time;

    }
});