seajs.config({
	alias: {
		//libs
		'zepto': 'http://a.tbcdn.cn/mw/base/libs/zepto/1.0.0/zepto'
	},
	debug: 1
});

define(function(require){
	var $ = require('zepto'),
		PageNav = require('http://a.tbcdn.cn/mw/base/styles/component/pagenav/js/pagenav.js')
		;
	
	var demo = new PageNav({
		'id':'#pNavDemo',
		'pageCount':30, 
		'objId':'A',
		'preFix' : 'myPrefix',
		//'disableHash' : true
	});
	
	/*
	demo.pContainer().on('P:switchPage', function(e, page){
        alert(page.index);
    });
    */
});
