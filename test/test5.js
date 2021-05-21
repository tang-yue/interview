function red(){
    console.log('red');
   }
   function green(){
     console.log('green');
   }
   function yellow(){
     console.log('yellow');
   }
   
   var count = 0;
   function lamp(){
     return new Promise((resolve,reject) => {
       setTimeout(() => {
         red();
         resolve()
       },3000)
     }).then(()=>{
       return new Promise((resolve,reject) =>{
         setTimeout(() => {
           green();
           resolve()
         },1000)
       })
     }).then(() => {
       return new Promise((resolve,reject) =>{
         setTimeout(() => {
           yellow();
           count++;
           if(count>5){
             reject();
             console.log('这里执行了吗？')
           }
           resolve()
   
         },1000)
       })
     })
       .then(() =>{
       lamp();
     }).catch(() => {
   
       })
   }
lamp();


// 手写发布订阅模式

class EventEmitter {
    constructor() {
        // 维护一个对象
        this._events = {

        }
    }
    on(eventName, callback) {
        if(this._events[eventName]) {
            this._events[eventName].push(callback);
        } else {
            this._events[eventName] = [callback];
        }
    }
    emit(eventName, ...rest) {
        if(this._events[eventName]) {
            this._events[eventName].forEach((item) => {
                item.apply(this, rest)
            })
        }
    }
    removeListener(eventName, callback) {
        if(this._events[eventName]) {
            this.events[eventName] = this._events[eventName].filter(item => item !== callback);
        }
    }
    once(eventName, callback) {
        function one() {
            callback.apply(this, arguments); // 先执行一次
            this.removeListener(eventName, one);
        }
        this.on(eventName, one); // 此时emit触发会执行此函数，会给这个函数传递 rest参数
    }
}

// class Man extends Evi
