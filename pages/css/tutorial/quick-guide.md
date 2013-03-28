#基础文档&开发规范 **基础文档**

by jiangC

##文件组织

less文件包含两部分：

+ 函数
+ class

以button.less 为例：


	//button的命名空间.
	#mc-btn{	

		//函数.
		.btn-base(
			@padding: 4px 10px,
			@border: 1px solid #bbb
		){
			display: inline-block;
			padding: @padding;
			font-size: @baseFontSize;
			line-height: @baseLineHeight;
			text-align: center;
			vertical-align: middle;
			border: @border;
			
			....
		}
	}
	
	//class
	.btn-base{

		#mc-btn > .btn-base();

		//属定制，抽出来作为函数.
		border-bottom-color: darken(@btnBorder, 10%);
		#mc-base > .border-radius(@baseBorderRadius);
		#mc-base > .box-shadow(~"inset 0 1px 0 rgba(255,255,255,.2), 0 1px 2px rgba(0,0,0,.05)");
		
		
		....
	}

函数分为：

+ 基本。基于组件，组件内部特有的函数。如button.less 文件下的.btn-base()
	
+ 通用。组件间提取出来，在组件之间可以使用。

如__func.less 下的

	//__func.less下的函数为通用func.
	#mc-base{
		//tab-focus
		.tab-focus() { // Default
			outline: thin dotted #333; // Webkit
			outline: 5px auto -webkit-focus-ring-color;
			outline-offset: -2px;
		}
	}

class分为：

+ 基本。这部分class提供最基本的组件样式完整展示。如button.less中的.btn-base,如果有其他版本要求会在基础库内扩展（？？？需不需要在基础库扩展的？？）

+ 扩展。这部分class属于定制，在业务中可能有许多定制的部分，如给Button加上箭头。突破基本样式的以扩展class形式展现。（待定）

##适合移动端的组件库
