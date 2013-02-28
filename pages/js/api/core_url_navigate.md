# core.url.Navigate **api**

导航控制。

## 依赖

* [mix/core/{{JS_VERSION}}/base/reset](#js/api/core_base_reset)
* [mix/core/{{JS_VERSION}}/base/class](#js/api/core_base_class)
* [mix/core/{{JS_VERSION}}/base/message](#js/api/core_base_message)
* [mix/core/{{JS_VERSION}}/url/router](#js/api/core_url_router)

## 引用（获取）

`require('mix/core/{{JS_VERSION}}/url/navigate')`  

## 实例化

### new Navigate([options)

* @param {object} options
	* @key {Router} useRouter
	* @key {number} [stateLimit=100]
	

实例化一个导航对象，并指定导航使用的路由器对象。

## 类属性/方法

### singleton

* @var {Navigate} a global Navigate object

一个全局的导航对象，使用的是全局的路由对象。

## 实例属性/方法

### router

* @var {Router} a Router object

获取当前导航对象使用的路由对象。

### getState()

* @return {object} a state object
	* @key {string} name, the route name
	* @key {string} move, the movement
	* @key {string} fragment, the hash fragment
	* @key {object} params, the route params
	* @key {object} args, the arguments
	* @key {object} datas, the datas

获得当前的[导航状态](#state)。

### getStateIndex()

* @return {number} the current index for states

获取当前[导航状告](#state)的索引

### addRoute([name, routeText,]options)

* @param {string} name
* @param {string} routeText
* @param {object} options
	* @key {function} callback
	* @key {boolean} [last=true]
	* @key {boolean} [default=false]

增加一个路由规则。`last`参数默认为`true`，表示匹配到改规则后，将不再继续匹配。`default`设置为`true`（无需提供`name`和`routerText`），会在路由匹配失败执行该`callback`。

### removeRoute(name)

* @param {string} name

移除一个路由规则。

### forward([fragment[, options]])

* @param {string} [fragment]
* @param {object} [options]
	* @key {object} args, the arguments
	* @key {object} datas, the datas
	* @key {string} [transition='forward'], the transition movement

导航到某路径（前进）。当所有参数为空时，为浏览器默认的前进操作。

### backward()

* @param {object} [options]
	* @key {string} [transition='backward'], the transition movement

浏览器默认的后退动作。

## 事件

### forward

* @param {object} state, the current state

导航到某路径（前进）时，触发。

### backward

* @param {object} state, the current state

后退时，触发。

## 路由规则和路由参数

路由规则的文本为正则表达式文本，并支持以下几种方式来获取路由参数：

1. `:name` - 析出两个`/`之间的文本。举例：`user/:name/:age` 会匹配 `user/zhuxun/18`。并使`name`为`zhuxun`，`age`为`18`。
2. `*name` - 析出当前位置开始之后的所有文本。举例： `user/*profile` 会匹配 `user/zhuxun/18`。并使`profile`为`zhuxun/18`。
3. `(P<name>exp)` - Perl风格的参数析出语法。举例：`user/(P<name>\w+)/(P<age>\d+)` 会匹配 `user/zhuxun/18`。并使`name`为`zhuxun`，`age`为`18`。

以上规则析出的路由参数，均可以通过当前的[导航状态](#state)的`params`字段来获取。

** 注意 ** 

在书写路由规则时，所有自定义的分组语法，必须使用非捕获分组，即`(?:regexp)`。

## 传递数据

当调用`forward`方法时，可以为下一个[导航状态](#state)传递参数。传递的方式有两种：

1. options.args - 以`!`开始，拼接上`key1=value1&key2=value2`格式的文本串。可以通过[导航状态](#state)的`args`字段来获取。
2. options.datas - 直接传递对象。可以通过[导航状态](#state)的`datas`字段来获取。

## [导航状态](#state)

每次导航后，会执行回调，并传递当前的导航状态`state`。同时，也可以借由`getState`方法来获取当前的导航状态。
