/**
 * Created by USER on 14-3-24.
 */

Ext.define('YzMobile.view.settings.Update', {
    extend: 'Ext.Panel',
    xtype: 'update',

    requires: [

    ],

    config: {
        title: '更新日志',

        scrollable: {
            direction: 'vertical',
            directionLock: true
        },

        style: 'background:#f7f7f7; padding: 0px 10px 0 10px;',

        tpl: Ext.create('Ext.XTemplate',
          '<tpl for=".">',
            '<div style="width:100%; font-size:16px; height:2.2em; line-height:2.2em; font-weight: bold;padding: 10px 0px 0px 0px;">版本号：{data.strthisversion}</div>',
            '<div style="width:100%; font-size:16px; height:2.2em; line-height:2.2em; ">更新内容:</div>',
            '{[this.getContent(values)]}',
            '<div style="width:100%; font-size:16px; height:2.2em; line-height:2.2em;">{data.content}</div>',
            '<div style="width:100%; font-size:16px; height:2.2em; line-height:2.2em; border-bottom: 1px #ddd solid;">更新日期：{data.strdate}</div>',
          '</tpl>',
            {
                getContent: function(values){

                    var content = [];
                    content = values.data.strlog.split('\\r\\n');
                    var string = '';

                    if(content.length > 0){
                        for(var i = 0; i < content.length; i++){
                            if(content[i] != "" ){
                                string += '<p style="text-indent:2em;font-size:16px;line-height:1.6em;-webkit-margin-after: 0px;">' + content[i] + '</p>';
                            }
                        }
                    }
                    return string;
                }
            }
        )
    },

    onDataSet: function(){
        var me = this;
        var store = Ext.getStore('UpdateStore');

        store.getProxy().setExtraParams({
            t: 'CheckVersionAll',
            results: 'android$jsonp'
        });

        store.load(function(records, operation, success) {
            if(!success)
            {
                plugins.Toast.ShowToast("网络不给力，无法读取数据!",3000);
            }
            else{
                me.setData(store.getData().all);
            }
        });
    }
})