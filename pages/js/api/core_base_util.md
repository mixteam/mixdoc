# core.base.Util **api**

提供基础工具函数。

## 依赖

* [mix/core/{{JS_VERSION}}/base/reset](#js/api/core_base_reset)
* [mix/core/{{JS_VERSION}}/base/class](#js/api/core_base_class)

## 引用（获取）

`require('mix/core/{{JS_VERSION}}/base/util')`

## 类属性/方法

### singleton

* @var {Util} a global Util object

一个全局的Util对象

## 实例方法

### escape(str)

* @param {string} str
* @return {string} a escaped string

转义`&`,`<`,`>`,`"`,`'`,`/`为HTML实体符号。

### bind(func, context)

* @param {function} func
* @param {object} context
* @return {function} a bound function

给函数绑定一个上下文