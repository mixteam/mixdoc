seajs.config({
	alias: {
		//libs
		'zepto': 'http://a.tbcdn.cn/mw/base/libs/zepto/1.0.0/zepto'
	},
	debug: 1
});


define(function(require) {
	var $ = require('zepto'),
		swipe = require('../../../../../modules/swipe/swipe')
		;

	function debug(status) {
		var s = status.direction + '(' + [status.x1, status.x2, status.y1, status.y2].join(',') + ')';
		console.log(s);
		$('#footer').html(s);
	}

	function getEvent(e) {
		return e.touches ? e.touches[0] : e;
	}
	
	function debugE(e) {
		e = getEvent(e);
		var s = e.pageX + '|' + e.pageY;
		console.log(s);
		$('#footer').html(s);
	}

	swipe('#wrapper', {
		onStart : function(e, touch) {
			console.log('swipe:start');
			debug(touch);
		},
		
		onUp : function(e, touch) {
			// 只在改变方向时触发
			console.log('change:up');

		},
		
		onLeft : function(e, touch) {
			// 只在改变方向时触发
			console.log('change:left');
		},
		
		onRight : function(e, touch) {
			// 只在改变方向时触发
			console.log('change:right');
		},
		
		onDown : function(e, touch) {
			// 只在改变方向时触发
			console.log('change:down');
		},
		
		onMove : function(e, touch) {
			debug(touch);
			e.preventDefault();
		},
		
		
		onEnd : function(e, touch) {
			console.log('swipe:end');
			debug(touch);
		}
	});
});