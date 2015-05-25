Ext.define('YzMobile.model.UserModel',{
	extend: 'Ext.data.Model',
    config: {
        fields: [
            'uid',
            'name',
            'password',
            'mobile',
            
            'stxt',
            'stemperature'
            
        ]
    }
        
});