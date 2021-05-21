// 12月21日 面试复习

// 手写 jsonp

// 手写发布-订阅模式

// 手写proxy版数据绑定

// sleep 函数

// 手写 jsonp

// 手写发布--订阅模式

// class EventEmitter {
//     constructor() {
//         this.events = {}
//     }

//     on(eventName, callback) {
//         if(this.events[eventName]) {
//             this.events[eventName].push(callback)
//         } else {
//             this.events[eventName] = [callback]
//         }
//     }

//     // 以上 on 是正确的
    
//     off(eventName, callback) {
//         if(this.events[eventName]) {
//             this.events[eventName] = this.events[eventName].filter((cb) =>  {cb !== callback} )
//         }
//     }
//     // 

//     once(eventName, callback) {
//         const one = (...args) => {
//             callback.apply(this, args)
//             this.off(eventName, callback)
//         }
//         this.on(eventName, one)
//     }

//     emit(eventName, callback) {
//         if(this.events[eventName]) {
//             this.events[eventName].forEach((cb) => {
//                 cb();
//             })
//         }
//     }
// }

// const execute = new EventEmitter();

// // 疑惑的点
// // 1. off操作的时候，如果连事件名都不存在，我应该如何处理， 不要管
// // 2. emit 操作的时候，这样可以吗？ // 事件名字不存在的时候，不要去管
// // 3. once 操作   // this 指向 和参数问题


// execute.on('失恋', () => { console.log('心情不好') })

// execute.emit('失恋')

// execute.once('one', () => { console.log('我只执行一次的')})

// // execute.emit('失恋')

// execute.off('失恋', () => { console.log('心情不好') })

// execute.emit('one')

// execute.emit('失恋')

// execute.emit('失恋')

// 对比出错的点


// 手写jsonp

// function jsonp(url, data, callback) {
//     let dataStr = ''
//     dataStr += url.indexOf('?') === -1 ? '?' : '&'

//     for(var key in data) {
//         dataStr += key + '=' + data[key] + '&'
//     }

//     let cb_name = 'jsonpCallback'

//     dataStr += 'callback=' + cb_name;

//     let scriptBody = document.createElement('script');

//     scriptBody.src = url  + dataStr;
    
//     window[callbackName] = function (data) {
//         callback(data)
//         document.body.removeChild(scriptBody)   // 这步出错了
//     }
//     document.body.appendChild(scriptBody);   // 这步也出错了
// }

// 与上述对比实现

// let jsonp = function (url, data = {}, callback) {
//     // 转化数据为url字符串形式
//     let dataStr = url.indexOf('?') === -1 ? '?' : '&';
//     for(let key in data) {
//         dataStr += `${key}=${data[key]}&`
//     }

//     let cb_name = 'jsonpCallback'
//     dataStr += 'callback=' + cb_name

//     // 创建script标签并添加src属性值
    
//     let scriptBody = document.createElement('script');

//     scriptBody.src = url + dataStr;

//     window[cb_name] = function(data) {
//         callback(data);
//         document.body.removeChild(scriptBody)
//     }
//     // append 到页面， 添加到页面就立刻发起请求
//     document.body.appendChild(scriptBody)
// }

// 手写 深拷贝

// function deepClone(target,cache = new Map()){
//     if(cache.get(target)){
//         return cache.get(target)
//     }
//     if(target instanceof Object){
//         let dist ;
//         if(target instanceof Array){
//           // 拷贝数组
//           dist = [];
//         }else if(target instanceof Function){
//           // 拷贝函数
//           dist = function () {
//             return target.call(this, ...arguments);
//           };
//         }else if(target instanceof RegExp){
//           // 拷贝正则表达式
//          dist = new RegExp(target.source,target.flags);
//         }else if(target instanceof Date){
//             dist = new Date(target);
//         }else{
//           // 拷贝普通对象
//           dist = {};
//         }
//         // 将属性和拷贝后的值作为一个map
//         cache.set(target, dist);
//         for(let key in target){
//             // 过滤掉原型身上的属性
//           if (target.hasOwnProperty(key)) {
//               dist[key] = deepClone(target[key], cache);
//           }
//         }
//         return dist;
//     }else{
//         return target;
//     }
//   }
//

  let obj = {
      a: function() {
        console.log(this);
      }
  }

  obj.a(); // 执行 obj
  let b = obj.a;
  b();   // 指向 window;

  let obj1 = {
      a: () => {
          console.log(this);
      }
  }

  obj1.a();
  let b1 = obj1.a;
  b1();







