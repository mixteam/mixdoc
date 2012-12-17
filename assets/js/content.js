(function (win, $, undef){

	var PATH_SEP = '/',
		PATH_REGEX = /[\/\\]+/g,
		hasMarked = !!win['marked']
		;

	$.joinPath = function() {
		var args = Array.make(arguments)
			;
		return args.join(PATH_SEP).replace(PATH_REGEX, PATH_SEP);
	}

	$.splitPath = function(s) {
		return s.split(PATH_REGEX);
	}

	$.getHtml = function(url, callback, parseHandler, successHandler) {

		url = url + (hasMarked ? '.md' : '.html');

		if (arguments.length === 3){
			successHandler = arguments[2];
			parseHandler = null;
		}

		$.ajax({
			url : url,
			type : 'GET',
			success : function(text) {
				if (hasMarked){
					var lexer, parsed;

					if (parseHandler) {
						lexer = marked.lexer(text);
						parsed = marked.parser(parseHandler(lexer));
					} else {
						parsed = marked(text);
					}

					successHandler(parsed);
				} else {
					successHandler(text);
				}

				callback && callback();
			},
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
		var url = $.joinPath(basePath, 'category')
			;

		$.getHtml(url, callback, loadedCategory);
	}

	function loadedCategory(html) {
		var name = hashParam.name,
			page = hashParam.page,
			dom = $(html),
			topLis = dom.children('li')
			;

		Object.each(topLis, function(el) {
			var topLi = $(el),
				link = topLi.children('a'),
				linkHref = link.attr('href').replace(/\.\w+$/, ''),
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
						subLinkHref = subLink.attr('href').replace(/\.\w+$/, '')
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
	}

	function loadContent(callback) {
		var page = hashParam.page,
			url = $.joinPath(basePath, page)
			;

		if (page === '#') return;

		$.getHtml(url, callback, parseContent, loadedContent);
	}

	function parseContent(lexer) {
		var name = hashParam.name,
			page = hashParam.page,
			baseId = name + '/' + page + '/',
			imgReg = /^\!\[(.*?)\]\((.*?)\)/,
			linkReg = /\[(.*?)\]\((.*?)\)/g,
			headerMenu = []
			;

		Object.each(lexer, function(tok) {
			var type = tok.type,
				depth = tok.depth,
				text = tok.text
				;

			linkReg.lastIndex = 0;

			switch (type) {
				case 'heading':
					var matches,
						title, id
						;

					if (depth === 2 || depth === 3) {
						if (!(matches = linkReg.exec(text))) {
							title = text;
							id = baseId + headerMenu.length;
							text = '[' + text + '](' + headerMenu.length + ')';
						} else {
							title = matches[1];
							id = matches[2].replace('#', baseId);
						}

						text = title + '<a class="top" id="' + id + '" name="' + id + '">TOP</a>';

						headerMenu.push('<li class="level' + (depth - 2) + '"><a href="#' + id + '">' + title + '</a></li>');
					}

					break;
				case 'paragraph':
					var matches,
						imgAlt, imgSrc,
						link, linkTitle, linkHref
						;

					// fix img
					if ((matches = text.match(imgReg))) {
						imgAlt = matches[1];
						imgSrc = $.joinPath(basePath, page, '..', matches[2]);

						type = 'html';
						text = [
							'<figure>',
								'<img alt="' + imgAlt + '" src="' + imgSrc + '" />',
								'<figcaption>' + imgAlt + '</figcaption>',
							'</figure>'
						].join('');
					}

					// fix link
					while ((matches = linkReg.exec(text))) {
						link = matches[0];
						linkTitle = matches[1];
						linkHref = matches[2];

						if (linkHref.indexOf('http') === 0) {
							text = text.replace(link, '<a href="' + linkHref + '" target="_blank">' + linkTitle + '</a>');
						} else {
							if (linkHref === '#') {
								linkHref = 'javascript:void(0)';
							} else if (linkHref.indexOf('#') === 0) {
								linkHref = linkHref.replace('#', '#' + baseId);
							}
							text = text.replace(link, '[' + linkTitle + '](' + linkHref + ')');
						}
					}

					break;
			}


			tok.type = type;
			tok.text = text;

		});

		lexer.splice(1, 0, {
			type : 'html',
			text : [
				'<section class="dropdown">',
					'<a href="javascript:void(0)">目录<b class="caret"></b></a>',
					'<ul class="dropdown-menu pull-right">',
					headerMenu.join(''),
					'</ul>',
				'</section>'
			].join('')
		});

		return lexer;
	}

	function loadedContent(html) {
		var name = hashParam.name,
			page = hashParam.page,
			baseId = name + '/' + page + '/',
			dom = $('<div>' + html + '</div>')
			;

		// // use new window to open
		// dom.find('a[href^="http"]').each(function() {
		// 	$(this).attr('target', '_blank');
		// });

		articleEl.html(html);
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
	}

	function init() {
		var hash = parseHash(),
			name = hash.name,
			page = hash.page,
			section = hash.section
			;

		hashParam = hash;
		basePath = $.joinPath('pages', name);

		logoUl.attr('class', 'logo ' + name);

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
				var path = $.joinPath(name, page, section)
					;

				articleEl.find('a.top').each(function() {
					var el = this,
						anchor = $(el),
						id = anchor.attr('id')
						;

					if (id === path) {
						win.scrollTo(0, anchor.offset().top);
					}
				});

				dropdownUl =  $('section.dropdown ul.dropdown-menu');

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
			});
		});
	}

	$(function() {
		navUl = $('header ul');
		logoUl = $('section.category .logo');
		cateUl = $('section.category ul.categroup');
		articleEl = $('section.content article');

		init();
		bindEvents();
	});

})(window, Zepto)