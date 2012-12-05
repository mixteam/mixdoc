(function (win, $, undef){

	var PATH_SEP = '/',
		PATH_REGEX = /[\/\\]+/g
		;

	$.joinPath = function() {
		var args = Array.make(arguments)
			;
		return args.join(PATH_SEP).replace(PATH_REGEX, PATH_SEP);
	}

	$.splitPath = function(s) {
		return s.split(PATH_REGEX);
	}

	var name, page, anchor, basePath,

		categoryUrl, pageUrl,
		navUl, logoUl, cateUl, articleEl, dropdownUl
		;

	function parseHash() {
		var hash = location.hash.replace('#', ''),
			params = $.splitPath(hash);

		name = params[0];
		page = $.joinPath(params[1], params[2]);
		anchor = params[3] || '';
		basePath = $.joinPath('pages', name);
	}

	function loadCategory(callback) {
		var url = $.joinPath(basePath, 'category.html');

		$.get(url, function(html) {
			var dom = $(html),
				topLis = dom.children('li')
				;

			Object.each(topLis, function(el) {
				var topLi = $(el),
					link = topLi.children('a'),
					linkHref = link.attr('href').replace('.html', ''),
					subUl = topLi.children('ul'),
					subLis = subUl.children('li')
					;

				if ((!linkHref || linkHref === '#') && subUl.length) {
					link.attr('href', 'javascript:void(0)')
						.addClass('toggle')
						.append('<b class="caret"></b>');

					subUl.attr('class', 'nav nav-pills nav-stacked catelist');

					Object.each(subLis, function(el) {
						var subLi = $(el),
							subLink = subLi.children('a'),
							subLinkHref = subLink.attr('href').replace('.html', '')
							;

						subLink.attr('href', '#' + name + '/' + subLinkHref)
							.addClass('link');

						if (!page || page === '/' || subLinkHref === page) {
							page = subLinkHref;
							subLi.addClass('active');
							topLi.addClass('active');
						}
					});
				} else {
					link.attr('href', '#' + name + '/' + linkHref)
						.addClass('link');
					
					if (!page || page === '/' || linkHref === page) {
						page = linkHref;
						topLi.addClass('active');
					}
				}
			});

			cateUl.html(dom[0].innerHTML);
			dom = null;

			callback && callback();
		});
	}

	function loadContent(callback) {
		var url = $.joinPath(basePath, page + '.html');

		$.get(url, function(html) {
			var dom = $('<div>' + html + '</div>'),
				hEls = dom.find('h2, h3'),
				menu = $('<ul></ul>')
				;

			// fix href = "#"
			dom.find('a[href="#"]').each(function() {
				$(this).attr('href', 'javascript:void(0)');
			});

			// fix href= "http://xxxx"
			dom.find('a[href^="http"]').each(function() {
				$(this).attr('target', '_blank');
			});

			Object.each(hEls, function(el, idx) {
				var header = $(el),
					title = header.text(),
					menuLi = $('<li><a href="#"></a></li>'),
					id = name + '/' + page + '/' + idx 
					;

				header.append('<span><a class="top" id="' + id + '" name="' + id + '">#</a></span>')

				menuLi.find('a').text(title)
					.attr('href', '#' + id);

				if (el.tagName.toLowerCase() === 'h2') {
					menuLi.addClass('level0');
				} else {
					menuLi.addClass('level1');
				}

				menu.append(menuLi);
			});

			articleEl.html(dom[0].innerHTML);
			dom = null;

			dropdownUl.html(menu[0].innerHTML);
			menu = null;

			callback && callback();
		});
	}

	function bindEvents() {
		navUl.on('click', 'li a', function(e) {
			var el = this
				anchor = $(el)
				;

			navUl.find('.active').removeClass('active');
			anchor.parent().addClass('active');

			setTimeout(init, 100);
		});

		cateUl.on('click', 'a.toggle', function(e) {
			var el = this,
				anchor = $(el)
				;

			anchor.parent().toggleClass('active');
			e.preventDefault();
			return false;
		});

		cateUl.on('click', 'a.link', function(e) {
			var el = this,
				anchor = $(el)
				;

			cateUl.find('.active').removeClass('active');

			anchor.parents('li').each(function() {
				var el = this,
					li = $(this)
					;

				if (li.parent().hasClass('nav')) {
					li.addClass('active');
				}
			});

			page = anchor.attr('href').replace('#' + name + '/', '');
			loadContent();
		});

		articleEl.on('click', 'a.top', function(e) {
			win.scrollTo(0, 0);
		});

		var indropmenu = false;
		dropdownUl.on('mousemove', function(e) {
			indropmenu = true;
		}).on('mouseout', function(e) {
			indropmenu = false;

			$(win).one('scroll', function() {
				console.log(indropmenu);
				!indropmenu && dropdownUl.parent().removeClass('open');
			});
		}).prev('a').on('click', function(e) {
			var el = this,
				anchor = $(el)
				;

			anchor.parent().toggleClass('open');
		});

	}

	function init() {
		parseHash();
		logoUl.addClass(name);
		loadCategory(function() {
			loadContent(function() {
				bindEvents();
			});
		});
	}

	$(function() {
		navUl = $('header ul');
		logoUl = $('section.category .logo');
		cateUl = $('section.category ul.categroup');
		articleEl = $('section.content article');
		dropdownUl =  $('section.dropdown ul.dropdown-menu');

		init();
	});

})(window, Zepto)