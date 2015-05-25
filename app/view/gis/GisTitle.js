/**
 * Created by USER on 14-7-19.
 */

Ext.define('YzMobile.view.gis.GisTitle', {
    extend: 'Ext.Container',
    xtype: 'gistitle',
    config:{

        itemId: 'gistitle',
        styleHtmlContent: true,
        items: {

            html: [
                    '<div class="gmap" style="background:#fff;height:100%;width:100%;font-size:16px;">',
                    '<div class="gmap-item-selected" style="width:14%;height:25px;float:left;margin:-0.8em 0 0 0">',
                    '<img src="resources/images/gis/y.png" style="float:left;"/>',
                    '<div style="float:left;margin:-0.2em auto">水位站</div>',
                    '</div>',
                    '<div class="gmap-item" style="width:14%;height:25px;float:left;margin:-0.8em 0 0 0">',

                    '<img src="resources/images/gis/s.png" style="float:left;"/>',
                    '<div style="float:left;margin:-0.2em auto">雨量站</div>',
                    '</div>',
                    '<div class="gmap-item" style="width:14%;height:25px;float:left;margin:-0.8em 0 0 0">',
                    '<img src="resources/images/gis/sk.png" style="float:left;"/>',
                    '<div style="float:left;margin:-0.2em auto">水库站</div>',
                    '</div>',

                    '<div class="gmap-item" style="width:14%;height:25px;float:left;margin:-0.8em 0 0 0">',
                    '<img src="resources/images/gis/Y1.png" style="float:left;"/>',
                    '<div style="float:left;margin:-0.2em auto">水闸站</div>',
                    '</div>',

                    '<div class="gmap-item" style="width:14%;height:25px;float:left;margin:-0.8em 0 0 0">',
                    '<img src="resources/images/gis/difang.png" style="float:left;"/>',
                    '<div style="float:left;margin:-0.2em auto">堤防</div>',
                    '</div>',

                    '<div class="gmap-item" style="width:14%;height:25px;float:left;margin:-0.8em 0 0 0">',
                    '<img src="resources/images/gis/shuidianzhan.png" style="float:left;"/>',
                    '<div style="float:left;margin:-0.2em auto">水电站</div>',
                    '</div>',

                    '<div class="gmap-item" style="width:14%;height:25px;float:left;margin:-0.8em 0 0 0">',
                    '<img src="resources/images/gis/shantang.png" style="float:left;"/>',
                    '<div style="float:left;margin:-0.2em auto">山塘</div>',
                    '</div>',
                    '</div>'
            ].join("")
        }

    }
})
