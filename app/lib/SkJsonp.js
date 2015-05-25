Ext.define('Ext.data.proxy.SkJsonp', {
	singleton: true,///////////////////实例化单列/////////////////////////////
    config: {

        url:null,
		callbackKey: 'callback'
    },
	
	validate: function(t,results, options) {
		
        options = options || {};

        Ext.applyIf(options, {
            scope: this,
            success: Ext.emptyFn,
            failure: Ext.emptyFn
        });
        
        Ext.data.JsonP.request({
            url: this.config.url,
			callbackKey: 'callback',
            params: {
                t: t,
				results:results
            },
            scope: this,
            success: function(response) {
                options.success.call(options.scope, response);
            },
            failure: function() {
                options.failure.call(options.scope);
            }
        });
    },

    loadStore:function(store,t,results,options)
    {
        options = options || {};

        Ext.applyIf(options, {
            scope: this,
            success: Ext.emptyFn,
            failure: Ext.emptyFn
        });

        store.getProxy().setExtraParams({
            t: t,
            results: results
        });

        store.getProxy().setUrl(this.getUrl());

        store.load(function(records, operation, success) {

            if(success) {
                options.success.call(options.scope, records);
            }
            else
            {
                options.failure.call(options.scope);
            }
        }, this);
    }
});