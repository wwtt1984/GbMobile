/**
 * Created by kukiss on 2015/4/29.
 */
Ext.define('YzMobile.controller.InfoController', {
    extend: 'Ext.app.Controller',

    config: {
        control: {
            '[itemId=infoBack]': { // Info上返回按钮的事件
                tap: function () {
                    switch (WYTool.queryController(this, 'MainControl').infotype) {
                        case 'contactmain':
                            WYTool.queryController(this, 'ContactControl').onBack();
                            break;
                        case 'planlist':
                            WYTool.queryController(this, 'PlanControl').onBack();
                            break;
                    }
                }
            }
        }
    }

});
