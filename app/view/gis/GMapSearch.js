/**
 * Created by teddy on 15/4/8.
 */

Ext.define('YzMobile.view.gis.GMapSearch',{
    extend:'Ext.List',
    xtype:'mapSearch',

    requires:[],

    config:{
        refs:{
            info: 'main info',
            gmap:'gmap',
            main: 'main'
        },
        title:'地图搜索',
        itemId:'gissearch',
        cls:'contact-list',
        pinHeaders:false,

        itemTpl:[
            '<div class="contact-list-item">{MySearchName}&nbsp;&nbsp;&nbsp;{[this.getContent(values.MyType)]}</div>',
            {
                getContent:function(value)
                {
                    switch (value)
                    {
                        case 'sw':
                            return '类型: 水位站';
                            break;
                        case  'yl':
                            return '类型: 雨量站';
                            break;
                        case 'sk':
                            return '类型: 水库';
                            break;
                        case 'sz':
                            return '类型: 水闸';
                            break;
                        case 'df':
                            return '类型: 堤防';
                            break;
                        case 'sdz':
                            return '类型: 水电站';
                            break;
                        case 'st':
                            return '类型: 山塘';
                            break;
                        default :
                            break;
                    }
                }
            }
        ],

        store:{
                model:'YzMobile.model.WaterRainModel'
        },
        useSimpleItems:true,
        emptyText:'<div style:"margin-top: 20px; text-align:center"> 无匹配记录</div>',
        disableSelection: true,
        items:[
            {
                xtype:'toolbar',
                docked:'top',
                ui:'light',
                cls:'contact-search',
                style:'border:none;',

                items:[
                    {
                        xtype:'searchfield',
                        placeHolder:'请输入汉字或者拼音首字母组合',
                        style:'width:96%;border:none;margin:0 2% 0 2%;',
                        listeners:{
                            clearicontap: function () {
                                Ext.ComponentQuery.query('#gissearch')[0].onSearchClearIconTap();
                            },
                            keyup: function (field) {
                                Ext.ComponentQuery.query('#gissearch')[0].onSearchKeyUp(field);
                            }
                        }
                    }
                ]
        }
        ]

        //listeners:{
        //    //点击其中某一项
        //    itemtap:function(list,index,target,record,e,eOpts){
        //
        //        if(record.get('Y') && record.get('X')){
        //            Ext.ComponentQuery.query('#info')[0].pop();
        //
        //        }else{
        //            Ext.Msg.alert('你选择的测站在地图上没有显示坐标');
        //
        //        }
        //    }
        //}

    },


    onSearchKeyUp:function(field){
            var value = field.getValue();
            store = Ext.getStore('WaterRainStore');
            var me = this;
            store.clearFilter(!!value);

            if(value){
                store.filter([{
                    filterFn:function(item){
                        return item.get('MySearchName').toUpperCase().indexOf(value.toUpperCase()) >= 0;
                    }
                }]);

                me.getStore().setData(store.getData().items);
            }
        },

    onSearchClearIconUp:function(){
            var me = this;
            Ext.getStore('WaterRainStore').clearFilter();
           // me.getStore().removeAll();
        }

});