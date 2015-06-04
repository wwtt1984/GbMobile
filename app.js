/*
 This file is generated and updated by Sencha Cmd. You can edit this file as
 needed for your application, but these edits will have to be merged by
 Sencha Cmd when it performs code generation tasks such as generating new
 models, controllers or views and when running "sencha app upgrade".

 Ideally changes to this file would be limited and most work would be done
 in other places (such as Controllers). If Sencha Cmd cannot merge your
 changes and its generated code, it will produce a "merge conflict" that you
 will need to resolve manually.
 */

Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath({
    'Ext': 'touch/src',
    'YzMobile': 'app',
    'Ext.data.proxy.SkProxy': 'app/lib/SkProxy.js',
    'Ext.data.proxy.SkJsonp': 'app/lib/SkJsonp.js'
});

Ext.ClassManager.setAlias('Ext.data.proxy.SkProxy', 'proxy.sk');

Ext.application({
    name: 'YzMobile',
    //mapCenter: [118.835634,29.57190, 10],//淳安
    //mapCenter: [121.8808,29.5447, 10],//象山
    mapCenter: [118.344985,29.049739, 10],//开化
    user: {sid: '', name: '', password: '', version: '1.0.9',cityname:'开化',global:'http://115.236.2.245:38019/data.ashx'},
    local: {userfile: 'yzlogin.json'},//



    requires: [
        'Ext.device.FileSystem',
        'Ext.MessageBox',
        'Ext.data.proxy.SkProxy',
        'Ext.data.proxy.SkJsonp',
        'Ext.field.DatePicker',
        'Ext.WYTool'
    ],

    views: [
        'Main',
        'Login',
        'Function',
        'Title',
        'Load',

        'TouchTreeGrid',

        'Info',

        'DateSelect',

        'rain.Rain',
        'rain.RainBar',
        'rain.RainDetail',
        'rain.RainWarn',
        'rain.RainWarnFromPush',
        'rain.RainSearch',

        'water.Water',
        'water.WaterLine',
        'water.WaterSearch',

        'weather.Weather',

        'land.LandMain',
        'land.Cloud',
        'land.Radar',
        'land.HourRain',
        'land.ThreeHourRain',
        'land.StrongWeather',


        'gis.GisMain',
        'gis.GMap',
        'gis.GisTitle',
        'gis.GMapSearch',
        'gis.AMapFilterView',

        'typhoon.TfMain',
        'typhoon.TfMap',
        'typhoon.TfList',
        'typhoon.PopUp',
        'typhoon.popDetail.TfPopDetailInfo',
        'typhoon.popDetail.TfPopDetailList',

        'project.ProjectList',
        'project.ProjectDetail',
        'project.ProjectMenu',
        'project.ProjectMenuPart',
        'project.ProjectMenuDetail',
        'project.Search',


        'base.BaseList',
        'base.BaseDetail',

        'contact.ContactList',
        'contact.ContactSearch',
        'contact.ContactPopup',
        'contact.ContactFilter',

        'plan.PlanList',
        'plan.PlanSearch',
        'plan.PlanTree',

        'flood.FloodTree',
        'flood.MainInfo',

        'Site'


    ],

    models: [
        'UserModel',
        'FunctionModel',

        'VersionModel',

        'RainModel',
        'RainDetailModel',

        'WaterModel',

        'WeatherModel',

        'LandModel',
        'CloudModel',

        'WaterRainModel',

        'TfModel',
        'TfForeModel',
        'TfDetailModel',

        'TreeModel',

        'ProjectDetailModel',

        'BaseModel',
        'ProjectMenuPartModel',
        'NameValueModel',
        'SearchModel',
        'ContactTreeModel',
        'ContactListModel',
        'ContactSearchModel',
        'PlanModel',
        'PlanSearchModel',
        'SettingModel',
        'MainModel',
        'PlanTreeModel',
        'AllModel',
        'SiteModel'
    ],

    stores: [
        'UserStore',
        'FunctionStore',

        'VersionStore',

        'RainStore',
        'RainDetailStore',

        'WaterStore',
        'WeatherStore',

        'LandStore',
        'CloudStore',
        'RadarStore',

        'WaterRainStore',

        'TfStore',
        'TfForeStore',
        'TfDetailStore',

        'ProjectTreeStore',
        'ProjectDetailStore',

        'BaseStore',
        'ProjectMenuStore',
        'ProjectMenuPartStore',
        'NameValueStore',
        'SearchStore',
        'ContactTreeStore',
        'ContactSearchStore',
        'PlanStore',
        'PlanTreeStore',
        'PlanSearchStore',
        'MainStore',
        'SiteStore',
        'SettingStore',
        'RainSearchStore',
        'WaterSearchStore'
    ],

    controllers: [
        'MainControl',
        'RainControl',
        'WaterControl',
        'WeatherControl',
        'LandControl',
        'GisControl',
        'TfControl',
        'ProjectControl',
        'BaseControl',
        'ProjectMenuControl',
        'ContactControl',
        'PlanControl',
        'SettingsControl',
        'FloodControl',
        'InfoController'

    ],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function () {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingImg').destroy();
        // Initialize the main view
        Ext.Viewport.add(Ext.create('YzMobile.view.Main'));
    },

    onUpdated: function () {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function (buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
