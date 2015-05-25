/**
 * Created by USER on 14-7-12.
 */

Ext.define('YzMobile.view.weather.Weather', {
    extend: 'Ext.Container',
    xtype: 'weather',
    requires: ['Ext.XTemplate'],

    config: {
        title: '天气预报',

        itemId: 'weather',

        style:'background-image:url(resources/images/weather/tq.jpg);height:100%;width:100%;position:absolute;margin:0 0 0 0;padding:0 0 0 0;',
        styleHtmlContent:true,
        tpl: Ext.create('Ext.XTemplate',
            '<div style="height:60%;width:100%;color:white;padding:0px 10px 0px 0px;margin:0 0 0 0;">',
            '<div style="height:40%;width:100%;">',
            '<div style="height:100%;width:40%;float:left;font-size:14px;text-align:center;">{time}发布</div>',
            '<div style="height:100%;width:40%;float:right;font-size:48px;text-align:center;vertical-align : middle">{tempreal}</div>',
            '</div>',
            '<div style="height:60%;width:100%;font-size:14px;clear:both;">',
            '<div style="font-size:18px;width:100%;">{weather}</div>',
            '<div style="margin:.5em 0 0 0;width:100%;">空气质量：{air}</div>',
            '<div style="margin:.5em 0 0 0;width:100%;">湿度：{humidity}  {windreal}</div>',
            //'<div style="height:24%;width:100%;">{date}</div>',
            '</div>',
            '</div>',
            '<div style="height:40%;width:96%;color:white;font-size:14px;text-align:center;border-top:1px solid #cccccc;border-top-style:dashed;margin:1em 0 0 0;padding:0px 10px 0px 0px;">',
            '<div style="height:100%;width:33%;float:left;">',
            '<div style="height:20%;width:100%;padding-top:8px;font-size:16px;">{date}</div>',
            '<img src="{[this.formatImgUrl(image)]}" alt=""  width="50" height="50"/>',
            '<div style="height:13%;">{temp}</div>',
            '<div style="height:13%;width:100%;">{weather}</div>',
            '<div style="height:13%;width:100%;">{wind}</div>',
            '</div>',
            '<div style="height:100%;width:33%;float:left;">',
            '<div style="height:20%;padding-top:8px;font-size:16px;">{date1}</div>',
            '<img src="{[this.formatImgUrl(image1)]}" alt=""  width="50" height="50"/>',
            '<div style="height:13%;">{temp1}</div>',
            '<div style="height:13%;">{weather1}</div>',
            '<div style="height:13%;">{wind1}</div>',
            '</div>',
            '<div style="height:100%;width:34%;float:left;">',
            '<div style="height:20%;padding-top:8px;font-size:16px;">{date2}</div>',
            '<img src="{[this.formatImgUrl(image2)]}" alt=""  width="50" height="50"/>',
            '<div style="height:13%;">{temp2}</div>',
            '<div style="height:13%;">{weather2}</div>',
            '<div style="height:13%;">{wind2}</div>',
            '</div>',
            '</div>',
            '</div>',
            {
                formatImgUrl: function(index) {
                    return "resources/images/weather/" + index + ".png";
                }
            }
        )
    },

    onDataSet: function(record){
        image = record.data.image;
        image1 = record.data.image1;
        image2 = record.data.image2;
        this.setData(record.data);
    }
});