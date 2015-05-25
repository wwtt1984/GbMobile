/**
 * Created by USER on 14-8-13.
 */

Ext.define('YzMobile.view.Login', {

    extend: 'Ext.Panel',
    xtype: 'login',
    requires: [
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Password'
    ],

    config:{
        layout: 'fit',
        items:[
            {
                xtype: 'toolbar',
                title: '登录',
                docked: 'top',
                ui: 'light',
                items:[
                    {xtype:'button', ui:'plain', text:'站点', itemId:'login_placePick', right:0}
                ]
            },
            {
                xtype: 'formpanel',
                margin: '10px 0 0 0',
                items: [
                    {
                        xtype: 'fieldset',
                        defaults: {
                            required: true,
                            labelAlign: 'left',
                            labelWidth: '40%'
                        },
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'name',
                                name: 'name',
                                label: '用户名'
                                //value: 'liuxin'
                            },
                            {
                                xtype: 'passwordfield',
                                id: 'password',
                                name: 'password',
                                label: '密码'
                                //value: 'eXpzbGoxMjM='
                                //value:'123'
                            }]
                    },
                    {
                        xtype: 'panel',
                        defaults: {
                            xtype : 'button',
                            style: 'min-height: 2.2em;',
                            cls   : 'demobtn',
                            flex  : 1,
                            margin: 10
                        },
                        layout: {
                            type: 'hbox',
                            align: 'middle'
                        },
                        items: [
                            {
                                text: '登录',
                                id:  'confirm'

                            }]
                    }]
            }]
    },

    initialize: function() {

    }
});
