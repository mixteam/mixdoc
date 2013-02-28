(function(win, undef){
	var CONSTANTS = {
			JS_VERSION : '0.3.0'
		},
		CONS_REG = {}
		;

	function parseConstants(text) {
		Object.each(CONSTANTS, function(value, key) {
			var reg = CONS_REG[key] || (CONS_REG[key] = new RegExp('{{' + key + '}}', 'g'))
				;

			text = text.replace(reg, value);
		});

		return text;
	}

	win['parseConstants'] = parseConstants;
})(window);