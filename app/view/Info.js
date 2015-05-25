Ext.define('YzMobile.view.Info', {
    extend: 'Ext.navigation.View',
    xtype: 'info',

    requires: [],
    config: {

        navigationBar: {
            ui: 'light',
            layout: 'fit',
            items: [
                {
                    xtype: 'button',
                    itemId: 'infofunction',
                    ui: 'back',
                    text: '主页面'
                },
                {
                    xtype: 'button',
                    itemId: 'infoBack',
                    ui: 'back',
                    text: '返回',
                    hidden:true
                },
                { xtype: 'spacer' },
                {
                    xtype: 'button',
                    itemId: 'infosearch',
                    ui: 'plain',
                    iconCls: 'search',
                    text:'搜索',
                    iconMasked: true,
                    hidden: true
                },
                {
                    xtype: 'button',
                    itemId: 'rainwarning',
                    text: '降雨预警',
                    hidden: true
                },
                {
                    xtype: 'button',
                    itemId: 'waterwarning',
                    text: '水位预警',
                    hidden: true
                },
                {
                    xtype: 'button',
                    itemId: 'modelsearch', // 搜索水库,大坝等模块
                    ui: 'plain',
                    iconCls: 'search',
                    text:'搜索',
                    hidden: true
                },
                //{
                //    xtype: 'button',
                //    itemId: 'showplace', // 显示站点
                //    ui:'plain',
                //    iconCls:'settings',
                //    hidden: true
                //},
                {
                    xtype: 'button',
                    itemId: 'mapsearch', // 搜索水库,大坝等模块
                    ui: 'plain',
                    iconCls: 'search',
                    text:'搜索',
                    hidden: true
                },
                {
                    xtype: 'button',
                    itemId: 'infomore',
                    ui: 'plain',
                    iconCls: 'more',
                    iconMasked: true,
                    hidden: true
                },
                {
                    xtype:'button',
                    itemId:'mapshow',
                    ui:'plain',
                    iconCls:'locate',
                    text:'地图',
                    iconMasked:true,
                    hidden:true
                }

            ]
        },

        itemId: 'info',

        defaultBackButtonText: '返回'
    },

    onImageShow: function (values) {
        this.view = this.down('newsimg');
        if (!this.view) {
            this.view = Ext.create('YzMobile.view.mark.NewsImg');
        }

        this.view.onImgDataSet(values);

        if (!this.view.getParent()) {
            Ext.Viewport.add(this.view);
        }
        this.view.show();
    },

    onViewHide: function () {
        this.view.hide();
        this.view.destroy();
    },

    onPhotoShow: function (id, index) {
        this.view = this.down('newsimg');
        if (!this.view) {
            this.view = Ext.create('YzMobile.view.mark.NewsImg');
        }

        this.view.onPhotoDataSet(id, index);

        if (!this.view.getParent()) {
            Ext.Viewport.add(this.view);
        }
        this.view.show();
    },

    onPhotoDelete: function () {
        this.view.onPhotoDelete();
    }
});
