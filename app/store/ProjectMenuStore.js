/**
 * Created by kukiss on 2015/3/9 0009.
 */
Ext.define('YzMobile.store.ProjectMenuStore', {
    extend: 'Ext.data.Store',
    requires: [
        'YzMobile.model.ProjectMenuModel'
    ],

    config: {
        model: 'YzMobile.model.ProjectMenuModel',

        data: [
            {id: '01', name: 'rain', title: '水库', url: 'resources/icons/reservoir.png'},
            {id: '02', name: 'rain', title: '水闸', url: 'resources/icons/gate.png'},
            {id: '03', name: 'rain', title: '堤防', url: 'resources/icons/gate.png'},
            {id: '04', name: 'rain', title: '堰坝', url: 'resources/images/project/yb.png'},
            {id: '05', name: 'rain', title: '水电站', url: 'resources/images/project/sdz.png'},
            {id: '06', name: 'norain', title: '山塘', url: 'resources/images/project/st.png'}
        ],

        autoLoad: true

    }
});