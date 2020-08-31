## 什么是闭包

一个可以操作外部其他函数定义的局部变量的函数，相当于一个变量作用域，作用域可以向外操作，但不可向内操作。

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