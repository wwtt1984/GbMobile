/**
 * Created by USER on 14-5-4.
 */

Ext.define('YzMobile.view.rain.RainBar', {
    extend: 'Ext.Container',
    xtype: 'rainbar',

    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Bar',
        'Ext.chart.interactions.PanZoom'
    ],



    config: {
        layout: 'fit',
        title: '雨量柱状图',
        items: [
            {
                xtype: 'titlebar',
                itemId: 'rainbartitle',
                style: 'height:1.6em;font-size:14px;text-align:center;',
                ui: 'plain',
                title: '2014-08-14雨量柱状图'
            },
            {
                xtype: 'chart',
//                style: 'margin-top: 20px;',
                itemId: 'rainchart',

                store: 'RainDetailStore',
                innerPadding: {
                    top: 15
                },
                interactions: [
                    {
                        type: 'panzoom'
//                        panGesture: 'none'
                    }
                ],
                axes: [
                    {
                        type: 'category',
                        position: 'bottom',
                        style: {
                            estStepSize: 16
                        },
                        fields: ['time'],
                        label: {
                            font: '12px Helvetica'
                        },
                        title: {
                            text: '时间',
                            font: '18px Helvetica'
                        }
                    },
                    {
                        type: 'numeric',
                        minimum: 0,
                        position: 'left',
                        style: {
                            estStepSize: 8
                        },
                        field: 'value',
                        title: {
                            text: '雨量',
                            font: '18px Helvetica'
                        },
                        label: {

                            font: '12px Helvetica'
                        }
                    }],
                series: [
                    {
                        type: 'bar',
                        xField: 'time',
                        yField: 'value',

                        axis: 'left',
                        label: {
                            font: '13px Helvetica',
                            orientation: 'vertical',
                            display: 'insideEnd',
                            textBaseline: 'middle',
                            textAlign: 'center',
                            field: 'value'
                        },
                        style: {
                            stroke: '#333',
                            fill: 'rgb(49,235,247)',
                            minGapWidth: 8
                        }
                    }]
            }]
    },

    SelectBarValue: function(record, date) {

        var me = this;
        me.stcd = record.data.stcd;
        me.stnm = record.data.stnm;
        //Ext.ComponentQuery.query('#rainchart')[0]._axes[1].setMaximum(parseFloat(record.data.raintoday) + 1.00);
        Ext.ComponentQuery.query('#rainchart')[0]._axes[1].setMaximum(parseFloat(record.data.rain3h) + 5.00);
        Ext.ComponentQuery.query('#rainbartitle')[0].setTitle(date);
        Ext.ComponentQuery.query('#rainchart')[0]._axes[0].setTitle(date);

        me.setTitle(record.data.stnm);


//        Ext.ComponentQuery.query('#rainchart')[0].redraw();
    },


    onRainDayDetailValue: function(title, store){
        var me = this;

        var max = 0;
        for(var i=0;i<store.getAllCount();i++)
        {
            max = Math.max(max,store.getAt(i).data.value);
        }
        Ext.ComponentQuery.query('#rainchart')[0]._axes[1].setMaximum(max + 1.00);

        Ext.ComponentQuery.query('#rainbartitle')[0].setTitle(title);

        Ext.ComponentQuery.query('#rainchart')[0]._axes[0].setTitle('时间');
        Ext.ComponentQuery.query('#rainchart')[0].redraw();

        YzMobile.app.getController('MainControl').onDateSearchViewHide();
        Ext.Viewport.setMasked(false);
    }
});