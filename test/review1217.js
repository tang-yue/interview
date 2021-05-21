// 写几个最近刚学的手写coding

// 1. 手写async done // 但是有点卡壳

// 2. 手写数据劫持

// 3. 用另一种方式手写深拷贝

// 4. 手写发布-订阅模式

// 5. promise的红绿灯问题

// 首先该函数返回new promise， 然后内部then 

// 太过功利了，只能自己看一遍，

// 手写async

const getData = () => new Promise(resolve => { setTimeout(() => { resolve('data') }, 1000)  })

function* test() {
  let data = yield getData();
  console.log('data: ', data);
  let data1 = yield getData();
  console.log('data1: ', data1);
  return 'success';
}

// 也就是说要达到这样的效果

function myAsync(genFunc) {
  return function() {
    let gen = genFunc.apply(this, arguments);
    return new Promise((resolve, reject) => {
      function step(event, arg) {
        let result;
        try {
          result = gen[event](arg)
        } catch(err) {
          reject(err);
        }
        const {value, done} = result;
        if(done) {
          return resolve(value);
        } else {
          return Promise.resolve(value).then((val) => {
            step('next', val)
          }, (err) => {
            step('throw', err);
          })
        }
      }
      step('next')
    })
  }
}

// myAsync(test)().then((res) => {console.log(res)}, () => {});  

// 手写数据劫持
// 重新默写一下吧
function observer(target) {
  if(typeof target !== 'object' || target === null) {
    return target;
  }
  let observed;
  observed = new Proxy(target,{
    get(target, key, receiver) {
      return observer(Reflect.get(target, key, receiver))
    },
    set(target, key, value, receiver) {
      // console.log('key：', key)
      return Reflect.set(target, key, value, receiver)
    }
  })
  return observed;
}

let obj = {
  a: [1,2,3],
  b: 'b'
}

let new_obj = observer(obj)

new_obj.a.push(5)

// console.log(new_obj.a)

// 4.手写发布订阅模式

// function observer() {

// }

class EventEmitter {
  constructor() {
    this.events = {}
  }

  on(eventName, callback) {
    if(this.events[eventName]) {
       this.events[eventName].push(callback)
    } else {
      this.events[eventName] = [callback]
    }
  }

  emit(eventName) {
    this.events[eventName].forEach((cb) => {
      cb();
    })
  }

  removeListener(eventName, callback) {
    if(this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter((cb) => { cb !== callback })
    }
  }
  
  once(eventName, callback) {
    const one = (...args) => {
      // one 表示什么意思
      callback.apply(this. args);
      this.removeListener(eventName, callback)
    }

    this.on(eventName, one)
  }
}

let execute = new EventEmitter();

execute.on('失恋', () => { console.log('我现在比较难过') })

execute.on('失恋', () => { console.log('享受一个人的孤独') })

execute.emit('失恋')

execute.once('哈哈', () => { console.log('我只执行一次的') })

execute.emit('哈哈')
execute.emit('哈哈')
// execute.emit('失恋')

// 还需要再次理解一下


for (let i = 1; i < 5; i++) {
  setTimeout(function() { 
    console.log(i);
  }, 0);
}
