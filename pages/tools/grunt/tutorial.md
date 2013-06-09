# 在项目中使用Grunt **tutorial**

## 准备工作

Grunt需要Node环境。如果本机尚没有Node，可以去[http://nodejs.org]()下载并安装。

## 安装grunt-cli

这个是Grunt的命令工具。

```shell
npm install grunt-cli -g
```

[为什么要用CLI？](http://gruntjs.com/getting-started#how-the-cli-works)

## 安装grunt-init

这个是初始化各种示例的工具，比如Gruntfile.js示例等。

```shell
npm install grunt-init -g
```

所有的示例模板，都会装在`~/.grunt-init/`下（windows下是`%USERPROFILE%\.grunt-init\`）

### 获取示例模板

```shell
git clone https://github.com/gruntjs/grunt-init-gruntfile.git ~/.grunt-init/gruntfile
```

[更多示例模板](http://gruntjs.com/project-scaffolding#installing-templates)

## 安装grunt

grunt都要求被装在项目的根目录下（和package.json同一目录）

```shell
npm install grunt --save-dev
```

### 安装文件依赖拼接的任务

**@渚薰** 开发的一个插件，git地址：[https://github.com/terrykingcha/grunt-depconcat]()

```shell
npm install grunt-depconcat --save-dev
```
### 安装js压缩的任务

基于uglify发布的一个官方插件，git地址：[https://github.com/gruntjs/grunt-contrib-uglify]()

```shell
npm install grunt-contrib-uglify --save-dev
```

### 安装css压缩的任务

一个官方插件，git地址：[https://github.com/gruntjs/grunt-contrib-cssmin]()

```shell
npm install grunt-contrib-cssmin --save-dev
```

### 监听文件改变的任务

当文件改变时，执行任务的一个官方插件，git地址：[https://github.com/gruntjs/grunt-contrib-watch]()

```shell
npm install grunt-contrib-watch --save-dev
```

## 配置Gruntfile

### 生成

首先使用grunt-init来初始化一个Gruntfile的示例：

```shell
grunt-init gruntfile
```

运行后，会要求回答以下问题：

- [?] Is the DOM involved in ANY way? (Y/n) 没明白什么意思，直接选n
- [?] Will files be concatenated or minified? (Y/n) 需要拼接或压缩，选Y
- [?] Will you have a package.json file? (Y/n) 是否有package.json，有的就选Y喽
- [?] Do you need to make any changes to the above before continuing? 问你是否要再修改。填错就时光机回去吧。

完成后，会生成一个`Gruntfile.js`。打开后，可以发现里面默认配置了五个任务，分别是`concat`,`uglify`,`qunit`,`jshint`,`watch`。这里不需要用到`concat`,`qunit`,`jshint`，可以将它们删掉。

### 任务1：拼接依赖文件

增加一段加载`depconcat`任务的语句：

```js
grunt.loadNpmTasks('grunt-depconcat');
```

然后在`initConfig`方法中配置`depconcat`任务，例如:

```js
depconcat: {
	js: {
		src: ['src/*.js'],
		dest: ['dist/all.js']
	},
    css: {
		src: ['assets/*.css'],
		dest: ['dist/all.css']
	}
}
```

更多depconcat的配置和用法，请参考[README](https://github.com/terrykingcha/grunt-depconcat/blob/master/README.md)

### 任务2：压缩js和css

压缩js用的是`uglify`，配置中已有示例，不再赘述。压缩css配置cssmin的任务。

同样增加一段加载`cssmin`任务的语句：

```js
grunt.loadNpmTasks('grunt-contrib-cssmin');
```

然后在`initConfig`方法中配置`cssmin`任务，例如:

```js
cssmin: {
	options: {
		report: 'min'
	},
	dist: {
		files: {
			'dist/all.min.css' : '<%= depconcat.css.dest %>'
		}
	}
}
```

更多uglify的配置和用法，请参考[README](https://github.com/gruntjs/grunt-contrib-uglify/blob/master/README.md)   
更多cssmin的配置和用法，请参考[README](https://github.com/gruntjs/grunt-contrib-cssmin/blob/master/README.md)

### 任务3：监控文件

`watch`这个任务可以在文件改变时，执行指定的任务，这个在开发时是非常有用的。



同样增加一段加载`watch`任务的语句：

```js
grunt.loadNpmTasks('grunt-contrib-watch');
```


然后在`initConfig`方法中配置`watch`任务，例如:

```js
watch: {
	js: {
		files: ['<%= depconcat.js.src %>],
		tasks: ['depconcat:js']
	},
    css: {
		files: ['<%= depconcat.css.src %>],
		tasks: ['depconcat:css']
	}
}
```

更多watch的配置和用法，请参考[README](https://github.com/gruntjs/grunt-contrib-watch/blob/master/README.md)

### 注册自定义任务

注册一些自定义任务，可以方便的调用不同的任务组合：

比如`default`任务：

```js
grunt.registerTask('default', ['depconcat', 'uglify', 'cssmin']);
```

又比如`dev`任务：

```js
grunt.registerTask('dev', ['depconcat', 'watch']);
```


## 运行grunt

配置完成后，可以运行grunt命令来执行这些任务。


执行默认任务：

```shell
grunt
```

执行`dev`任务：

```shell
grunt dev
```

执行watch的js子任务：

```shell
grunt watch:js
```

## 项目示例下载

[zip包](pages/tools/assets/grunttest.zip)







