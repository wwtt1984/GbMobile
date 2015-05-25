/**
 * Created by USER on 14-5-20.
 */

Ext.define('YzMobile.view.Load', {
    extend: 'Ext.Panel',
    xtype: 'load',
//    id: 'load',

    requires: [
        'Ext.XTemplate'
    ],

    config:{
        itemId: 'load',
        modal: true,
        centered: true,
        hideOnMaskTap: false,

        width: '80%',

        cls: 'download',
        tpl:  Ext.create('Ext.XTemplate',
            '<div style="min-height:6em;width:100%;">',
//            '<div class="header">更新下载中</div>',
            '<div class="header">{header}</div>',
//            '<div class="content">正在下载中...{width}%</div>',
            '<div class="content">{text}...{width}%</div>',
            '<div class="loading-status">',
            '<div class="percent" style="width:{[this.getWidth(values)]};color:#fff;font-size:12px;line-height:12px;">&nbsp;&nbsp;{width}%</div>',
            '</div>',
            '</div>',
            {
                getWidth: function(values){
                    return values.width + '%';
                }
            }
        )
    },

    initialize: function(){
        this.setData({width: 0});
    },

    onDataSet: function(header, text, width){
        this.setData({header: header, text: text, width: width});
    }
});