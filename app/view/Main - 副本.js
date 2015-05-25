Ext.define('YzMobile.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.Video'
    ],
    config: {
        tabBarPosition: 'bottom',

        items: [
            {
                title: 'Welcome',
                iconCls: 'home',

                styleHtmlContent: true,
                scrollable: true,

                items: {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'Welcome to Sencha Touch 2',
                    items:[{
                        xtype:'button',
                        text:'123',
                        //scope:true,
                        handler:function(){

                            var me = this;
                            var uri = encodeURI("http://115.236.2.245:38019/123.apk");
                            var name = "cash.apk";
                            var fileTransfer = new FileTransfer();

                            fileTransfer.onprogress = function(progressEvent) {
                                if (progressEvent.lengthComputable) {
                                    var percent = Number((progressEvent.loaded / progressEvent.total) * 100).toFixed(0);

                                    me.setText(percent);
                                    // alert(percent);

                                    //me.getLoad().onDataSet('更新下载中','正在下载中',percent);
                                } else {
                                    //plugins.Toast.ShowToast("error",1000);
                                    //me.getLoad().hide();
                                }
                            };

                            fileTransfer.download(
                                uri,
                                "cdvfile://localhost/persistent/Download/" + name,
                                function(entry) {

                                    alert(entry.fullPath);
                                    plugins.Install.InstallApk("mnt/sdcard"+entry.fullPath);
                                },
                                function(error) {

                                    alert(error.code);
                                    //plugins.Toast.ShowToast(' '+error.source,3000);
                                    // me.getLoad().hide();
                                }
                            );
                        }

                    }]
                },

                html: [
                    "You've just generated a new Sencha Touch 2 project. What you're looking at right now is the ",
                    "contents of <a target='_blank' href=\"app/view/Main.js\">app/view/Main.js</a> - edit that file ",
                    "and refresh to change what's rendered here."
                ].join("")
            },
            {
                title: 'Get Started',
                iconCls: 'action',

                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'Getting Started'
                    },
                    {
                        xtype: 'video',
                        url: 'http://av.vimeo.com/64284/137/87347327.mp4?token=1330978144_f9b698fea38cd408d52a2393240c896c',
                        posterUrl: 'http://b.vimeocdn.com/ts/261/062/261062119_640.jpg'
                    }
                ]
            }
        ]
    }
});
