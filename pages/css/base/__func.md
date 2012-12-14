#func详细概述  **func**

##命名空间

现在分三个命名空间.

###mc-base

	基础空间函数包括
	.tab-focus()  //触屏焦点
	.clearfix()   //清浮动
	.rotate(@degrees)  //旋转
	.border-arrow(@width, @height, @color, @border-width:1px, @rotate:0deg)  //箭头.
	.gradientBar(@primaryColor, @secondaryColor, @textColor: #fff, @textShadow: 0 -1px 0 rgba(0,0,0,.25)) //渐变条
	.box-shadow(@shadow)  //盒阴影
	.opacity(@opacity)  //透明度
	.border-radius(@radius) //圆角
	.transition(@transition)  //过渡
		
###font
	
	分为family子空间和若干函数.
	（1）.子空间包括
	.serif()   //字体为“serif”
	.sans-serif()  //字体为"sans-serif"
	.monospace()  //字体为".monospace"
	
	（2）.函数
	.shorthand(@size: @baseFontSize, @weight: normal, @lineHeight: @baseLineHeight)  //设置排版字体.
	
###gradient

	基础空间函数包括：
	.horizontal(@startColor: #555, @endColor: #333)  //水平渐变.
	.vertical(@startColor: #555, @endColor: #333)  //垂直渐变.
	.directional(@startColor: #555, @endColor: #333, @deg: 45deg) //对角.
	.vertical-three-colors(@startColor: #00b3ee, @midColor: #7a43b6, @colorStop: 50%, @endColor: #c3325f) //垂直三色.
	.radial(@innerColor: #555, @outerColor: #333) //径向渐变.
	.striped(@color: #555, @angle: 45deg)  //条纹.

