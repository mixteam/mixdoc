seajs.config({
	alias: {
		//libs
		'zepto': 'http://a.tbcdn.cn/mw/base/libs/zepto/1.0.0/zepto',
		'iscroll' : 'http://a.tbcdn.cn/mw/base/libs/iscroll/4.1.9/iscroll'
	},
	debug: 1
});

define(function(require){
	var $ = require('zepto'),
		iScroll = require('iscroll'),
		swipetop = require('http://a.tbcdn.cn/mw/base/modules/swipetop/swipetop'),
		swipetopTab = require('http://a.tbcdn.cn/mw/base/modules/swipetop/swipetopTab');
	
	var thatSwipetop = new swipetop({
		topEl : 'swipeTop',
		category : 'J_category',
		wrap : 'bodyCont',
		scrollArr : ['swipeCont-1','swipeCont-2'],
		toptabHeight : 50,
		headerHeight : 50,
		tabCont : 'swipeTopCont',
		cateSelCls : 'highlight',
		ease : 'ease',
		easetime : 300,
		opacity : 0.4
	},{
		swipeDown : function(){  //下拉后执行的事件，可在此请求数据
			var that = this,
			op = that.op;
			that.swipetoplisel = $(document.getElementById(op.tabCont)).find('li.'+op.cateSelCls);
		},
		tiggerFunc : function(){  //初始事件
			var that = this,
			op = that.op,
			cateSelCls = op.cateSelCls;
			$(document.getElementById(op.tabCont)).bind('click',function(e){  //单击分类列表
				var curEl = $(e.target),
				swipetoplisel = that.swipetoplisel;
				if(curEl[0].tagName.toLowerCase() != 'li'){
					if(curEl.parents('li').length == 0){
						return;
					}
					else{
						curEl = curEl.parents('li');
					}
				}
				if(!curEl.hasClass(cateSelCls)){
					curEl.addClass(cateSelCls);
					if(swipetoplisel && swipetoplisel[0]){swipetoplisel.removeClass(cateSelCls);}
					swipetoplisel = curEl;
				}
				that.hideTop('noAnimate','swipeBack');
			});
			
			// 顶部的分类和标签滑动，赋值在that上
			$(op.scrollArr).each(function(n,item){
				that['tab'+n] = new iScroll(item,{hideScrollbar : false,scrollbarClass : 'swipeScrollbar'});
				if(n == 0){$('#'+item).addClass('none');}
			});
			//顶部页签切换
			that['tabBody'] = new swipetopTab({touchEl:'.c-tab',cls:'cur',otherCallback : function(n){  //第一次执行，若需要再次触发，可通过清除页签的自定义属性ajax实现
				that['tab'+n].refresh();																					   
			},otherlinka : function(n){//不操作otherCallback时执行
				
			}
			});
		}
	});
	
	
	$('#J_category').click(function(){
		thatSwipetop.showTop();
	});
});
