#!/usr/bin/env node
var hogan = require('hogan.js')
  , fs    = require('fs')
  , prod  = process.argv[2] == 'production'
  , title = 'Taobao H5'
  , templatePath = '/../templates'
  , pagesPath = templatePath + '/pages'

var layout, pages

// compile layout template
layout = fs.readFileSync(__dirname + templatePath + '/layout.mustache', 'utf-8')
layout = hogan.compile(layout, { sectionTags: [{o:'_i', c:'i'}] })

// retrieve pages
pages = fs.readdirSync(__dirname + pagesPath)

// iterate over pages
pages.forEach(function (name) {

  if (!name.match(/([^.]+)\.mustache$/)) return

  var page = fs.readFileSync(__dirname  + '/../templates/pages/' + name, 'utf-8')
    , context = {}
  
    , includes = page.match(/\{\{\>[^>{}]+\}\}/ig)
  
  // include sub pages
  includes && 
  includes.length &&
	  includes.forEach(function(name) {
		  	name = name.replace(/\{\{\>([^>{}]+)\}\}/ig,  '$1')
		  	try {
		  		var ipage = fs.readFileSync(__dirname + pagesPath + '/' + name + '.mustache', 'utf-8')
		  	} catch(e) {
		  		//console.log('[warn] no file for "' + name + '"')
		  		console.log(e.message)
		  	}
			page = page.replace('{{>' + name + '}}', ipage || '')
	  })


  context[name.replace(/\.mustache$/, '')] = 'active'
  context._i = true
  context.production = prod
  context.title = name
    .replace(/\.mustache/, '')
    .replace(/\-.*/, '')
    .replace(/(.)/, function ($1) { return $1.toUpperCase() })

  if (context.title == 'Index') {
    context.title = title
  } else {
    context.title += ' · ' + title
  }

  page = hogan.compile(page, { sectionTags: [{o:'_i', c:'i'}] })
  page = layout.render(context, {
    body: page
  })

  fs.writeFileSync(__dirname + '/../' + name.replace(/mustache$/, 'html'), page, 'utf-8')
})