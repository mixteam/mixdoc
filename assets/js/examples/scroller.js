seajs.config({
	alias: {
		//libs
		'zepto': 'http://a.tbcdn.cn/mw/base/libs/zepto/1.0.0/zepto',
			
		//modules
		'swipe': 'http://a.tbcdn.cn/mw/base/modules/swipe/swipe'
	},
	debug: 1
});

define(function(require) {
	var $ = require('zepto'),
		scroller = require('http://a.tbcdn.cn/mw/base/modules/scroller/scroller')
		;

	var s = scroller('#wrapper', {
		direction : 'V',
		isBar : true
	});
});