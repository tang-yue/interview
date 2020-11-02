## es6 的新特性

1. let 和const 命令的出现
2. 解构赋值
```js
let [a, b, c] = [1, 2, 3];
// 相当于 a 为1，b 为2，c 为3
let { foo, bar } = { foo: 'aaa', bar: 'bbb' }
```
3. 字符串，数组，对象的扩展
4. 箭头函数，promise
5. 导入模块

[参考文章](https://juejin.im/post/6844903831977852936)

## let, const, var 的区别

1. let和const声明的时候，必须赋值。而 var 不用。var 可以重复声明，let 和const 不可以。

2. let，const 不存在变量提升。

3. 作用域，var是函数作用域，let，const 是块级作用域

4. const 常量不可以修改，但是const 是一个对象，就可以被修改。

[参考文章](https://es6.ruanyifeng.com/#docs/let)

## Set 和 Map 的一些区别

### Set

Set 对象允许你存储**任何类型的唯一值**，无论是原始值或者是对象引用。

Set 对象是值的集合，你可以按照插入的顺序迭代它的元素。Set 中的元素只会出现一次，即Set 中的元素是唯一的。

属性：
+ size
方法：
+ add: 添加
+ has: 是否存在某个值
+ clear
+ delete
+ entries
+ forEach
+ keys
+ values

可以用 for ... of  进行遍历

举例：
```js
let mySet = new Set();

mySet.add(1); // Set [ 1 ]
mySet.add(5); // Set [ 1, 5 ]
mySet.add(5); // Set [ 1, 5 ]
mySet.add("some text"); // Set [ 1, 5, "some text" ]
let o = {a: 1, b: 2};
mySet.add(o);

mySet.has(1); // true
mySet.has(3); // false

mySet.delete(5);  // true,  从set中移除5
```

### Map

`Map`对象保存**键值对**，并且能够记住键的原始插入顺序。任何值（对象或者原始值）都可以作为一个键或一个值。

属性：
+ size

方法：
+ clear
+ delete
+ entries
+ forEach
+ get   // 读取键
+ has
+ keys
+ set   // 添加键
+ values

举例：

```js
let keyObj = {};
let keyFunc = function() {};
let keyString = 'a string';
 
// 添加键
myMap.set(keyString, "和键'a string'关联的值");
myMap.set(keyObj, "和键keyObj关联的值");
myMap.set(keyFunc, "和键keyFunc关联的值");
 
myMap.size; // 3
 
// 读取值
myMap.get(keyString);    // "和键'a string'关联的值"
myMap.get(keyObj);       // "和键keyObj关联的值"
myMap.get(keyFunc);      // "和键keyFunc关联的值"
 
myMap.get('a string');   // "和键'a string'关联的值"
```


## symbol 属性

symbol 是一种基本数据类型，
symbol() 函数会返回symbol类型的值，该类型具有静态属性和静态方法。
每个从Symbol() 返回的symbol值都是唯一的。一个symbol值能作为对象属性的标识符；这是数据类型仅有的目的。


### Symbol 的特性

1. 独一无二性
2. 原始类型
3. 不可枚举

### Symbol 的应用场景

1. 防止XSS
JSON 中不能存储Symbol 类型的变量，这就是防止XSS的一种手段。

2. 私有属性

借助Symbol类型的不可枚举，我们可以在类中模拟私有属性，控制变量读写

3. 防止属性污染

在某些情况下，我们可能要为对象添加一个属性，此时就有可能造成属性覆盖，用Symbol作为对象属性可以保证永远不会出现同名属性。

[参考文章](https://juejin.im/post/6844903854882947080)

## 深拷贝和浅拷贝的区别

基本类型: 数据保存在栈内存中。
引用类型的值实际存储在堆内存中，它在栈中只存储了一个固定长度的地址，这个地址指向堆内存中的值。

浅拷贝: 如果是对象类型，只拷贝一层，如果对象的属性又是一个对象，那么此时拷贝的就是此属性的引用。

简单实现一个浅拷贝：

```js
function shallowCopy() {
    const newObj = {};
    for(let prop in obj) {
        if(obj.hasOwnProperty(prop)) {
            newObj[prop] = obj[prop]
        }
    }
    return newObj
}
```

深拷贝的实现

浅拷贝是只拷贝一层，深拷贝会拷贝所有属性。深拷贝前后两个对象互不影响。


尝试自己写一个深拷贝，需要考虑下面几种情况

1、属性是基本类型
2、属性是对象，特殊对象
3、属性是数组
4、循环引用的情况

## javascript 模块化

2009年 1月 commonJS 服务器端模块化规范 同步加载  基于CommonJS 规范实现模块体系的Node.js

2009年 12月 AMD   浏览器端模块化规范   异步加载  基于AMD规范的模块化加载器 RequireJS

2011年 11月 CMD  浏览器端模块化规范   异步加载    基于CMD规范的模块化加载器  Sea.js

2015 年 6月   ES模块化规范    目标是整合 CommonJS 、 AMD 已有的模块化方案， 成为浏览器和服务器通用的模块化解决方案

在浏览器端使用模块加载器存在很多弊端，但是 CommmonJS 规范在服务器端就很方便稳定。解决办法 预编译

2017 年 webpack 就是这种预编译的模块化方案。它结合了CommonJS 和AMD 的优缺点，开发时可按照CommonJS 的编写方式，支持编译后按需加载和异步加载所有资源。

[javascript模块化野史](https://juejin.im/post/5e3985396fb9a07cde64c489)

## apply bind call 的区别

这三个函数都是改变了当前函数的this 指向。

apply 接收的是数组，并会立即执行
call  接收的是用逗号隔开的参数，并会立即执行
bind  接收的是用逗号隔开的参数，但是不会立即执行，而是返回一个新的函数

## 原型对象和构造函数有何关系?

1. 在JavaScript中，每当定义一个函数数据类型（普通函数、类）时候，都会天生自带一个prototype属性，这个属性指向函数的原型对象。

2. 当函数经过new调用时，这个函数就成为了构造函数，返回一个全新的实例对象，这个实例对象有一个_proto_属性，指向构造函数的原型对象。

## 说一下 原型链

1. 首先要明白实例的proto属性与构造函数的protype属性都是指向原型对象，原型对象的constructor属性又是指向构造函数

2. JavaScript对象通过__proto__指向父类的原型对象，直到指向Object的原型对象为止，这样就形成了一个原型指向的链条，即原型链

流程图：

![原型链](https://tang-yue.github.io/interview/basic-js/prototype.jpeg)

```js
function func() {

}
const f = new func()

console.log(f.__proto__.constructor === func, 'xxxx')

console.log(f.__proto__ === func.prototype);

console.log(func.prototype.__proto__ === Object.prototype)

console.log(Object.prototype.__proto__ === null)

// 以上就是一个原型链

console.log(func.__proto__ === Function.prototype)   // func 又是 Function 的实例

console.log(Object.__proto__ === Function.prototype)  // true

console.log(Function.__proto__ === Function.prototype) // true

console.log(Function.prototype.__proto__ === Object.prototype)  // true
```

[参考文章](https://zhuanlan.zhihu.com/p/39549472)

## 什么是闭包

一个可以操作外部其他函数定义的局部变量的函数，相当于一个变量作用域，作用域可以向外操作，但不可向内操作

```
  // 徒手写一个闭包

  function sayHello(name) {
    let str = `Hello, ${name}`;
    function say() {
      console.log(str);
    }
    return say;
  }

  let myHello = sayHello('abby');

  myHello();  // Hello,abby
```

## 箭头函数和普通函数的区别

1. 箭头函数是匿名函数，不能作为构造函数，不能使用 new
2. 箭头函数不能绑定arguments，取而代之用rest参数...解决
3. 箭头函数没有原型属性
4. 箭头函数的this永远指向其上下文的this，没有办法改变其指向
普通函数的this 指向调用它的对象

## for of 和 for in 的区别

for in 遍历对象 [[[[ 遍历字符串 key ===> 0 1 2 3 ]]]] 数组

for of 数组， 类对象，遍历字符串

## js 对象遍历， 几种方式的区别

```js
// 可枚举属性

let obj = { a: 1 } 

// 不可枚举属性
Object.defineProperty(obj, 'b', {
    enumerable: false,
    value: 2
})

// 添加原型链属性
Object.prototype.c = 3

// 下面用三种方法进行测试

// for...in

for(var key in obj) {
    console.log(key, obj[key])  // a 1 c 3
}

// for...in 会遍历对象本身的，以及原型链上的所有可枚举属性

// Object.keys

console.log(Object.keys(obj)) // ['a']

// Object.keys 只会遍历对象本身的可枚举属性，不会遍历原型链上的属性

console.log(Object.getOwnPropertyNames(obj)) // ['a', 'b']

// Object.getOwnPropertyNames 会遍历对象的所有属性，不会遍历原型链上的属性
```

[参考文章](https://juejin.im/post/6844904161453015054)

## Object.defineProperties() 有哪些参数

```js
var obj = {};

Object.defineProperties(obj, {
    'property1': {
        value: true,
        configurable: true, // 默认为false 是否可修改
        enumerable: true, // 默认为false 是否可枚举
        writable: true   // 默认为false 是否可以用赋值法修改值
        get: 
        set:
    }
})
```

## javascript 继承方式

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

SubType.prototype.getSubValue = function () {
    return this.subproperty
}

var instance = new SubType();

instance.getSuperValue()   // true

instance.getSubValue()  // false
```

```js
// 示例二

function SuperType () {
    this.name = 'super'
    this.colors = ['red', 'blue', 'green']
}

function SubType() {

}

SubType.prototype = new SuperType()

instance = new SubType()

instance1 = new SubType()

instance.colors.push('yellow')
instance.name = 'sub'

instance1.colors // ['red', 'blue', 'green', 'yellow'] 被改变了
instance1.name

```
问题：
1. 包含引用类型值的原型属性会被所有实例共享，这也是为什么要在构造函数中，而不是原型对象中定义属性的原因。
2. 没有办法在不影响所有对象实例的情况下，给超类型的构造函数传递参数

缺点：
1. 包含引用类型的原型属性会被所有实例共享，如果改变一个实例上的属性，其他实例上的该属性也会被改变
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

var instance2 = new SubType()
instance2.colors // ['red', 'blue', 'green']
```

```js
// 可以传递参数
function SuperType(name) {
    this.name = name;
    this.height = 20;
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
    var clone = Object.create(original);   // 这里不理解，通过调用函数创建一个新对象
    clone.sayHi = function() {      // 以某种方式来增强这个对象
        // alert('hi')
        console.log('hi')
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

anotherPerson.sayHi();  // ‘hi’
```

### 寄生组合式继承

高程上好像没有具体写。

补充一个

寄生式 + 构造函数 + 原型链 的组合

```js
function inherit(child, parent) {
    // 继承父类的原型
    const p = Object.create(parent.prototype)
    // 重写子类的原型
    child.prototype = p;
    // 重写被污染的子类的constructor
    p.constructor = child;
}

function parent(name, age) {
    this.age = age;
    this.name = name;
}

parent.prototype.info = function () {
    return this.name + '年龄' + this.age
}

parent.prototype.getName = function () {
    return '哈哈 我要返回 age' + this.age
}

function child(name, age) {
    parent.call(this, name, age) // 继承属性
    this.height = 160
}

// 实现原型上的方法
inherit(child, parent)

// 在原型上添加新方法

child.prototype.getName = function () {
    return this.name
}

const child1 = new child('child1', 10)

const parent1 = new parent('parent1', 20)

console.log(child1.name, child1.age, child1.getName()) // child1 10 child1

console.log(parent1.name, parent1.age, parent1.info(), parent1.getName()) // parent1 20 parent1年龄20 哈哈 我要返回 age20
```

如果子类和父类有同一个方法，那么子类的该用自己的方法，而不用父类的方法
别的没什么太大的缺陷。

[参考 高级js程序设计书籍]
[深入JavaScript继承原理](https://juejin.im/post/5a96d78ef265da4e9311b4d8)

## Js 垃圾回收机制

一、Js 具有垃圾自动回收机制

原理：周期性执行，找出那些不再继续使用的变量，然后释放其内存。

二、最常见的垃圾回收方式 ---- 标记清除方式

原理： 当变量进入环境时，将这个变量标记为'进入环境'，当变量离开环境时，则将其标记为‘离开环境’，标记‘离开环境’的回收内存。

三、引用计数方式

原理：跟踪记录每个值被引用的次数，当垃圾回收器运行时，就会释放那些引用次数为0的值所占用的内存。

[参考资料](https://juejin.im/post/6844903920255369230)

## EventEmitter 简单实现

[参考文章](https://www.jianshu.com/p/45994e03ac33)

## await/async 的底层原理

[手写async await 的最简实现 20行](https://juejin.im/post/6844904102053281806)

async 关键词有两个作用

1. Makes it always return a promise
2. Allows await to be used it

The await keyword before a promise makes JavaScript wait until that promise settles, and then:

1. if it's an error, the exception is generated -- same as if throw error were called at that very place;
2. Otherwies, it returns the result.


### async functions


```js
async function f() {
    return 1;
}

f().then(alert); // 1
```

```js
async function f() {
    return Promise.resolve(1);
}
f().then(alert)   // 1
```

### await functions

```js
async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000)
  });

  let result = await promise; // wait until the promise resolves (*)

  alert(result); // "done!"
}

f();
```

### Error handling

```js
async function f() {
  await Promise.reject(new Error("Whoops!"));
}
```

```js
async function f() {
  throw new Error("Whoops!");
}
```

try catch

```js
async function f() {

  try {
    let response = await fetch('http://no-such-url');
  } catch(err) {
    alert(err); // TypeError: failed to fetch
  }
}

f();
```

### await promise.all

```js
let results = await Promise.all([
  fetch(url1),
  fetch(url2),
  ...
]);
```

async/await 语法糖 就是使用 Generator 函数 + 自动执行器来运作的，参考以下例子

```js
// 定义了一个promise，用来模拟异步请求，作用是传入参数 ++

function getNum(num) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(num+1)
        }, 1000)
    })
}

// 自动执行器，如果一个 Generator 函数没有执行完， 则递归调用

function asyncFun(func) {
    var gen = func();

    function next(data) {
        var result = gen.next(data);
        if(result.done) return result.value;
        result.value.then(function(data) {
            next(data);
        })
    }

    next();
}

// 所需要执行的Generator 函数，内部的数据在执行完成一步的promise 之后，再调用下一步

var func = function* () {
    var f1 = yield getNum(1);
    var f2 = yield getNum(f1);
    console.log(f2);
}

asyncFun(func)
```

但是我看上面，并没有实现一个 async/await 呀，其实就是 babel 对 async 函数的实现思路

[async/await 原理及简单实现](https://juejin.im/post/6844903840303546382)



