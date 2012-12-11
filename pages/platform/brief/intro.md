# 简介 **intro**

MIX，Mobile In X的缩写。意为，在无线终端领域的各种解决方案。包括但不限于JS Framework、CSS Framework、UnitTest、Code Repository、Compnent Repository、Develop Tools。同时，mix也有混合之意。表示这些解决方案，是集合了业界的最佳实践，并取其精华，去取糟粕。

## 线上地址

### gitpower(内网)

[HOME](http://mixteam.git.assets.m.etao.net/mixjs_docs/index.html)

### github(外网)

[HOME](http://mixteam.github.com/mixjs_docs/)

## 文档规范

* 在pages下，选择文档内容对应的项目子目录，目前分别有platform，js，css，tools，test，repo，git。
* 每个子目录下，有一个category.md，用于展示右侧的文档条目，采用列表的语法书写。最多缩进一级。


**例如**

	* [简介](brief/summary.md)
	* [阶段小结](#)
		* [2012.12.10](brief/2012_12_10.md)
		* [2012.11.22](brief/2012_11_22.md)
	* [版本计划](#)
		* [v0.2](version/v0_2.md)

* 在子目录下建立对应的目录和文件，例如：`brief/summary.md`。
* 普通文档只有一个一级标题，用一个`#`标注。可以有多个二级和三级标题。二级和三级标题会被自动认为是本文档的目录索引。如果需要四级标题，请使用`**四级标题**`着重语法来表示。
* API文档只有一个一级标题，用一个`#`标注。二级标题为API的种类，比如JS中为`方法`、`事件`、`属性`，CSS中为`变量`、`函数`、`类名`。三级标题为具体的方法名或属性名等等。对于JS的方法名，必须用列表语法来书写符合[JSDoc](https://code.google.com/p/jsdoc-toolkit/w/list)的文档注释。

**JS 举例**

	## 实例方法
		### setCompData(path, value[, slient])

		* @param {string} path
		* @param {*} value
		* @param {boolean=fase} slient

		更改给定路径的模板数据值。path可以是用点分隔的字符串，也可以是字符数组。

**CSS 举例**

	## 类名
		### .btn

		定义按钮的基础类。

		### .btn-big

		定义大型按钮的附加类。
