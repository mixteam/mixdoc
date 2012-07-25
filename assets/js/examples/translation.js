seajs.config({
	alias: {
		//modules
		'translation': 'http://a.tbcdn.cn/mw/base/modules/translation/translation'
	},
	debug: 1
});



define(function(require){
	var translation = require('translation'),
		E_left = document.getElementById('left'),
		E_top = document.getElementById('top'),
		E_right = document.getElementById('right'),
		E_bottom = document.getElementById('bottom'),
		doc = document.documentElement,
		ch = parseInt(doc.clientHeight),
		cw = parseInt(doc.clientWidth),
		duration = cw / 1000 + 's',
		E_array = [{e:E_left}, {e:E_top}, {e:E_right}, {e:E_bottom}],
		E_action = [['x',cw-100], ['y',ch-100], ['x',-(cw-100)], ['y',-(ch-100)]]
		;
	
	var i = 0, j = 0;
	function trans(i, j, callback) {
		var arr = E_array[i],
			action = E_action[(i+j) % 4]
			;
		
		arr[action[0]] = (j < 2 ?  action[1] : 0);
		
		i++;
		j+= parseInt(i / 4);
		i %= 4;
		j %= 4; 
		
				
		translation(arr.e, {
			x : arr.x || 0,
			y : arr.y || 0,
			duration : duration
		}, function() {
			callback(i, j, trans);
		});
	}
	
	trans(i, j, trans);
});