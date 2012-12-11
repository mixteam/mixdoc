# Mix JS入门手册 **quick guide**

MIX 是Mobile In X的缩写，它寓意着移动前端技术的一种集合。我们推出MIX框架（平台），是希望为移动前端提供便捷，同时不失为强大的开发框架（平台）。它有形形色色的最佳实践组成，包括从许多成熟的前端架构中汲取精华。

## 前奏

MIX需要依赖一些开发环境和工具，为了能顺利的使用MIX，请参照一下几点做好准备工作。

###编译环境

**NodeJS**

首先是大名鼎鼎的NodeJS，你需要下载并安装最新版本的[NodeJS](http://nodejs.org/download/)。并且配置好系统环境变量，以便能快捷访问Node命令。

	> node -v
	> v0.8.14

当在命令行输入node -v，并输出当前Node版本时，就代表已经安装成功。

###安装NPM模块

**spm**

MIX代码的编译和部署依赖于[SPM](https://github.com/seajs/spm)（@玉伯），它是类似于Node自带的NPM的模块管理工具。

首先需要通过NPM来安装SPM，进入NodeJS的安装目录，执行以下命令：

	$ npm install spm -g

安装成功后，会生成一个`.spm`目录（在当前登录系统的用户名目录下，比如`c:\user\zhuxun.jb`或`/Users/terry`）。其中sources目录用来存放通过spm build/install命令创建或安装的包。congfig.json文件用来配置spm的全局属性。

**spmbatch**

此模块支持在当前目录下深度遍历执行spm的命令，方便批量编译和上传。

	$ npm install spmbatch -g

**fmonitor**

此模块支持在文件修改的同时，运行给定的一些命令。

	$ npm install fmonitor -g

**projinit**

此模块用于生成一些默认的工程或应用。

	$ npm install projinit -g

###服务器

**Nginx/Apache/node-express**

为了本地调试，还需要能配置一个WEB容器。[Nginx](http://nginx.org/)、[Apache](http://www.apache.org/)以及Node的[express](http://expressjs.com/)都可以是你的首选，这里就不再详细展开，请童鞋们参照官方手册或民间攻略安装和配置。

*至此，需要依赖的开发环境已经安装妥当，接下去，让我们先Hello World吧！*

**配置SPM源**

创建一个SPM源服务器（请参见`SPM`的相关文档）。然后进入上述建立的`.spm`目录，打开config.json，设置里面的sources字段为搭建好的SPM源服务器。

## 开始十分钟之旅

**获取MIX框架并编译**

新建一个MIX框架的目录。

请用`git clone`以及`git submodule update --init` 命令来获取最新的框架源码（[GITHUB](https://github.com/mixteam/mix) ）。


在MIX源码的根目录下，执行如下命令

	$ spmbatch upload

完成后所有的MIX模块都已经编译并上传自SPM源服务器了。你可以通过类似`http://{path_to_spm_sources}/mix/core/base/class/1.0.0/class.js`这样的地址，来访问源服务器上的某个模块的js文件。

## 初始化Hello World项目

新建一个项目目录，名为`helloworld`，并在当前项目路径下执行如下命令：

	$ projinit -ex helloworld

系统会自动生成基础目录和文件，如下：

	- ./
		- src
			helloworld.js
		seajsConf.js
		README.md
		package.json
		index.html
		.monitor

接下去，需要简单操作，从而达到能运行的目的：

- 修改seajsConf.js和index.html中的名为`path_to_spm_source`的位置为SPM源服务器
- 运行`spm upload`
- 配置HTTP服务器，指向该项目目录

最后打开通过浏览器访问项目所在的URL（例如http://localhost/helloworld/），就可以展现华丽丽的Hello MIX World!了。

## 读懂Hello World项目

`index.html`为整个项目的入口。其中的三个script标签，分别引入了seajs，seajsConf，以及用seajs的use方法，获取了helloworld.js中exports的字符串文本，并把它显示出来。

就是这么简单！

至此，Hello MIX World！只是加载了一个模块，返回一串文字而已，并没有使用MIX的核心框架。接下来需要一步步的来建立真正的MIX World。

## 继续Hello World项目

MIX框架，是专门为OPOA设计的。它基于url的hashChange来进行路由选择，然后来管理和通知某个应用。MIX框架中，用于支持路由的模块为`router@0.2.0`，用于支持应用管理的模块为`navigator@0.1.0`。因此，我们要把这两个模块的依赖加入到package.json里去。如下：

    "dependencies" : {
        "router" : "mix/core/util/router/0.2.0/router",
        "navigator" : "mix/core/util/mvc/navigator/0.1.0/navigator"
    }

打开并编辑`./src/helloworld.js`文件，在此文件中来启动整个项目：

	define(function(require, exports, module) {
		var router = require('router').singleton,
			navigator = require('navigator').singleton
			;

		navigator.trigger('install');
		router.start();

		return 'router started';
	});

再次执行`spm upload`，输入地址`http://localhost/helloworld/#hellomix/`，看到页面上，显示router started。表示路由功能已经启动成功。但同时也会发现在console中会抛出一个错误，显示`http://localhost/mix/test/apps/hellomix/entry.js`无法找到。因为，我们访问了hellomix这个应用，而这个应用我们还未建立。接下去就来建立这个mix应用。

## 建立Hello MIX应用

应用存放的路径默认为项目下的apps目录，于是，我们就在`./apps`下新建一个`hellomix`文件夹（请注意大小写）。并执行如下命令：

	$ projinit -ex hellomix

生成的目录文件结构如下

	- ./apps/hellomix
		- assets
			view.less
			view.mu
		- src
			controller.js
			route.js
			view.js
		entry.js
		package.json

正如你看到的，每个应用它可以看作是一个独立的`spm模块`，需要单独执行`spm build`或`upload`命令。

**package.json**

用于描述该应用，先来为它设置几个主要参数

更多`package.json`的相关知识，请参阅[SPM官方文档](https://github.com/seajs/spm/wiki/Spm-%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E7%B1%BB%E5%9E%8B)。

**entry.js**

即为hellomix应用的入口文件。框架的应用管理器（即navigator）会自动加载这个文件。

**contorller.js，route.js，view.js**

分别为应用的控制器层，路由配置和视图层。控制器层和视图层之间，视图和视图之间通过消息来传递数据。

* 控制器用来加载指定的路由和视图。
* 路由配置，指定了路由选择的语法。
* 视图层的开发，可以有这些内容:
	* 匹配路由
	* 监听view之间的消息
	* 给模版绑定DOM事件
	* 为组件绑定初始化数据
	* 更新（局部）模版

**view.less, view.mu**

为视图的模版和样式。MIX框架采用[less语法](http://lesscss.org)的样式，和[mustache语法](http://handlebarsjs.com/)的模版来为视图进行渲染。

同样，执行`spm upload`，刷新浏览器，你会发现，这世界多么的美好！

## 进阶Hello MIX应用

其实，还没完呢。在上面的例子中，我们用到了router来进行路由选择，用到了navigator来管理和通知应用，用视图来渲染模版。但，MIX框架不仅仅只是这些。

### 如何从路由中获取参数

Helloworld是每个开发者的进阶之路，我们不能满足于显示`Hello MIX World!`也许我们希望根据不同的数据来显示不同的`Hello XXX World！`那好，我们假设通过这样的`#hellomix/M.J`的hash，最终能显示`Hello M.J World!`。

好的，那么准备工作是需要先为应用增加一条路由匹配，编辑应用下的`./src/route.js`：

	define({
		'' : 'hellomix',
		':what' : 'hellowhat'	/*增加的路由选择*/
	});

其中增加的':what'语法，表示选择如同`#hellomix/aaa`、`#hellomix/bbb`等这样的hash，并且把`aaa`或`bbb`的赋值给what参数。

然后，需要为该路由编写处理的方法，编辑`./src/view.js`：

	define(function(require, exports, module) {
		var View = require('view'),
			HelloView = {}
			;
	
		// 一些配置项，包括加载模版和样式的地址
		HelloView.CONFIGS = {
			name : 'helloview',
			viewport : '#screen-wrap',
			loadTmpl : 'apps/hellomix/assets/view.mu',
			loadStyle : 'apps/hellomix/assets/view.less'
		}
	
		// 消息
		HelloView.EVENTS = {
			'beforeRender' :  'setWhatData'  /*在视图渲染前执行setWhatData方法*/
		}
	
		// 设置匹配的某路由后，对应执行的方法
		HelloView.ROUTES = {
			'hellomix' : 'renderHelloMIX',
			'hellowhat' : 'renderHelloWhat'	/*名为hellowhat的路由会调用renderHelloWhat方法*/
		}
	
		// 模版的数据
		HelloView.DATA = {
			what : 'MIX'
		}
	
	
		Object.extend(HelloView, {
			setWhatData : function() {
				var that = this,
					contro = that.getController(),
					what = contro.getParameter('what')
					;
	
				// 从hash的参数获得值中，并设置模版数据
				that.setData('what', what);
			},
	
			renderHelloMIX : function() {
				// 追加一个awesome文本
				var text = document.createTextNode('--awesome!');
				document.body.appendChild(text);
			},
	
			renderHelloWhat : function(what) {
				// 追加一个That's it!文本
				var text = document.createTextNode('--That\'s it!');
				document.body.appendChild(text);
			}
		});
	
		// 导出View的一个子类
		module.exports = View.extend(HelloView);
	});

其中，我们增加几个关键选项

**beforeRender消息**

这里指定了，当收到beforeRender消息时，应该执行的方法

**名为hellowhat的路由**

这里指定了，匹配hellowhat路由时，应该执行的方法

**DATA数据**

同时，我们为模版提供了一个名为what的数据项，默认为"MIX"。

**setWhatData方法**

在此方法中，我们在渲染模版前，修改了what的数据值为hash中的第一个参数。

最后，我们略微修改下模版，使模版支持数据填充：

	<strong>Hello <span>{{{what}}}</span> World!</strong>

大功告成，同样`spm upload`后，访问`http://localhost/mix/demos/helloworld/#hellomix/M.J`地址，并刷新。你会看到如同M.J那样的神奇一幕！

**如果你对上面的一切觉得繁琐，那么你可以偷懒下，直接浏览MIX框架下`demos/helloworld`即可**