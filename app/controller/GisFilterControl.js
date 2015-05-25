/**
 * Created by teddy on 15/4/20.
 */

/*
//选择界面控制器
Ext.define('YzMobile.controller.GisFilterControl',{

    extend:'Ext.app.Controller',

    require:['Ext.field.Toggle'],

    config:{

        ref:{
            main: 'main',
            info: 'main info',
            infofunction: '[itemId=infofunction]',
            gismain: 'info gismain',
            amap: 'aimap',
            filterView:'filterView',
            gistitle: '[itemId=gistitle]',
            filtersw: '[itemId=filtersw]',// 选择显示站点的按钮
            filteryl: '[itemId=filteryl]',// 选择显示站点的按钮
            filtersk: '[itemId=filtersk]',// 选择显示站点的按钮
            filtersz: '[itemId=filtersz]',// 选择显示站点的按钮
            filterdf: '[itemId=filterdf]',// 选择显示站点的按钮
            filtersdz: '[itemId=filtersdz]',// 选择显示站点的按钮
            filterst: '[itemId=filterst]',// 选择显示站点的按钮
            toggleselect:'[itemId=toggleselect]'
        },
        control:
        {
            filtersw: { change: 'onGisFilter' },
            filteryl: { change: 'onGisFilter' },
            filtersk: { change: 'onGisFilter' },
            filtersz: { change: 'onGisFilter' },
            filterdf: { change: 'onGisFilter' },
            filtersdz: { change: 'onGisFilter' },
            filterst: { change: 'onGisFilter' },
            toggleselect:{ change:'onWarnSelect'}
        }
    },

    onGisFilter: function (res) {

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
            this.getApplication().getController('GisControl').addpolyline(filter);
        }
        else
        {
            this.getApplication().getController('GisControl').delMakers();
            Ext.Msg.alert("提示","当前无任何叠加数据！");
        }

    },



});
    */