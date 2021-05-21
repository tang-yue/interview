数组拍平

```js
function flat(arr, num) {
    return num > 0 ?
        arr.reduce((pre, cur) => pre.concat(Array.isArray(cur) ? flat(arr, num-1) : cur), [])
    : arr.slice()
}
```

手写 promise.all

```js
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
```

```js
function all(list) {
    return new Promise((resolve, reject) => {
        let resValues = [];
        let counts = 0;
        for(let i = 0; i < list.length; i++) {
            list[i].then((res) => {
                counts++;
                resValues[i] = res;
                if(counts === list.length) {
                    resolve(resValues)
                }
            }, err => {
                reject(err)
            })
        }
    })
}
```

// 默写一遍 promise.all

```js
function all(list) {
    return new Promise((resolve, reject) => {
        let resValues = [];
        let counts = 0;
        for(let i = 0; i < list.length; i++) {
            list[i].then((value) => {
                counts++;
                resValues[i] = value;
                if(counts === list.length) {
                    resolve(resValues)
                }
            }, err => {
                reject(err)
            })
        }
    })
}
```
// 手写快排

```js
function quickSort(arr) {
  // 首先确定一个基准值
  if(arr.length <= 1) return arr;
    let index = arr.length/2;
    let arrVal = arr.splice(index, 1); // 删除掉了arr里的一个值
    let middle = arrVal[0]
    let right = [];
    let left = [];

    for(let i = 0; i < arr.length; i++) {
      if(arr[i] > middle) {
        right.push(arr[i])
      } else {
        left.push(arr[i])
      } 
    }
    // 因为之前中间值被删掉了，所以要加回来。
    return quickSort(left).concat(middle, quickSort(right))
  }
```

```js
// 手写快排
function quickSort(arr) {
    if(arr.length <= 1) return arr;
    let index = arr.length/2;
    let arrVal = arr.splice(index, 1);
    let middle = arrVal[0]
    let right = [];
    let left = [];
    
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] > middle) {
            right.push(arr[i])
        } else {
            left.push(arr[i])
        }
    }
    // 因为之前中间值被删除了，所以要加回来
    return quickSort(left).concat(middle, quickSort(right))
}

```

// 默写一遍手写快排

```js
function quickSort(arr) {
    let index = arr.length/2;
    let arrValue = arr.splice(index, 1);
    let middleValue = arrValue[0];
    let right = [];
    let left = [];
    for()
    //
    //
    return quickSort(left).concat(middleValue, quickSort(right))
}
```
// 防抖函数，节流

防抖：

```js
const curry = (fn, arr = []) => {
  return (...args) => {
    if([..arr, ...args].length === fn.length) {
      // fn.length 表示函数接受的参数个数
      return fn(...arr, ...args)
    } else {
      return curry(fn, [..arr, ...args])
    }
  }
}
```
// 手抄一遍

```js
const curry = (fn, arr = []) => {
    return (...args) => {
        if([...arr, ...args].length === fn.length) {
            return fn(...arr, ...args)
        } else {
            return curry(fn, [...arr, ...args])
        }
    }
}
```