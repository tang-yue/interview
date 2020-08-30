// 思路：
// 1、确定任务都已经成功执行并且拿到了数据。 promise.then()
// 2、设置一个数组，来存放每个Promise返回的数据，当该数组的长度等于Promise任务的个数时，
// 说明拿到了所有的数据，此时就把该数组返回出去了

function all(list) {
  return new Promise((resolve, reject) => {
    let resValues = [];
    let counts = 0;
    for(let i = 0; i < list.length; i++) {
      list[i].then(res => {
          counts++;
          resValues[i] = res;
          if (counts === list.length) {
              resolve(resValues)
          }
      }, err => {
          reject(err)
      })
    }
  })
}

let p1 = new Promise(resolve => { resolve('p1') })
let p2 = new Promise(resolve => { setTimeout(() => { resolve('p2') }, 3000) })
let p3 = new Promise(resolve => { resolve('p3') })
let p4 = new Promise(resolve => { setTimeout(() => { resolve('p4') }, 1500) })
let p5 = new Promise(resolve => { resolve('p5') })

all([p1, p2, p3, p4, p5]).then((res) => {
  console.log(res)
}).catch(err => {
  console.error(err)
})