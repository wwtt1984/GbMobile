/**
 * Created by kukiss on 2015/5/7.
 */
Ext.define('YzMobile.model.SiteModel', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            'id',
            'Scityid',
            'ScityName',
            'SproxyUrl',
            'ScenterLng',
            'ScenterLat',
            'ScenterZoom'
        ]
    }
});