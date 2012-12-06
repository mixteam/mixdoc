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

	$.getHtml = function(url, success) {
		$.ajax({
			url : url,
			type : 'GET',
			success : success,
			error : function() {
				alert('加载失败');
			}
		});
	}

	var hashParam, 
		basePath,
		winEl = $(win),
		navUl, 
		logoUl, 
		cateUl, 
		articleEl, 
		dropdownUl
		;

	function parseHash() {
		var hash = location.hash.replace('#', ''),
			params = $.splitPath(hash);

		return {
			name : params[0],
			page : $.joinPath(params[1], params[2]),
			section : params[3] || ''
		}
	}

	function loadCategory(callback) {
		var name = hashParam.name,
			page = hashParam.page,
			section = hashParam.section,
			url = $.joinPath(basePath, 'category.html')
			;

		$.getHtml(url, function(html) {
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
							page = hashParam.page = subLinkHref;
							subLi.addClass('active');
							topLi.addClass('active');
						}
					});
				} else {
					link.attr('href', '#' + name + '/' + linkHref)
						.addClass('link');
					
					if (!page || page === '/' || linkHref === page) {
						page = hashParam.page = linkHref;
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
		var name = hashParam.name,
			page = hashParam.page,
			section = hashParam.section,
			url = $.joinPath(basePath, page + '.html')
			;

		$.getHtml(url, function(html) {
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

			// fix img
			dom.find('img').each(function() {
				var el = this,
					img = $(el),
					figure = $('<figure><img></img><figcaption></figcaption></figure>')
					;

				figure.find('img')
					.attr({
						src : $.joinPath(basePath, page, '..', img.attr('src')),
						alt : img.attr('alt')
					});

				figure.find('figcaption')
					.text(img.attr('alt'));

				img.replaceWith(figure);
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
		winEl.on('hashchange', function(e) {
			var hash = parseHash()
				;

			if (hash.name !== hashParam.name) {
				init();
			} else if (hash.page !== hashParam.page) {
				hashParam.page = hash.page;
				loadContent();
			}
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
		});

		articleEl.on('click', 'a.top', function(e) {
			win.scrollTo(0, 0);
		});

		dropdownUl.on('mousemove', function(e) {
			dropdownUl.attr('open', 'true');
		}).on('mouseout', function(e) {
			dropdownUl.attr('open', 'false');

			winEl.one('scroll', function() {
				if (dropdownUl.attr('open') !== 'true')  {
					dropdownUl.parent().removeClass('open');
				}
			});
		}).prev('a').on('click', function(e) {
			var el = this,
				anchor = $(el)
				;
			anchor.parent().toggleClass('open');
		});

	}

	function init() {
		var hash = parseHash(),
			name = hash.name,
			page = hash.page,
			section = hash.section
			;

		hashParam = hash;
		basePath = $.joinPath('pages', name);

		logoUl.addClass(name);

		navUl.find('a').each(function() {
			var el = this,
				anchor = $(el),
				href = anchor.attr('href')
				;

			if (href.indexOf('#' + name) > 0) {
				anchor.parent().addClass('active')
					.siblings('.active').removeClass('active');
			}
		});

		loadCategory(function() {
			loadContent(function() {
				articleEl.find('a.top').each(function() {
					var el = this,
						anchor = $(el),
						id = anchor.attr('id')
						;

					if (id === $.joinPath(name, page, section)) {
						win.scrollTo(0, anchor.offset().top);
					}
				});
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
		bindEvents();
	});

})(window, Zepto)