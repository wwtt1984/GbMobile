/**
 * Created by kukiss on 2015/3/11 0011.
 */
Ext.define('YzMobile.view.project.ProjectMenuPart', {
    extend: 'Ext.List',
    xtype: 'projectMenuPart',

    requires: [
        'Ext.plugin.PullRefresh',
        'Ext.plugin.ListPaging'
    ],

    config: {

        title: '水库信息',

        store: 'ProjectMenuPartStore',
        cls: 'tidelist',
        itemTpl: [
            '<div style="width:33%;font-size:14px;line-height:3em;text-align:center;padding:0;margin:0;float:left;overflow: hidden;white-space:nowrap;">{[this.display(values.RSNM)]}</div>',
            '<div style="width:33%;font-size:14px;line-height:3em;text-align:center;padding:0;margin:0;float:left;overflow: hidden;white-space:nowrap;">{[this.display(values.CANM)]}</div>',
            '<div style="width:33%;font-size:14px;line-height:3em;text-align:center;padding:0;margin:0;float:left;overflow: hidden;white-space:nowrap;">{[this.display(values.ADNM)]}</div>',
            {
                display: function (value) {
                    if (value == '') {
                        return '--';
                    } else {
                        return value;
                    }
                }
            }
        ],

        items: [
            {
                docked: 'top',
                xtype: 'panel',
                cls: 'tide-header',
                html: '<div style="width:33%;height:100%;float:left;">名称</div><div style="width:33%;height:100%;float:left;">所属流域</div><div style="width:33%;height:100%;float:left;">所属乡镇</div>'
            }
        ]
    }

});