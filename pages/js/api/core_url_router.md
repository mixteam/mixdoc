# core.url.Router **api**

路由选择。

## 依赖

* [mix/core/{{JS_VERSION}}/base/reset](#js/api/core_base_reset)
* [mix/core/{{JS_VERSION}}/base/class](#js/api/core_base_class)
* [mix/core/{{JS_VERSION}}/base/message](#js/api/core_base_message)

## 引用（获取）

`require('mix/core/{{JS_VERSION}}/url/router')`  

## 实例化

### new Router()

* @return {Router} a router object

实例化一个路由对象。

## 类属性/方法

### singleton

* @var {Router} a global Router object

一个全局的路由对象

## 实例方法

### start([options])

* @param {object} options
	* @key {boolean} firstMatch
	* @key {function} unMatched
* @return {boolean} 

启动路由，默认会立即匹配当前路径。

### stop() 

* @return {boolean}

停止路由。

### match()

* @return {boolean} return if matched

匹配当前路径。

### add(route, callback[, last])

* @param {regexp} route
* @param {function} callback
* @param {boolean} [last=false]

添加一个路由规则。如果设置`last`参数为`true`，则在匹配到改规则后，将不再继续匹配。

### remove(route[, callback])

* @param {regexp} route
* @param {function} [callback]

移除一个路由规则。

### navigate(fragment)

* @param {string} fragment

改变当前的路径。

## 事件

### unmatched(fragment)

* @param {string} fragment, the current hash fragment

当未匹配到路由规则时，触发。
