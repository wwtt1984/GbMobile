/**
 * Created by kukiss on 2015/4/21 0021.
 */
Ext.define('YzMobile.controller.FloodControl', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            floodtree : '[itemId=floodTree]'
        },
        control: {
            floodtree : {
                leafItemTap : 'onFloodTreeItemClick'
            }
        }
    },

    onFloodTreeItemClick: function (container, list, index, target, record, e) {
        //// 显示预警信息的panel
        //this.warnOverlay = Ext.Viewport.add({
        //    xtype: 'panel',
        //    width: '80%',
        //    height: '55%',
        //    modal: true,
        //    centered: true,
        //    hideOnMaskTap: true,
        //    scrollable: true,
        //    items: [
        //        {
        //            styleHtmlContent: true,
        //            html: html
        //        }
        //    ]
        //});
        //this.warnOverlay.show();
    }
});