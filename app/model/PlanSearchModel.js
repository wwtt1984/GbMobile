/**
 * Created by kukiss on 2015/3/19 0019.
 * 通讯录搜索Store用到的Model
 */
Ext.define('YzMobile.model.PlanSearchModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            'ID',
            'planNM',
            'planYear',
            'adcd',
            'description',
            'planUrl',
            'time',
            'ADNM',
            'MySearchName'
        ]
    }
});