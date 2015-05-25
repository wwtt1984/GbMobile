Ext.define('YzMobile.view.typhoon.popDetail.TfPopDetailInfo', {
    extend: 'Ext.Container',
    xtype: 'TfPopDetailInfo',
//    id: 'tfPopDetailInfo',
    requires: ['Ext.XTemplate'],
    config: {
        //cls: 'detail-card',
        itemId: 'tfPopDetailInfo',
        styleHtmlContent: true,
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        tpl: Ext.create('Ext.XTemplate',
          '<div style="min-height:2.6em;line-height:2em;font-size:1em;width:100%; text-align:center;border:#ccc solid 1px;">当前台风中心距离宁波鄞州:{toZhuJiDistance}(公里)</div>',
          '<div style="min-height:2.6em;line-height:2em;font-size:1em;width:100%; text-align:center;border:#ccc solid 1px;">时间:{sj}</div>',
          '<div>',
              '<div style="min-height:2.6em;line-height:2em;font-size:1em;width:45%; text-align:center; float:left;border:#ccc solid 1px;">经度:{[this.formatData(values.jd)]}(度)</div>',
              '<div style="min-height:2.6em;line-height:2em;font-size:1em;width:55%; text-align:center; float:right;border:#ccc solid 1px;">七级风圈:{qjfq}(公里)</div>',
          '</div>',
          '<div style="clear:both">',
              '<div style="min-height:2.6em;line-height:2em;font-size:1em;width:45%; text-align:center; float:left;border:#ccc solid 1px;">纬度:{[this.formatData(values.wd)]}(度)</div>',
              '<div style="min-height:2.6em;line-height:2em;font-size:1em;width:55%; text-align:center; float:right;border:#ccc solid 1px;">十级风圈:{sjfq}(公里)</div>',
          '</div>',
          '<div style="clear:both">',
              '<div style="min-height:2.6em;line-height:2em;font-size:1em;width:45%; text-align:center; float:left;border:#ccc solid 1px;">风速:{fs}(米/秒)</div>',
              '<div style="min-height:2.6em;line-height:2em;font-size:1em;width:55%; text-align:center; float:right;border:#ccc solid 1px;">移动速度:{ydsd}(千米/时)</div>',
          '</div>',
          '<div style="clear:both">',
              '<div style="min-height:2.6em;line-height:2em;font-size:1em;width:45%; text-align:center; float:left;border:#ccc solid 1px;">近中心风力:{jzxfl}(级)</div>',
              '<div style="min-height:2.6em;line-height:2em;font-size:1em;width:55%; text-align:center; float:right;border:#ccc solid 1px;">中心气压:{zxqy}(百帕)</div>',
          '</div>',
          {
              formatData: function(jdWdData) {
                  return new Number(jdWdData).toFixed(1);
              }
          }, { compiled: true }
        )
    }
});


      