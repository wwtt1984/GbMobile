/**
 * Created by kukiss on 2015/3/25 0025.
 */
Ext.define('YzMobile.view.plan.PlanList', {
    extend: 'Ext.List',
    xtype: 'planList',

    config: {
        title: '防汛预案',
        fullscreen: true,
        store: 'PlanStore',
        loadingText:'加载中,请稍后...',
        emptyText:'暂无数据',
        itemTpl: [
            '<div style="font-weight: 600; margin-bottom: 4px;margin-bottom: 10px;">{Sname}</div>'
        ]
    }


});