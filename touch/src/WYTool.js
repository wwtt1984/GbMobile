/**
 * Created by kukiss on 2015/4/24 0024.
 */
Ext.define('Ext.WYTool', {
    alternateClassName: 'WYTool',
    singleton: true,

    constructor: function (config) {
        this.initConfig(config);
    },

    config: {
        siteName : 'siteName',
        proxyUrl: 'proxyUrl'
    },

    queryComponent: function (xid) {
        return Ext.ComponentQuery.query(xid)[0];
    },

    queryController: function (controller, name) {
        return controller.getApplication().getController(name);
    },

    getSettings: function () {
        var store = Ext.getStore('SettingsStore');
        return store.getData().all[0];
    }

});