/**
 * Created by Stiffen on 2015/4/15.
 */

Ext.define('Ext.AMap', {
    extend: 'Ext.Container',
    xtype : 'amap',

    config: {
        baseCls: Ext.baseCSSPrefix + 'map',
        useCurrentLocation: false,
        map: null,
        mapOptions: {},
        mapListeners: null
    },

    initialize: function() {
        this.callParent();
        this.initMap();
    },

    getElementConfig: function() {
        return {
            reference: 'element',
            className: 'x-container',
            children: [{
                reference: 'innerElement',
                className: 'x-inner',
                children: [{
                    reference: 'mapContainer',
                    className: Ext.baseCSSPrefix + 'map-container'
                }]
            }]
        };
    },

    initMap: function() {
        var map = this.getMap();
        if(!map) {

            var gm = AMap;
            if(!gm) return null;

            var element = this.mapContainer,
                mapOptions = this.getMapOptions(),
                event = gm.event,
                me = this;
            mapOptions.center = mapOptions.center || new AMap.LngLat(116.397428, 39.90923); // Palo Alto

            if (mapOptions.center && mapOptions.center.latitude && !Ext.isFunction(mapOptions.center.lat)) {
                mapOptions.center = new gm.LatLng(mapOptions.center.latitude, mapOptions.center.longitude);
            }

            mapOptions.zoom = mapOptions.zoom || 12;
            map = new AMap.Map(element.dom, {
                view: new AMap.View2D({
                    center: mapOptions.center,
                    resizeEnable: true,
                    zoom: mapOptions.zoom
                })
            });
            //map.plugin(["AMap.MapType"], function() {
            //    var type = new AMap.MapType({defaultType:0});//初始状态使用2D地图
            //    map.addControl(type);
            //});
            this.setMap(map);
            event.addListener(map, 'complete', Ext.bind(me.onComplete, me));
            this.addMapListeners();

        }
        return this.getMap();
    },
    // @private
    onComplete : function() {
        var map = this.getMap();
        this.fireEvent('complete', this, map);
    },

    addMapListeners: function() {
        var gm = AMap,
            map = this.getMap(),
            mapListeners = this.getMapListeners();
        if (gm) {
            var event = gm.event,
                me = this,
                listener, scope, fn, callbackFn, handle;
            if (Ext.isSimpleObject(mapListeners)) {
                for (var eventType in mapListeners) {
                    listener = mapListeners[eventType];
                    if (Ext.isSimpleObject(listener)) {
                        scope = listener.scope;
                        fn = listener.fn;
                    } else if (Ext.isFunction(listener)) {
                        scope = null;
                        fn = listener;
                    }

                    if (fn) {
                        callbackFn = function() {
                            this.fn.apply(this.scope, [me]);
                            if(this.handle) {
                                event.removeListener(this.handle);
                                delete this.handle;
                                delete this.fn;
                                delete this.scope;
                            }
                        };
                        handle = event.addListener(map, eventType, Ext.bind(callbackFn, callbackFn));
                        callbackFn.fn = fn;
                        callbackFn.scope = scope;
                        if(listener.single === true) callbackFn.handle = handle;
                    }
                }
            }
        }
    }
});
