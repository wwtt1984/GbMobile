/**
 * Created by USER on 14-8-15.
 */

Ext.define('YzMobile.controller.LandControl', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.app.Route'
    ],

    config: {

        refs: {
            main: 'main',
            info: 'main info',
            infofunction: '[itemId=infofunction]',

            landmain: 'info landmain',

            cloud: 'info cloud',
            cloudstart: '[itemId=cloudstart]',

            radar: 'info radar',
            radarstart: '[itemId=radarstart]'
        },

        control: {
            landmain: {
                initialize: function () {
                    this.selectModule = -1; // 当前选择的模块,卫星 气象 降水, 强天气
                },
                itemsingletap: 'onLandMainTap'
            },
            cloudstart: {
                tap: 'onCloudStartTap'
            },
            radarstart: {
                tap: 'onRadarStartTap'
            }
        }
    },

    //气象国土列表页面初始化
    onLandInitialize: function(){
        var me = this;

        me.landmain = me.getLandmain();
        if(!me.landmain){
            me.landmain= Ext.create('YzMobile.view.land.LandMain');
        }
        me.getInfo().push(me.landmain);
        me.getMain().setActiveItem(me.getInfo());
    },

    onLandMainTap: function(list, index, target, record, e, eOpts ){

        var me = this;

        WYTool.queryComponent('#infofunction').hide();

        switch(record.data.title){
            case '卫星云图':
                this.selectModule = 0;
                me.onCloudInitialize();
                break;
            case '气象雷达':
                this.selectModule = 1;
                me.onRadarInitialize();
                break;
            case '一小时降水预报':
                this.selectModule = 2;
                me.getInfo().push({xtype:'hourrain'});
                break;
            case '三小时降水预报':
                this.selectModule = 3;
                me.getInfo().push({xtype:'threehourrain'});
                break;
            case '强天气预报':
                this.selectModule = 4;
                me.getInfo().push({xtype:'strongweather'});
                break;
        }
    },

    onCloudInitialize: function(){
        var me = this;
        me.cloud = me.getCloud();
        if(!me.cloud){
            me.cloud= Ext.create('YzMobile.view.land.Cloud');
        }
        me.getInfofunction().hide();
        me.cloud.loadstore();
        me.getInfo().push(me.cloud);
    },

    onCloudStartTap: function() {
        switch (this.selectModule) {
            case 0: WYTool.queryComponent('cloud').clickStartToChangePic(); break;
            case 1: WYTool.queryComponent('radar').clickStartToChangePic(); break;
            case 2: WYTool.queryComponent('hourrain').clickStartToChangePic(); break;
            case 3: WYTool.queryComponent('threehourrain').clickStartToChangePic(); break;
            case 4: WYTool.queryComponent('strongweather').clickStartToChangePic(); break;
        }

    },

    onRadarInitialize: function(){
        var me = this;
        me.radar = me.getRadar();
        if(!me.radar){
            me.radar= Ext.create('YzMobile.view.land.Radar');
        }
        me.getInfofunction().hide();
        me.radar.loadstore();
        me.getInfo().push(me.radar);
    },

    onRadarStartTap: function() {
        var me = this;
        me.getRadar().clickStartToChangePic();
    }
})