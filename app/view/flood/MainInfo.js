/**
 * Created by Stiffen on 2015-03-30.
 */

Ext.define('YzMobile.view.flood.MainInfo', {
    extend: 'Ext.Panel',
    xtype: 'maininfo',
    requires: [
        'Ext.XTemplate'
    ],
    config: {
        itemId: 'imaininfo',
        title: '当前汛情',
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        style: 'background:#f7f7f7;',
        layout: 'fit',

        tpl: Ext.create('Ext.XTemplate',

            '<div class="tidetime" style="padding:0 0 0 10px;width:100%; height: 2em; font-size:18px; font-weight: bold; line-height: 2em; color:#000;"><img src="resources/images/001.png" style="width:20px;height:20px;float:left;margin-top:0.45em;"/>当日最大降雨值情况</div>',
            //'<div style="height: 2.2em; font-size:15px; line-height: 2.2em;margin:0 15px 0px 15px;">',
            '<div style="width:70%;height:100%;float:right;text-align: center;">',
           // '</div>',
            '</div>',
            '<div style="min-height:4.4em;margin:0 10px 10px 10px; border: 1px #ccc solid; background: #fff;  font-size:16px; font-weight: bold; line-height: 2.2em;border-radius: .6em;text-align:center; color: #333;">',
            '<div style="height:2.2em; width: 100%; border-bottom: 1px #ccc solid;">',
            '<div style="height: 100%; width: 30%; float:left;">1小时降雨值</div>',
            '<div style="height: 100%; width: 35%; float:left;">3小时降雨值</div>',
            '<div style="height: 100%; width: 35%; float:right;">当日降雨值</div>',
            '</div>',
            '<div style="height:2.2em; width: 100%;">',
            '<div style="height: 100%; width: 30%; float:left;color: blue;" id={[this.getLinkId(values,values.Maxr1hName,"R")]}>{[this.getMaxRain(values.Maxr1hValue)]}</div>',
            '<div style="height: 100%; width: 35%; float:left;color: blue;" id={[this.getLinkId(values,values.Maxr3hName,"R")]}>{[this.getMaxRain(values.Maxr3hValue)]}</div>',
            '<div style="height: 100%; width: 35%; float:right;color: blue;" id={[this.getLinkId(values,values.Maxr24hName,"R")]}>{[this.getMaxRain(values.Maxr24hValue)]}</div>',
            '</div>',
            '</div>',
            '{[this.getTodayYlOverCode(values.Maxr1hName)]}',
            '<div class="tidetime" style="padding:0 0 0 10px;width:100%; height: 2em; font-size:18px; font-weight: bold; line-height: 2em; color:#000;"><img src="resources/images/001.png" style="width:20px;height:20px;float:left;margin-top:0.45em;"/>当日警戒雨量站个数</div>',
            '<div style="height: 2.2em; font-size:15px; line-height: 2.2em;margin:0 15px 0 15px;">',
            '<div style="width:30%;height:100%;float:left;">单位:个</div>',
            '<div style="width:70%;height:100%;float:right;text-align: center;">',
            //'<div style="height:100%;width:34%;float:left;"><img src="resources/images/status/blue.png" style="height:10px;width:10px;">&nbsp;</div>',
            //'<div style="height:100%;width:33%;float:left;"><img src="resources/images/status/yellow.png" style="height:10px;width:10px;">&nbsp;></div>',
            //'<div style="height:100%;width:33%;float:left;"><img src="resources/images/status/red.png" style="height:10px;width:10px;">&nbsp;></div>',
            '</div>',
            '</div>',
            '<div style="min-height:4.4em;margin:0 10px 0 10px; border: 1px #ccc solid; background: #fff;  font-size:16px; font-weight: bold; line-height: 2.2em;border-radius: .6em;text-align:center; color: #333;">',
            '<div style="height:2.2em; width: 100%; border-bottom: 1px #ccc solid;">',
            '<div style="height: 100%; width: 30%; float:left;">1小时警戒</div>',
            '<div style="height: 100%; width: 35%; float:left;">3小时警戒</div>',
            '<div style="height: 100%; width: 35%; float:right;">当日警戒</div>',
            '</div>',
            '<div style="height:2.2em; width: 100%;">',
            '<div style="height: 100%; width: 30%; float:left;{[this.getFlowColor(values.Warn1h)]}" id={[this.getLinkId(values,values.Warn1hValue,"w")]}>{[this.getWarn(values.Warn1h)]}</div>',
            '<div style="height: 100%; width: 35%; float:left;{[this.getFlowColor(values.Warn3h)]}" id={[this.getLinkId(values,values.Warn3hValue,"w")]}>{[this.getWarn(values.Warn3h)]}</div>',
            '<div style="height: 100%; width: 35%; float:right;{[this.getFlowColor(values.Warn24h)]}" id={[this.getLinkId(values,values.Warn24hValue,"w")]}>{[this.getWarn(values.Warn24h)]}</div>',
            '</div>',
            '</div>',
            '{[this.getYlOverCode(values.Warn1hValue)]}',
            '<div class="tidetime" style="padding:0 0 0 10px; margin:15px 0 0 0;width:100%; height: 2em; font-size:18px; font-weight: bold; line-height: 2em; color:#000;"><img src="resources/images/001.png" style="width:20px;height:20px;float:left;margin-top:0.45em;"/>当日危险雨量站个数</div>',
            '<div style="height: 2.2em; font-size:15px; line-height: 2.2em;margin:0 15px 0 15px;">',
            '<div style="width:30%;height:100%;float:left;">单位:个</div>',
            '<div style="width:70%;height:100%;float:right;text-align: center;">',
            //'<div style="height:100%;width:34%;float:left;"><img src="resources/images/status/blue.png" style="height:10px;width:10px;">&nbsp;</div>',
            //'<div style="height:100%;width:33%;float:left;"><img src="resources/images/status/yellow.png" style="height:10px;width:10px;">&nbsp;></div>',
            //'<div style="height:100%;width:33%;float:left;"><img src="resources/images/status/red.png" style="height:10px;width:10px;">&nbsp;></div>',
            '</div>',
            '</div>',
            '<div style="min-height:4.4em;margin:0 10px 0 10px; border: 1px #ccc solid; background: #fff;  font-size:16px; font-weight: bold; line-height: 2.2em;border-radius: .6em;text-align:center; color: #333;">',
            '<div style="height:2.2em; width: 100%; border-bottom: 1px #ccc solid;">',
            '<div style="height: 100%; width: 30%; float:left;">1小时危险</div>',
            '<div style="height: 100%; width: 35%; float:left;">3小时危险</div>',
            '<div style="height: 100%; width: 35%; float:right;">当日危险</div>',
            '</div>',
            '<div style="height:2.2em; width: 100%;">',
            '<div style="height: 100%; width: 30%; float:left;{[this.getFlowColor(values.Danger1h)]}" id={[this.getLinkId(values,values.Danger1hValue,"d")]}>{[this.getWarn(values.Danger1h)]}</div>',
            '<div style="height: 100%; width: 35%; float:left;{[this.getFlowColor(values.Danger3h)]}" id={[this.getLinkId(values,values.Danger3hValue,"d")]}>{[this.getWarn(values.Danger3h)]}</div>',
            '<div style="height: 100%; width: 35%; float:right;{[this.getFlowColor(values.Danger24h)]}" id={[this.getLinkId(values,values.Danger24hValue,"d")]}>{[this.getWarn(values.Danger24h)]}</div>',
            '</div>',
            '</div>',
            '{[this.getYlDOverCode(values.Danger1hValue)]}',
            '<div  class="tidetime" style="padding:0 0 0 10px; margin:15px 0 10px 0; width:100%; height: 2em; font-size:18px; font-weight: bold; line-height: 2em;color:#000;"><img src="resources/images/001.png" style="width:20px;height:20px;float:left;margin-top:0.45em;"/>水位超警站点个数：{[this.getOverNum(values.WaterWarnCount)]}&nbsp;个</div>',
            '{[this.getOverCode(values.WaterWarn)]}',
            '<div  class="tidetime" style="padding:0 0 0 10px; margin:15px 0 10px 0; width:100%; height: 2em; font-size:18px; font-weight: bold; line-height: 2em;color:#000;"><img src="resources/images/001.png" style="width:20px;height:20px;float:left;margin-top:0.45em;"/>水位危险站点个数：{[this.getOverNum(values.WaterDangerCount)]}&nbsp;个</div>',
            '{[this.getOverCode(values.WaterDanger)]}',
            '<div  class="tidetime" style="padding:0 0 0 10px; margin:15px 0 10px 0; width:100%; height: 2em; font-size:18px; font-weight: bold; line-height: 2em; color:#000;"><img src="resources/images/001.png" style="width:20px;height:20px;float:left;margin-top:0.45em;"/>当前活动台风：{[this.getTyphoonNum(values.TfCount)]}&nbsp;个</div>',
            '{[this.getTyphoonCode(values.Tfxx)]}',
            {
                getFlowColor: function (value) {

                    var string = '';
                    if (value <= 3000) {
                        string = 'color: blue;';
                    }
                    else if (value <= 6000) {
                        string = 'color: yellow;';
                    }
                    else {
                        string = 'color: red;';
                    }
                    return string;
                },

                //获取最大降雨值
                getMaxRain: function (value) {
                    return value;
                },

                getWarn: function (value) {
                    if(value > 0)
                    {
                        return '<span style="color:red">'+value+'</span>';
                    }else{
                        return value;
                    }
                },

                getLinkId: function (values, value, type) {

                    var result = Ext.id();
                    Ext.Function.defer(this.addListener, 1, this, [result, values, value, type]);
                    return result;
                },
                addListener: function (id, values, value, type) {
                    var me = this;
                    Ext.get(id).on('tap', function (e) {
                        e.stopEvent();
                        me.addImg(values, value, type);
                    })//////增加add图片的事件
                },
                addImg: function (values, value, type) {

                    if (type == "d") {
                        //点击危险雨量站
                        Ext.ComponentQuery.query('#imaininfo')[0].onDataView1(value);
                    }
                    else if(type == "w"){
                        //点击警戒雨量站
                        Ext.ComponentQuery.query('#imaininfo')[0].onDataView(value);
                    }else{
                        //点击警戒雨量站
                        Ext.ComponentQuery.query('#imaininfo')[0].onDataView2(value);
                    }
                },
                getOverNum: function (value) {
                    return value;
                },
                getOverCode: function (value) {
                    var string = '';
                    if (value) {
                        string += '<div style="margin:0 10px 0 10px;min-height:2.2em; border: 1px #ccc solid; background: #fff;  font-size:16px; font-weight: bold; line-height: 2.2em;border-radius: .6em;text-align:center; color:#333;">';
                        var json = value.split('$');
                        for (var i = 0; i < json.length; i++) {

                            var num = json[i].split(',');

                            if (i == 0) {
                                string += '<div style="height:2.2em; width: 100%;text-align:center;"><div style="height: 100%; width: 30%; float:left;">' + num[0] + '</div><div style="height: 100%; width: 70%; float:left;">' + num[1] + '</div></div>';
                            }
                            else {
                                string += '<div style="height:2.2em; width: 100%;text-align:center;border-top: 1px #ccc solid;"><div style="height: 100%; width: 30%; float:left;">' + num[0] + '</div><div style="height: 100%; width: 70%; float:left;">' + num[1] + '</div></div>';
                            }

                        }
                        string += '</div>';
                    }
                    else {
                        string += '<div style="margin:0 10px 0 10px;height:2.2em:border: 1px #ccc solid; background: #fff;  font-size:16px; font-weight: bold; line-height: 2.2em;border-radius: .6em;padding-left:10px; color:#333;">当前无超警站点</div>';
                    }

                    return string;
                },

                //当日降雨量（点击有效数字出现的div）
                getTodayYlOverCode: function (value) {
                    var string = '';
                    if (value) {
                        string += '<div id="divRainyl" style="display:none;margin:10px 10px 10px 10px;min-height:2.2em; border: 1px #ccc solid; background: #fff;  font-size:16px; font-weight: bold; line-height: 2.2em;border-radius: .6em;text-align:center; color:#333;">';
                        string += '<div style="height:2.2em; width: 100%;text-align:center;border-top: 1px #ccc solid;"><div style="height: 100%; width: 30%; float:left;" id = "divRainvalue1">' + value + '</div>';
                        string += '</div>';
                        string += '</div>';

                    }
                    else {
                        string += '<div style="margin:0 10px 0 10px;height:2.2em:border: 1px #ccc solid; background: #fff;  font-size:16px; font-weight: bold; line-height: 2.2em;border-radius: .6em;padding-left:10px; color:#333;">当前无降雨信息</div>';
                    }

                    return string;
                },

                //警戒雨量站（点击有效数字出现的div）
                getYlOverCode: function (value) {
                    var string = '';
                    if (value) {
                        string += '<div id="divyl" style="display:none;margin:10px 10px 0 10px;min-height:2.2em; border: 1px #ccc solid; background: #fff;  font-size:16px; font-weight: bold; line-height: 2.2em;border-radius: .6em;text-align:center; color:#333;">';
                        var json = value.split('$');
                        for (var i = 0; i < json.length; i++) {

                            var num = json[i].split(',');

                            if (i == 0) {
                                string += '<div style="height:2.2em; width: 100%;text-align:center;"><div style="height: 100%; width: 30%; float:left;" id = "divvalue1">' + num[0] + '</div><div style="height: 100%; width: 70%; float:left;" id = "divvalue2">' + num[1] + '</div></div>';
                            }
                            else {
                                string += '<div style="height:2.2em; width: 100%;text-align:center;border-top: 1px #ccc solid;"><div style="height: 100%; width: 30%; float:left;" id = "divvalue3">' + num[0] + '</div><div style="height: 100%; width: 70%; float:left;" id = "divvalue4">' + num[1] + '</div></div>';
                            }

                        }
                        string += '</div>';
                    }
                    else {
                        string += '<div style="margin:0 10px 0 10px;height:2.2em:border: 1px #ccc solid; background: #fff;  font-size:16px; font-weight: bold; line-height: 2.2em;border-radius: .6em;padding-left:10px; color:#333;">当前无超警站点</div>';
                    }

                    return string;
                },
                //危险雨量站（点击有效数字出现的div）
                getYlDOverCode: function (value) {

                    var string = '';
                    if (value) {
                        string += '<div id="divyll" style="display:none;margin:10px 10px 0 10px;min-height:2.2em; border: 1px #ccc solid; background: #fff;  font-size:16px; font-weight: bold; line-height: 2.2em;border-radius: .6em;text-align:center; color:#333;">';
                        var json = value.split('$');
                        for (var i = 0; i < json.length; i++) {

                            var num = json[i].split(',');

                            if (i == 0) {
                                string += '<div style="height:2.2em; width: 100%;text-align:center;"><div style="height: 100%; width: 30%; float:left;" id = "divvalue11">' + num[0] + '</div><div style="height: 100%; width: 70%; float:left;" id = "divvalue22">' + num[1] + '</div></div>';
                            }
                            else {
                                string += '<div style="height:2.2em; width: 100%;text-align:center;border-top: 1px #ccc solid;"><div style="height: 100%; width: 30%; float:left;" id = "divvalue33">' + num[0] + '</div><div style="height: 100%; width: 70%; float:left;" id = "divvalue44">' + num[1] + '</div></div>';
                            }

                        }
                        string += '</div>';
                    }
                    else {
                        string += '<div style="margin:0 10px 0 10px;height:2.2em:border: 1px #ccc solid; background: #fff;  font-size:16px; font-weight: bold; line-height: 2.2em;border-radius: .6em;padding-left:10px; color:#333;">当前无超警站点</div>';
                    }

                    return string;
                },
                getTyphoonNum: function (value) {
                    return value;
                },
                getTyphoonCode: function (value) {
                    var string = '';
                    if (value) {
                        string += '<div style="min-height:2.2em; margin:0 10px 0 10px; border: 1px #ccc solid; background: #fff;  font-size:16px; font-weight: bold; line-height: 2.2em;border-radius: .6em;text-align:center; color:#333;">';
                        var json = value.split('$');
                        for (var i = 0; i < json.length; i++) {

                            var num = json[i].split(',');

                            if (i == 0) {
                                string += '<div style="height:2.2em; width: 100%;text-align:center;"><div style="height: 100%; width: 30%; float:left;">' + num[0] + '</div><div style="height: 100%; width: 70%; float:left;">' + num[1] + '</div></div>';
                            }
                            else {
                                string += '<div style="height:2.2em; width: 100%;text-align:center;border-top: 1px #ccc solid;"><div style="height: 100%; width: 30%; float:left;">' + num[0] + '</div><div style="height: 100%; width: 70%; float:left;">' + num[1] + '</div></div>';
                            }

                        }
                        string += '</div>';
                    }
                    else {
                        string += '<div style="height:2.2em; margin:0 10px 0 10px; border: 1px #ccc solid; background: #fff;  font-size:16px; font-weight: bold; line-height: 2.2em;border-radius: .6em;padding-left:10px; color:#333;">当前无活动台风</div>';
                    }

                    return string;
                }

            }
        )
    },

    //警戒雨量站
    onDataView: function (value, type) {

        if (value) {
            var div = document.getElementById("divyl");
            var bdis = div.style.display;
            if (bdis == "none") {
                div.style.display = "block";
            }
            else {
                div.style.display = "none";
            }
            var num = value.split(',');
            if (num.length > 1) {

                var div1 = document.getElementById("divvalue1");
                if (div1) {
                    div1.innerText = num[0];
                }
                var div2 = document.getElementById("divvalue2");
                if (div2) {
                    div2.innerText = num[1];
                }
                var div3 = document.getElementById("divvalue3");
                if (div3) {
                    div3.innerText = num[0];
                }
                var div4 = document.getElementById("divvalue4");
                if (div4) {
                    div4.innerText = num[1];
                }
            }
            else {
                var div1 = document.getElementById("divvalue1");
                if (div1) {
                    div1.innerText = "--";
                }
                var div2 = document.getElementById("divvalue2");
                if (div2) {
                    div2.innerText = "--";
                }
                var div3 = document.getElementById("divvalue3");
                if (div3) {
                    div3.innerText = "--";
                }
                var div4 = document.getElementById("divvalue4");
                if (div4) {
                    div4.innerText = "--";
                }
            }
        }


    },
    //危险雨量站
    onDataView1: function (value, type) {

        if (value) {
            var div = document.getElementById("divyll");
            var bdis = div.style.display;
            if (bdis == "none") {
                div.style.display = "block";
            }
            else {
                div.style.display = "none";
            }
            var num = value.split(',');
            if (num.length > 1) {

                var div1 = document.getElementById("divvalue11");
                if (div1) {
                    div1.innerText = num[0];
                }
                var div2 = document.getElementById("divvalue22");
                if (div2) {
                    div2.innerText = num[1];
                }
                var div3 = document.getElementById("divvalue33");
                if (div3) {
                    div3.innerText = num[0];
                }
                var div4 = document.getElementById("divvalue44");
                if (div4) {
                    div4.innerText = num[1];
                }
            }
            else {
                var div1 = document.getElementById("divvalue11");
                if (div1) {
                    div1.innerText = "--";
                }
                var div2 = document.getElementById("divvalue22");
                if (div2) {
                    div2.innerText = "--";
                }
                var div3 = document.getElementById("divvalue33");
                if (div3) {
                    div3.innerText = "--";
                }
                var div4 = document.getElementById("divvalue44");
                if (div4) {
                    div4.innerText = "--";
                }
            }
        }

    },

    //降雨信息
    onDataView2: function (value, type) {

        if (value) {
            var div = document.getElementById("divRainyl");
            var bdis = div.style.display;
            if (bdis == "none") {
                div.style.display = "block";
            }
            else {
                div.style.display = "none";
            }
            var div1 = document.getElementById("divRainvalue1");
            if (div1) {
                div1.innerText = value;
            }
        }

    },

    initialize: function () {

    },

    onDataSet: function () {

        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: '加载中,请稍后...'
        });
        var me = this;
        var store = Ext.getStore('MainStore');
        Ext.data.proxy.SkJsonp.setUrl(localStorage.getItem('proxyUrl'));
        Ext.data.proxy.SkJsonp.loadStore(store, 'GetTodayList', 'jsonp', {
            success: function () {
                Ext.Viewport.setMasked(false);
                me.setData(store.getAt(0).data);
            },
            failure: function () {
                Ext.Viewport.setMasked(false);
            }

        });
        //store.getProxy().setExtraParams({
        //    t: 'GetTodayList',
        //    results: 'jsonp'
        //});
        //
        //store.load(function(records, operation, success){
        //
        //    Ext.Viewport.setMasked(false);
        //    if(!success)
        //    {
        //        plugins.Toast.ShowToast("网络不给力，无法读取数据!",3000);
        //    }
        //    else{
        //        me.setData(store.getAt(0).data);
        //    }
        //}, this);

    }
});