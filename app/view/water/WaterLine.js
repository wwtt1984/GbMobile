/**
 * Created by USER on 14-5-4.
 */

Ext.define('YzMobile.view.water.WaterLine', {
    extend: 'Ext.Container',
    xtype: 'waterline',

    requires: [
        'Ext.chart.Chart',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category',
        'Ext.chart.series.Line',
        'Ext.chart.interactions.PanZoom'
    ],

    config: {

        layout: 'fit',
        title: '水位过程线',
        items: [
            {
                xtype: 'titlebar',
                itemId: 'waterlinetitle1',
                style: 'height:1.6em;font-size:14px;text-align:center;',
                ui: 'plain',
                title: '2014-08-14水位过程线'
            },
            {
                xtype: 'chart',
                store: 'RainDetailStore',
                itemId: 'waterchart',
                interactions:
                {
                    type: 'panzoom'
//                    panGesture: 'none'
                },

                insetPadding: {
                    top: 15,
                    right: 15
                },
                series: [
                    {
                        type: 'line',
                        xField: 'time',
                        yField: 'value',

                        style: {
                            stroke: 'blue',
                            lineWidth: 2
                        },
                        highlightCfg: {
                            scale: 2
                        },
                        marker: {
                            type: 'circle',
                            stroke: '#blue',
                            fill: '#115fa6',
                            lineWidth: 2,
                            radius: 4
                        },
                        label: {
                            font: '13px Helvetica',
                            orientation: 'horizontal',
                            display: 'rotate',
                            textBaseline: 'middle',
                            textAlign: 'center',
                            field: 'value'
                        }
                    }],
                axes: [
                    {
                        type: 'numeric',
                        fields: ['value'],
                        minimum: 0,
                        position: 'left',
                        style: {
                            estStepSize: 8
                        },
                        title: {
                            text: '水位',
                            font: '18px Helvetica'
                        },
                        label: {
                            font: '13px Helvetica'
                        }
                    },
                    {
                        type: 'category',
                        fields: ['time'],
                        position: 'bottom',
                        style: {
                            estStepSize: 25
                        },
                        label: {
                            field: 'time',
                            font: '13px Helvetica'
                        },
                        title: {
                            text: '时间',
                            font: '18px Helvetica'
                        }
                    }
                ]
            }
        ]
    },

    initialize: function() {
    },

    SelectLineValue: function(record, date) {

        var me = this;
        me.stcd = record.data.stcd;
        me.stnm = record.data.stnm;

        Ext.ComponentQuery.query('#waterchart')[0]._axes[0].setMaximum(parseFloat(record.data.max) + 3.00);
        Ext.ComponentQuery.query('#waterchart')[0]._axes[0].setMinimum(parseFloat(record.data.max) - 3.00);

        Ext.ComponentQuery.query('#waterlinetitle1')[0].setTitle(date);
        me.setTitle(record.data.stnm);
        Ext.ComponentQuery.query('#waterchart')[0]._axes[1].setTitle(date);
//        Ext.ComponentQuery.query('#waterchart')[0].redraw();

    },

    onWaterDayDetailValue: function(title, store){
        var me = this;

        var max = 0;
        var min = 0
        for(var i=0;i<store.getAllCount();i++)
        {
            max = Math.max(max,store.getAt(i).data.value);
            min = Math.min(min,store.getAt(i).data.value);
        }
        Ext.ComponentQuery.query('#waterchart')[0]._axes[0].setMaximum(max + 5.00);
        Ext.ComponentQuery.query('#waterchart')[0]._axes[0].setMinimum(Math.max(min,0));

        //Ext.ComponentQuery.query('#rainlinetitle')[0].setTitle(title);
        Ext.ComponentQuery.query('#waterlinetitle1')[0].setTitle(title);

        Ext.ComponentQuery.query('#waterchart')[0]._axes[1].setTitle('时间');
//        Ext.ComponentQuery.query('#waterchart')[0].redraw();

        YzMobile.app.getController('MainControl').onDateSearchViewHide();
    }
});