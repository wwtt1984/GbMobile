/**
 * Created by Stiffen on 2015/5/26.
 */

Ext.define('YzMobile.view.land.ImageView', {
    extend : 'Ext.Panel',
    xtype : 'imageView',
    config : {
        style:"background:black",
        src : null,
        items : [
            {
                xtype : "img",
                id : "_show_image",
                width : "100%",
                height : "100%",
                margin : "0 0 0 0",
                cls : "showImageCls"
            }
        ]
    },

    initialize: function() {
        var me = this;
        me.callParent();

        //设置图片的路径
        var view = imageView = Ext.getCmp("_show_image");
        imageView.setSrc(me.getSrc());

        //记录双指触屏的位置touch0(x0, y0), touch1(x1, y1), 中心点(centerX0, centerY0)==============
        var x0, y0, x1, y1, touch0, touch1, centerX0, centerY0;
        x0 = y0 = x1 = y1 = centerX0 = centerY0 = -1;

        //新获取的双指触屏的位置touch00(x00, y00), touch11(x11, y11), 中心点(centerX1, centerY1)===================
        var x00, y00, x11, y11, touch00, touch11, centerX1, centerY1;

        //ImageView可视宽高===================================================
        var viewVisionWidth, viewVisionHeight;
        viewVisionWidth = me.element.dom.clientWidth;
        viewVisionHeight = me.element.dom.clientHeight;

        //ImageView的宽高===================================================
        var viewWidth, viewHeight;
        viewWidth = imageView.element.dom.clientWidth;
        viewHeight = imageView.element.dom.clientHeight;
        //ImageView的上边距和左边距===================================================
        var top, left, topMin, leftMin, topMax, leftMax;
        topMin = viewVisionHeight - viewHeight;
        leftMin = viewVisionWidth - viewWidth;
        topMax = leftMax = 0;

        view.element.on('pinchstart', function(event, node, options, eOpts) {
            touch0 = event.touches[0];
            x0 = touch0.pageX;
            y0 = touch0.pageY;
            touch1 = event.touches[1];
            x1 = touch1.pageX;
            y1 = touch1.pageY;

            //两个触摸点的中间点初始化
            centerX0 = (x0 + x1) / 2;
            centerY0 = (y0 + y1) / 2;
        }, view);

        view.element.on('pinch', function(event, node, options, eOpts) {
            touch00 = event.touches[0];
            x00 = touch00.pageX;
            y00 = touch00.pageY;
            touch11 = event.touches[1];
            x11 = touch11.pageX;
            y11 = touch11.pageY;

            if(x0 == -1 || y0 == -1) {
                return;
            }
            //两个触摸点的差值
            var minusX = Math.abs(x11-x00) - Math.abs(x1-x0);
            var minusY = Math.abs(y11-y00) - Math.abs(y1-y0);
            //两个触摸点的中间点初始化
            centerX1 = (x00 + x11) / 2;
            centerY1 = (y00 + y11) / 2;

            var oldWidth = view.getWidth();
            var oldHeight = view.getHeight();
            console.log("pinch 进行缩放oldWidth is " + oldWidth + ", oldHeight is " + oldHeight + "");
            var addWidth = parseInt(oldWidth.split("%")[0])+minusX;
            var addHeight = parseInt(oldHeight.split("%")[0])+minusY;
            console.log("pinch 进行缩放addWidth is " + addWidth + "%, addHeight is " + addHeight + "%");
            //缩放比值
            var zoomScaling = addWidth;
            var minusZoom = minusX;
            if(Math.abs(minusX) < Math.abs(minusY) && addHeight >= 100 && addHeight < 800) {
                //放大取大值，缩小取值，绝对值大取绝对值大的
                zoomScaling = addHeight;
                minusZoom = minusY;
            }
            //控制缩放范围在0%~500%之间
            if(zoomScaling >= 100 && zoomScaling < 800) {
                view.setWidth(zoomScaling + "%");
                view.setHeight(zoomScaling + "%");
                //保证图片一致处于中央位置
                var marginArr = view.getMargin().split(" ");
                top = - viewVisionHeight * minusZoom / 200 + parseInt(marginArr[0]);
                left = - viewVisionWidth * minusZoom / 200 + parseInt(marginArr[3]);

                //两指中心点有改变，修正值
                if(centerX0 != -1 && centerY0 != -1) {
                    top += centerY1 - centerY0;
                    left += centerX1 - centerX0;
                    //重置数据
                    centerX0 = centerX1;
                    centerY0 = centerY1;
                }
                if(top < topMin) {
                    top = topMin;
                } else if (top > topMax) {
                    top = topMax;
                }
                if(left < leftMin) {
                    left = leftMin;
                } else if (left > topMax) {
                    left = leftMax;
                }
                view.setMargin(top + " 0 0 " + left);
                //重置一些数据
                viewWidth = imageView.element.dom.clientWidth;
                viewHeight = imageView.element.dom.clientHeight;
                console.log("wh ImageView：(" + viewWidth + ", " + viewHeight + ")");
                topMin = viewVisionHeight - viewHeight;
                leftMin = viewVisionWidth - viewWidth;
                x0 = x00;
                y0 = y00;
                x1 = x11;
                y1 = y11;
            }

        }, view);

        view.element.on('pinchend', function(event, node, options, eOpts) {
            x0 = y0 = x1 = y1 = -1;
        }, view);

        //移动ImageView记录touchstart时的位置(x2, y2)========================
        var x2, y2;
        x2 = y2 = -1;
        view.element.on('touchstart', function(event, node, options, eOpts) {
            viewVisionWidth = me.element.dom.clientWidth;
            viewVisionHeight = me.element.dom.clientHeight;
            x2 = event.pageX;
            y2 = event.pageY;
        }, view);
        view.element.on('touchmove', function(event, node, options, eOpts) {
            var touches = event.touches;
            switch(touches.length) {
                case 1:
                    if(viewWidth > viewVisionWidth) {
                        console.log("touch Move==>位置:(" + event.pageX + ", " + event.pageY + ")");
                        var marginArr = view.getMargin().split(" ");
                        console.log("touch Move==>Margin初始值:" + marginArr.toString());
                        top = event.pageY - y2 + parseInt(marginArr[0]);
                        left = event.pageX - x2 + parseInt(marginArr[3]);
                        if(top < topMin) {
                            top = topMin;
                        } else if (top > topMax) {
                            top = topMax;
                        }
                        if(left < leftMin) {
                            left = leftMin;
                        } else if (left > topMax) {
                            left = leftMax;
                        }
                        console.log("touch Move==>Margin变换值:(" + top + " 0 0 " + left + ")");
                        view.setMargin(top + " 0 0 " + left);
                    }
                    x2 = event.pageX;
                    y2 = event.pageY;
                    break;
                case 2:

                    break;
                default:
                    break;
            };
        }, view);
        view.element.on('touchend', function(event, node, options, eOpts) {
            x2 = y2 = -1;
        }, view);
    }
});