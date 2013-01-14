# core.base.reset **api**

提供常用函数以及ECMA5里面补充的内置对象方法（诸如forEach等）

## Object

### Object.keys(obj)

* @param {object} obj
* @return {string[]} key's list

获取对象的所有键

### Object.each(obj, callback[, context])

* @param {array|object} obj
* @param {function} callback
* @param {object} [context]

遍历一个数组或对象

### Object.clone(value[, deeply])

* @param {*} value
* @param {boolean} [deeply=false]
* @return {*} a cloned value

复制一个值，deeply为true是为深度复制

### Object.extend(src, target[, deeply])

* @param {object} src
* @param {object} target*
* @param {boolean} [deeply=false]
* @return {object} a extended object

扩展一个对象，deeply为true是为深度扩展

### Object.isTypeof(value[, istype])

* @param {*} value
* @param {string} [istype]
* @return {boolean|string} true/false or the type

判断或返回一个值的类型

## Array

### Array.make(obj)
### Array.from(obj)

* @param {object} obj
* @return {array} a new array object

把一个类数组对象转换成数组

### Array.equal(left, right)

* @param {array} left
* @param {array} right
* @return {boolean} true/false

比较两个数组是否相等

### arr.forEach(callback[, context])

* @param {function} callback
* @param {object} [context]

对数组进行遍历

### arr.map(callback[, context])

* @param {function} callback
* @param {object} [context]
* @return {array} a new array object

返回一个数组映射后的结果

### arr.filter(callback[, context])

* @param {function} callback
* @param {object} [context]
* @return {array} a new array object

返回一个数组过滤后的结果

### arr.indexOf(value[, from])

* @param {*} value
* @param {number} from
* @return {boolean} true/false

获得元素在数组中的位置

## String

### str.trim()

* @return {string} a new string

去除字符串所有空字符

## Function

### Function.binded(func, context)

* @param {function} func
* @param {object} context
* @return {function} a binded function

给函数绑定一个上下文