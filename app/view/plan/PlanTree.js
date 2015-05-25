/**
 * Created by USER on 14-4-24.
 */

Ext.define('YzMobile.view.plan.PlanTree', {
    extend: 'Ext.Container',
    xtype: 'planlist',

    config: {
        title: '通讯录',
        layout: 'fit',           //touchtreegrid需要
        itemId: 'assignlist',

        items: [
            {
                xtype: 'touchtreegrid',
                columns: [
                    {
                        dataIndex: 'text',
                        width: '95%',
                        style: ' text-align: left; font-size: 18px;'
//                                categStyle: 'height:35px !important;'
                    }],
                leafSelect: false,
                itemHeight: 40,
//                listItemId: 'firstexamplelist',
//                mode: 'MULTI',
                arrowPctWidth: '8',
                disableSelection: false,
                includeFooter: false,
                categDepthColors: true,
                categDepthColorsArr: [
                    '#eee',
                    '#f7f7f7',
                    '#fff'
                ],
                includeFooterLevels: false,
//                        helpHtml: './resources/html/TaskExample.html',
                store: 'ContactTreeStore',
                includeHeader: false,
                defaultCollapseLevel: 1,
                singleExpand: true,
                cls: [
                    'x-touchtreegrid-list',
                    'x-touchtreegrid-list-normal'
                ],
                itemId: 'planTree'
            }
        ]
    },


    listeners: {
        leafitemtap: function (me, list, index, target, record, e, eOpts) {
           Ext.Msg.alert('');
        }
    }
});