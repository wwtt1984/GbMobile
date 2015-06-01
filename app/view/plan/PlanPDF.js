/**
 * Created by Stiffen on 2015/5/27.
 */
Ext.define('YzMobile.view.plan.PlanPDF', {
    extend: 'Ext.Panel',
    xtype: 'planpdf',

    config: {

        layout:'fit',
        items: [
            {
                xtype:'toolbar',
                docked: 'top',
                ui: 'light',
                title: '预案浏览',
                items:[
                    {
                        xtype:'button',
                        text:'返回',
                        itemId:'pdfbtn',
                        ui: 'back'
                    }
                ]
            },
            {
                xtype: 'panel',
                html: '<div style="height:100%;-webkit-overflow-scrolling:touch;">' +
                '<iframe width="100%" height="700px" src="http://115.236.2.245:38028/web/viewer.html?file=/examples/helloworld/helloworld.pdf" frameborder="0" allowfullscreen></iframe>' +
                '</div>',
                id: 'Idpanel',
                hideOnMaskTap: true
            }]
    }
});
