# core.base.Class **api**

提供简洁高效的 OO 实现。

## 依赖

* [mix/core/{{JS_VERSION}}/base/reset](#js/api/core_base_reset)

## 引用（获取）

`require('mix/core/{{JS_VERSION}}/base/class')`

## 类方法

### create(parent, properties)

* @param {Klass} parent
* @param {object} properties
* @return {Klass} the class object

### create(properties)

* @param {object} properties
* @return {Klass} the class object

创建类。

举例：

    var Pig = Class.create({
        initialize: function(name) {
            this.name = name;
        },

        talk: function() {
            console.log('I\'m'  + this.name + '.');
        }
    });

## 实例方法

### extend(properties)

* @param {object} properties
* @return {Klass} the class object

继承类。

举例：

    var RedPig = Pig.extend({
        initialize: function(name) {
            RedPig.superclass.initialize.call(this, name);
        },

        color: 'red'
    });

### implement(properties)

* @param {object} properties

混合方法。

举例：

    RedPig.implement({
       swim: function() {
           console.log('I can swim!');
       }
    });



## properties中的几个关键key

### initialize

构造方法。

访问父类的构造方法，可以通过：


	someClass.supperclass.initialize.call(this, params*);


### Extends

从某个类继承。

举例：

    var RedPig = Class.create({
    	Extends : Pig,

        initialize: function(name) {
            RedPig.superclass.initialize.call(this, name);
        },

        color: 'red'
    });

### Implements

混合方法。

举例：

    var FlyableRedPig = RedPig.extend({
        Implements: {
			fly : function() {
				console.log('I can fly!');
			}
        },

        initialize: function(name) {
            FlyableRedPig.superclass.initialize.call(this, name);
        }
    });

### Statics

设置类静态方法。

举例：

    var Pig = Class.create({
    	Statics : {
    		pigs : [],

    		add : function(name) {
    			var pig = new Pig(name);
    			this.pigs.push(pig);

    			return pig;
    		}
    	}
       	
        initialize: function(name) {
            this.name = name;
        },

        talk: function() {
            console.log('I\'m'  + this.name + '.');
        }
    });

## 调用父类中的方法

### someClass.superclass.initialize
### someClass.superclass.methodName

举例：

var MyPig = Pig.extend({
    initialize: function(name) {
        MyPig.superclass.initialize.call(this, name);
    }

	talk : function() {
		MyPig.superclass.talk.call(this) + ' who are you?';
	}
})