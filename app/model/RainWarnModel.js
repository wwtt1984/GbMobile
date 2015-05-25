/**
 * Created by kukiss on 2015/4/10 0010.
 */
Ext.define('YzMobile.model.RainWarnModel', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            'place',
            'warn',
            'warn1',
            'warn3',
            'warn24',
            'danger',
            'danger1',
            'danger3',
            'danger24'
        ]
    }
});