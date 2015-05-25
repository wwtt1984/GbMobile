/**
 * Created by USER on 14-5-8.
 */

Ext.define('YzMobile.view.project.ProjectDetail', {
    extend: 'Ext.Panel',
    xtype: 'projectdetail',

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
            '<td width="40%" style="border:1px solid #ccc;">水库编号</td>',
            '<td width="60%" style="border:1px solid #ccc;">{[this.formatNull(values.data.ID)]}</td>',
            '</tr>',
            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:16px;text-align:center;">',
            '<td width="40%" style="border:1px solid #ccc;">水库名称</td>',
            '<td width="60%" style="border:1px solid #ccc;">{[this.formatNull(values.data.skmc)]}</td>',
            '</tr>',
            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:16px;text-align:center;">',
            '<td width="40%" style="border:1px solid #ccc;">水库类型</td>',
            '<td width="60%" style="border:1px solid #ccc;">{[this.formatNull(values.data.type)]}</td>',
            '</tr>',

            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:16px;text-align:center;">',
            '<td width="40%" style="border:1px solid #ccc;">所属乡镇</td>',
            '<td width="60%" style="border:1px solid #ccc;">{[this.formatNull(values.data.xzmc)]}</td>',
            '</tr>',

            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:16px;text-align:center;">',
            '<td width="40%" style="border:1px solid #ccc;">坝型</td>',
            '<td width="60%" style="border:1px solid #ccc;">{[this.formatNull(values.data.bx)]}</td>',
            '</tr>',

            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:16px;text-align:center;">',
            '<td width="40%" style="border:1px solid #ccc;">坝高</td>',
            '<td width="60%" style="border:1px solid #ccc;">{[this.formatNull(values.data.bg)]}米</td>',
            '</tr>',
            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:16px;text-align:center;">',
            '<td width="40%" style="border:1px solid #ccc;">集雨面积</td>',
            '<td width="60%" style="border:1px solid #ccc;">{[this.formatNull(values.data.jymj)]}</td>',
            '</tr>',
            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:16px;text-align:center;">',
            '<td width="40%" style="border:1px solid #ccc;">总库容</td>',
            '<td width="60%" style="border:1px solid #ccc;">{[this.formatNull(values.data.zkr)]}万立方米</td>',
            '</tr>',
            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:16px;text-align:center;">',
            '<td width="40%" style="border:1px solid #ccc;">正常库容</td>',
            '<td width="60%" style="border:1px solid #ccc;">{[this.formatNull(values.data.zckr)]}万立方米</td>',
            '</tr>',
            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:16px;text-align:center;">',
            '<td width="40%" style="border:1px solid #ccc;">开工时间</td>',
            '<td width="60%" style="border:1px solid #ccc;">{[this.formatNull(values.data.kgsj)]}</td>',
            '</tr>',

            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:16px;text-align:center;">',
            '<td width="40%" style="border:1px solid #ccc;">竣工时间</td>',
            '<td width="60%" style="border:1px solid #ccc;">{[this.formatNull(values.data.jgsj)]}</td>',
            '</tr>',
            '<tr width="100%" style="height: 2.2em;line-height:2.2em;border:1px solid #ccc;font-size:16px;text-align:center;">',
            '<td width="40%" style="border:1px solid #ccc;">备注</td>',
            '<td width="60%" style="border:1px solid #ccc;">{[this.formatNull(values.data.bz)]}</td>',
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

//        var store = Ext.getStore('ProjectDetailStore');
//        store.clearFilter();
//        store.filter('skid', record.data.sid);

        me.setData(record);
    }

});