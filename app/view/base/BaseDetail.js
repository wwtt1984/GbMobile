/**
 * Created by USER on 14-8-15.
 */

Ext.define('YzMobile.view.base.BaseDetail', {
    extend: 'Ext.Panel',
    xtype: 'basedetail',

    requires: [
        'Ext.XTemplate'
    ],

    config: {
        title: '详细信息',

        scrollable: {
            direction: 'vertical',
            directionLock: true
        },

        style: 'background-color: #f7f7f7; padding:5px;',

//        emptyText: '<p class="no-searches" style="margin-top:50%;">没有离线消息</p>',

        tpl: Ext.create('Ext.XTemplate',
            '<table style="background-color: #fff;" width="100%">',
            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:16px;text-align:center;">',
            '<td width="40%" style="border:1px solid #ccc;">乡镇名称</td>',
            '<td width="60%" style="border:1px solid #ccc;">{[this.formatNull(values.data.xzmc)]}</td>',
            '</tr>',
            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:16px;text-align:center;">',
            '<td width="40%" style="border:1px solid #ccc;">行政区划代码</td>',
            '<td width="60%" style="border:1px solid #ccc;">{[this.formatNull(values.data.adcd)]}</td>',
            '</tr>',
            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:16px;text-align:center;">',
            '<td width="40%" style="border:1px solid #ccc;">土地面积</td>',
            '<td width="60%" style="border:1px solid #ccc;">{[this.formatNull(values.data.type)]}平方公里</td>',
            '</tr>',

            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:16px;text-align:center;">',
            '<td width="40%" style="border:1px solid #ccc;">总人口</td>',
            '<td width="60%" style="border:1px solid #ccc;">{[this.formatNull(values.data.zrk)]}人</td>',
            '</tr>',

            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:16px;text-align:center;">',
            '<td width="40%" style="border:1px solid #ccc;">家庭户数</td>',
            '<td width="60%" style="border:1px solid #ccc;">{[this.formatNull(values.data.jths)]}户</td>',
            '</tr>',

            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:16px;text-align:center;">',
            '<td width="40%" style="border:1px solid #ccc;">房屋数</td>',
            '<td width="60%" style="border:1px solid #ccc;">{[this.formatNull(values.data.fws)]}间</td>',
            '</tr>',
            '<tr width="100%" style="min-height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:16px;text-align:center;">',
            '<td width="40%" style="border:1px solid #ccc;">所属该镇的村</td>',
            '<td width="60%" style="border:1px solid #ccc;">{[this.formatNull(values.data.gzc)]}</td>',
            '</tr>',

            '</table>',
            {
                formatNull: function(data) {
                    if(data != ''){
                        return data;
                    }
                    else{
                        return '--';
                    }
                }
            }
        )
    },

    onDataSet: function(record){
        var me = this;
        me.setData(record);
    }

});