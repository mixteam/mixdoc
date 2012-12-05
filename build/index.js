#!/usr/bin/env node

var marked = require('marked'),
	fs = require('fs'),
	path = require('path'),

	pagePath = path.join(__dirname, '..', 'pages')
	;

function listDir(dir) {
	fs.readdir(dir, function(err, files) {
		files.forEach(function(file) {
			if (file in ['.', '..']) return;

			var pathname = path.join(dir, file),
				stat = fs.statSync(pathname)
				;

			if (stat.isFile() && path.extname(pathname) === '.md') {
				buildMarked(pathname);
			} else if (stat.isDirectory()) {
				listDir(pathname);
			}
		});
	});
}

function buildMarked(file) {
	fs.readFile(file, 'utf8', function(err, data) {
		var lexed = marked.lexer(data),
			html = marked.parser(lexed)
			;

		fs.writeFile(file.replace('.md', '.html'), html, 'utf8', function(err) {
			console.log('"' + file.replace(pagePath, '') + '" builded');
		});
	});
}

if (require.main === module) {
	console.log(pagePath);
	listDir(pagePath);
} else {
	module.exports = listDir;
}



