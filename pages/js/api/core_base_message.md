# core.base.Message **api**

提供事件机制。

## 依赖

* [mix/core/{{JS_VERSION}}/base/reset](#js/api/core_base_reset)
* [mix/core/{{JS_VERSION}}/base/class](#js/api/core_base_class)

## 引用（获取）

`require('mix/core/{{JS_VERSION}}/base/message')`  


## at模式

at模式，是基于`@`书写的消息格式，例如`@content:load`，表示content的load消息。不管是添加消息、取消消息还是触发消息，都可以采用这样的格式来达到指定某个接受者的消息的目的。例如，还有一个`@page:load`的消息时，`@content:load`只会触发`content`的load消息。此外，如果需要触发所有的load消息，可以使用`@*:load`来达到目的。

## 实例化

### new Message([name[, id[, defaultContext]]])

* @param {string} [name]
* @param {string} [id]
* @param {object} [defaultContext]
* @return {Message} a Message object

实例化一个消息对象。id是唯一标识，默认为自增长的正数。


## 类属性/方法

### singleton

* @var {Message} a global Message object

一个全局的消息对象

### SPLITER_REG

* @var {RegExp}

多消息名称之间的分隔符正则

### AT_REG

* @var {RegExp}

at模式的正则

## 实例方法

### on(events, callback[, context])

* @param {string} events
* @param {function} callback
* @param {object} [context]
* @return {Message} current message object

添加消息句柄。可以给多个消息同时添加句柄，消息名称之间用空格分隔。

### off([events[, callback[, context]])

* @param {string} [events]
* @param {function} [callback]
* @param {object} [context]
* @return {Message} current message object

取消消息句柄。可以给多个消息同时取消句柄，消息名称之间用空格分隔。如果不提供任何参数，则会取消所有句柄。

### has([event[, callback[, context]])

* @param {string} event
* @param {function} [callback]
* @param {object} [context]
* @return {Message} current message object

判断消息句柄是否存在。

### once(events, callback[, context])

* @param {string} events
* @param {function} callback
* @param {object} [context]
* @return {Message} current message object

添加只执行一次的消息句柄。可以给多个消息同时添加一次性句柄，消息名称之间用空格分隔。

### trigger(events)

* @param {string} events
* @return {Message} current message object

触发消息。可以同时触发多个消息，消息名称之间用空格分隔。

### log(msg)

* @param {string} msg

在控制台输出带有标识的消息文本。

