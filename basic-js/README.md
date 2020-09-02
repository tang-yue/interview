## symbol 属性

symbol 是一种基本数据类型，
symbol() 函数会返回symbol类型的值，该类型具有静态属性和静态方法。
每个从Symbol() 返回的symbol值都是唯一的。一个symbol值能作为对象属性的标识符；这是数据类型仅有的目的。

使用场景：

+ 作为对象属性名

## 说一下 原型链

var n = new Number() 创建一个Number

## 什么是闭包

一个可以操作外部其他函数定义的局部变量的函数，相当于一个变量作用域，作用域可以向外操作，但不可向内操作

## 箭头函数和普通函数的区别

1. 箭头函数是匿名函数，不能作为构造函数，不能使用 new
2. 箭头函数不能绑定arguments，取而代之用rest参数...解决
3. 箭头函数没有原型属性
4. 箭头函数的this永远指向其上下文的this，没有办法改变其指向
普通函数的this 指向调用它的对象

## for of 和 for in 的区别

for in 遍历对象 [[[[ 遍历字符串 key ===> 0 1 2 3 ]]]]

for of 数组， 类对象，遍历字符串

## javascript 继承方式

一、 类式继承

通过修改子类的原型为父类的实列来实现继承，缺点太多。

二、 构造函数式继承

[深入JavaScript继承原理](https://juejin.im/post/5a96d78ef265da4e9311b4d8)

三、组合式继承

四、原型继承

五、寄生式继承

六、寄生组合式继承

## 逃不过的继承方式

### 原型链继承

```js
// 示例一
function SuperType() {
    this.property = true
}

SuperType.prototype.getSuperValue = function () {
    return this.property;
}

function SubType() {
    this.subproperty = false
}

SubType.prototype = new SuperType()  // 将实例挂载上去

subType.prototype.getSubValue = function () {
    return this.subproperty
}

var instance = new SubType();

instance.getSuperValue   // true
```

```js
// 示例二

function SuperType () {
    this.colors = ['red', 'blue', 'green']
}

function SubType() {

}

SubType.prototype = new SuperType()

instance = new SubType()

instance1 = new SuperType()

instance.colors.push('yellow')

instance1.colors // ['red', 'blue', 'green', 'yellow'] 被改变了

```
问题：
1. 包含引用类型值的原型属性会被所有实例共享，这也是为什么要在构造函数中，而不是原型对象中定义属性的原因。
2. 没有办法在不影响所有对象实例的情况下，给超类型的构造函数传递参数

### 借用构造函数

思想：子类型构造函数的内部调用超类型构造函数。


```js

// 示例一  不会改变超函数实例里的属性
function SuperType() {
    this.colors = ['red', 'blue', 'green']
}

function SubType() {
    SuperType.call(this) // 执行了 SuperType() 函数中定义的所有对象初始化代码
}


var instance1 = new SubType()
instance1.colors.push('black');
instance1.colors // ['red', 'blue', 'green', 'black']

var instance2 = new SuperType()
instance2.colors // ['red', 'blue', 'green']
```

```js
// 可以传递参数
function SuperType(name) {
    this.name = name;
}

function SubType() {
    SuperType.call(this, 'jhon')
    this.age = 29
}

instance = new SubType() 

instance.name = 'jhon'
instance.age = 29
```

问题：

1. 方法都在函数中定义，导致函数无法复用。


### 组合继承

原型链和借用构造函数的技术组合到一起。

思路：使用原型链实现对原型属性和方法的复用，使用通过借用构造函数来实现对实例属性的继承。

```js
function SuperType(name) {
    this.name = name
    this.colors = ['red', 'blue']
}

SuperType.prototype.sayName = function() {
    console.log(this.name)
}

function SubType(name, age) {
    SuperType.call(this, name)
    this.age = age
}

SubType.prototype = new SuperType()

SubType.prototype.constructor = SubType // 这里需要注意下

SubType.prototype.sayAge = function () {
    console.log(this.age)
}

instance1 = new SubType('name1', 20)
instance1.colors.push('新增')
instance1.colors
instance1.name
instance1.age


instance2 = new SubType('name1', 20)
instance2.colors
instance2.name
instance2.age
```

### 原型式继承

主要是用 Object.create()

```js
var person = {
    name: 'Nicholas',
    friends: ['Shelby', 'Count', 'Van']
}

var anotherPerson = Object.create(person);
anotherPerson.name = 'Greg';
anotherPerson.friends.push('Rob');

var yetAnotherPerson = Object.create(person)
// ......
```

### 寄生式继承

寄生式继承是与原型式继承紧密相关的一种思路。

```js
function createAnother(original) {
    var clone = object(original);   // 这里不理解，通过调用函数创建一个新对象
    clone.sayHi = function() {      // 以某种方式来增强这个对象
        alert('hi')
    };
    return clone;
}
```

```js
var person = {
    name: 'Nicholas',
    friends: ['Shelby', 'Court', 'Van']
};

var anotherPerson = createAnother(person);

anotherPerson = sayHi();  // ‘hi’
```

### 寄生组合式继承

[参考 高级js程序设计书籍]

### Js 垃圾回收机制

一、Js 具有垃圾自动回收机制

原理：周期性执行，找出那些不再继续使用的变量，然后释放其内存。

二、最常见的垃圾回收方式 ---- 标记清除方式

原理： 当变量进入环境时，将这个变量标记为'进入环境'，当变量离开环境时，则将其标记为‘离开环境’，标记‘离开环境’的回收内存。

三、引用计数方式

原理：跟踪记录每个值被引用的次数，当垃圾回收器运行时，就会释放那些引用次数为0的值所占用的内存。

[参考资料](https://juejin.im/post/6844903920255369230)

### EventEmitter 简单实现

[参考文章](https://www.jianshu.com/p/45994e03ac33)



