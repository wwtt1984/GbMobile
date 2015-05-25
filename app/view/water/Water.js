/**
 * Created by USER on 14-5-4.
 */

Ext.define('YzMobile.view.water.Water', {
    extend: 'Ext.List',
    xtype: 'water',

    requires: [
        'Ext.plugin.PullRefresh',
        'Ext.plugin.ListPaging'
    ],

    config: {

        title: '水情信息',

        loadingText: false,
        scrollToTopOnRefresh: false,

        masked: {
            xtype: 'loadmask',
            message: '努力加载中...'
        },

        plugins: [
            {
                xclass: 'Ext.plugin.ListPaging',
                loadMoreText: '加载更多...',
                noMoreRecordsText: '没有更多记录了...',
                autoPaging:true
            },
            {
                xclass: 'Ext.plugin.PullRefresh',
                pullText: '下拉刷新...',

                releaseText: '松开进行刷新...',

                loadingText: '正在刷新...',

                loadedText: '刷新完成.',

                lastUpdatedText: '刷新时间:&nbsp;'
            }
        ],

        cls: 'tidelist',
        store: 'WaterStore',

        emptyText: '<p class="no-searches">没有符合要求的记录</p>',

        itemTpl: [
            '<div style="width:30%;font-size:16px;line-height:2.6em;text-align:center;padding:0;margin:0;float:left;overflow:hidden;text-overflow: clip;white-space: nowrap;background-color:{[this.getBg(0)]};">{[this.getSTNM(values.stnm, values.Danger)]}</div>',
            '<div style="width:35%;font-size:14px;line-height:3.0em;text-align:center;padding:0;margin:0;overflow:hidden;text-overflow: clip;white-space: nowrap;float:left;background-color:{[this.getBg(0)]};">{[this.getContent(values.new, values.newTime, values.Danger)]}</div>',
            '<div style="width:35%;font-size:14px;line-height:3.0em;text-align:center;padding:0;margin:0;overflow:hidden;text-overflow: clip;white-space: nowrap;float:right;background-color:{[this.getBg(1)]};">{[this.getContent(values.max, values.maxTime,  values.Danger)]}</div>',
            //'<div style="width:30%;font-size:16px;line-height:2.6em;text-align:center;padding:0;margin:0;float:left;overflow:hidden;text-overflow: clip;white-space: nowrap;">{[this.getSTNM(values.stnm, values.Danger)]}</div>',
            //'<div style="width:35%;font-size:14px;line-height:3.0em;text-align:center;padding:0;margin:0;overflow:hidden;text-overflow: clip;white-space: nowrap;float:left;">{[this.getContent(values.new, values.newTime, values.Danger)]}</div>',
            //'<div style="width:35%;font-size:14px;line-height:3.0em;text-align:center;padding:0;margin:0;overflow:hidden;text-overflow: clip;white-space: nowrap;float:right;">{[this.getContent(values.max, values.maxTime,  values.Danger)]}</div>',
            {
                getSTNM: function(value, bool) {
                    if (value == '') {
                        return '--'
                    } else if (bool == 'true') {
                        return '<span style="color: #ff0000; font-weight: 600;" >' + value + '</span>';
                    } else {
                        return value;
                    }
                },

                getContent: function(value, time, bool){
                    if(value == ""){
                      return "--";
                    } else if (bool == 'true') {
                        return '<span style="color: #ff0000; font-weight: 600;" >' +  value + '(' + this.getTime(time) + ')' + '</span>';
                    } else {
                        return value + '(' + this.getTime(time) + ')'
                    }

                },
                getTime: function(values){
                    var string = '';
                    string = values.substr(8,2) + '日' + values.substr(11,2) + '时';
                    return string;
                },
                getBg: function (bool) {
                    if (!this.count) this.count = 0;
                    var color = '';
                    if (this.count % 2 == 0) color = '#fff';
                    else color = '#e9e9e9';
                    if (bool == 1) this.count++;
                    return color;
                }
            }
        ],

        items: [
            {
                docked: 'top',
                xtype: 'panel',
                cls: 'tide-header',
                html: '<div style="width:30%;height:100%;float:left;">测站</div><div style="width:35%;height:100%;float:left;">最新(m)</div><div style="width:35%;height:100%;float:left;">最高水位(m)</div>'
            }
        ]
    }
});