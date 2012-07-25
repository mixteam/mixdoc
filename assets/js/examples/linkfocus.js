seajs.config({
	alias: {
		//libs
		'zepto': 'http://a.tbcdn.cn/mw/base/libs/zepto/1.0.0/zepto',
			
		//modules
		'linkfocus': 'http://a.tbcdn.cn/mw/base/modules/linkfocus/linkfocus'
	},
	debug: 1
});

define(function(require){
	var focus = require('linkfocus');
	focus('a');
});