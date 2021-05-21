// 数组拍平


// 第一种数组拍平

// scriptoj
// scriptoj

function flatten(arr) {
    let res = []

    arr.forEach((item) => {
        if(Array.isArray(item)) {
            res = res.concat(flatten(item))
        } else {
            res.push(item)
        }
    })
    return res 
}

// 第二种是通过传入数字，层级的关系
// 用的方法是 reduce

function flatten2(arr, num) {
    return num > 0 ?
        arr.reduce((res, value) => {
            Array.isArray(value) ? res = res.concat(flatten2(value, num-1)): res.push(value)
            return res;
        }, [])
    : arr;
}



let arr = [1,2,3,[4,5,[6]]];

// console.log(flatten2(arr,0))

// 数组去重

// 用两种方式

let arr1 = [1,2,2,3,3,4];

// let res = Array.from(new Set(arr1));

// console.log(res)

// 用数组的下标进行

function removeDedup(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index)
}

// console.log(removeDedup(arr1), 'res res res res');


function formatNumber2(num) {
    console.log(String(num), 'string num')
    const parts = String(num).split('.');
    parts[0] = Number(parts[0]).toLocaleString()
    console.log(parts[1])
    return parts.join('.')
}




function disorder(array) {
    const length = array.length;
    let current = length - 1;
    let random;
    while(current > -1) {
        random = Math.floor((length -1) * Math.random());
        [array[current], array[random]] = [array[random], array[current]];  // 交换两者的位置
        current--;
    }
    return array;
}

const flush = function(num = []) {
    for (let i = 0; i < num.length; i++) {
        let index = Math.floor(Math.random() * num.length);
        let temp = num[i];
        num[i] = num[index];
        num[index] = temp;
    }
    return num;
};

// console.log(Math.floor(3 * Math.random()), 'res res')

// console.log(flush([1,2]))
  
// console.log(disorder([1,2]))


// var mySqrt = function(x) {
//     let i = x;
//     let res = i * i;
//     while((i * i) > x) {
//         i--;
//     }
//     return i;
// };

// mySqrt(4);


// const l = 3;
// const r = 5;

// const mid = 3 + (5-3)/2;

// console.log(mid, 'mid')

// const set = new Set([3,4,5,6])

// set.forEach((n) => {
//     console.log(n, 'nnn')
// })

// var longestConsecutive = function(nums) {
//     let numsSet = new Set(nums), max = 0;
//     numsSet.forEach(n => {
//         if(numsSet.has(n-1)) {
//             return;
//         }
//         let currConse = 0, currNum = n;
//         while(numsSet.has(currNum)) {
//             currConse++;
//             currNum++;
//         }
//         max = Math.max(max, currConse);
//     })
//     return max;
// }

// longestConsecutive([1,2,3,4])


// var subsets = function(nums) {
//     const res = [];
//     const backtrack = (path, l, start) => {
//         if (path.length === l) {
//             res.push(path);
//             return;
//         }
//         for (let i = start; i < nums.length; i++) {
//             backtrack(path.concat(nums[i]), l, i+1);
//         }
//     };
//     for(let i = 0; i <= nums.length; i++) {
//         backtrack([], i, 0)
//     }
//     return res;
// }

// subsets([1,2,3])

function compare(v1, v2) {
    let v1_num = Number(v1.slice(1).split('.').join(''))
    let v2_num = Number(v2.slice(1).split('.').join(''))

  
    return v1_num > v2_num;
  }


//   console.log(compare('v1.2.3','v0.3.0'));




function merge(nums1, nums2) {
    let n1 = nums1.length;
    let n2 = nums2.length;
    let p1 = 0;
    let p2 = 0;
    let res = [];
    while(p1 < n1 && p2 < n2) {
        if(nums1[p1] < nums2[p2]) {
            res.push(nums1[p1])
            p1++;
        } else {
            res.push(nums2[p2])
            p2++;
        }
    }

    if(p1 >= n1) {
        res = res.concat(nums2.slice(p2))
    }
    if(p2 >= n2) {       
        res = res.concat(nums1.slice(2))
    }
    return res;
}

// console.log(merge([1,3,6,31,31,35,60,60], [2,4,4,5,10,10,34]))


var arr_1 = [
    { id: 1, value: '节点1', p_id: 0 },     //  p_id 代表的是 parent_id
    { id: 2, value: '节点2', p_id: 1 },
    { id: 3, value: '节点3', p_id: 1 },
    { id: 4, value: '节点4', p_id: 2 },
    { id: 5, value: '节点5', p_id: 0 },
    { id: 6, value: '节点6', p_id: 5 },
    { id: 7, value: '节点7', p_id: 6 },
    { id: 8, value: '节点8', p_id: 6 }
  ]


// 看了眼别人的答案：
// 别人的写法

let getTree = (arr) => {
    return arr.reduce((prev, _) => {
        let finder = arr.find(item => item.id === _.p_id);  // 双重遍历 // 找到 arr里面那些值的id,  且他们存在children 的。
        if(finder) {
            (finder.children || (finder.children = [], finder.children)).push(_)
            prev.every(_ => _.id !== finder.id) && prev.push(finder)
        }
        return prev
    }, [])
    .reduce((prev, _, i, arr) => (arr.every(item => item.id !== _.p_id) && prev.push(_), prev), [])
}

// console.log(getTree(arr_1))


var arr4 = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9']
  ]

function LInput(arr) {
    if(!Array.isArray(arr)) return;
    let r = arr.length;
    let res = [];
    var number = 1;
    for(let i = r; i > 0; i--) {
      for (let j = 0; j < i; j++) {
        res.push(arr[j][r - i])
      }
      var arrSlice = arr[r - number]&&arr[r - number].slice(number);
  
      res.push(...arrSlice);
      ++number;
    }
    return res;
  }

//   console.log(LInput(arr4))

var arr5 = [
    ['A', 'B', 'C'],
    [1, 2, 3],
    ['X', 'Y', 'Z']
  ]


function arrange(arr) {
    let res = [];
    for(let i = 0; i < arr.length; i++) {
        for(let j = 0; j < arr.length; j++) {
            for(let p = 0; p < arr.length; p++) {
                res.push(arr[0][i] + arr[1][j] + arr[2][p])
            }
        }
    }
    return res;
  }

//   console.log(arrange(arr5));


function find(obj, str) {
    let arr = str.split('.');
  
    // 我觉得是一个递归
    let i = 1;
    let temp = obj[arr[0]]
    while(i < arr.length) {
      if(temp) {
        temp = temp[arr[i]]
      } else {
        return undefined;
      }
      i++;
    }
    return temp;
  }


  var obj = {a:{b:{c:1,d:2}}};
  
//   console.log(find(obj, 'a.b.d'));
//   find(obj, 'a.d.c');

// function *func() {
//     console.log(1);
//     // yield 1;
//     yield;
//     console.log(2);
//     yield;
//     console.log(3);
//     // yield 3;
//     // yield 4;
//     // return;
// }

// const iterator = func();

// iterator.next()
// iterator.next()
// iterator.next()

// console.log(iterator.next().value);

// console.log(iterator.next().value);

// console.log(iterator.next().value);

// console.log(iterator.next().value);


// let arr3 = [];

// let test = () => {
//     // let test1 = () => {
//     //     console.log('test1');
//     // }
//     // test1();
// }


// arr3.push(test);

// arr3.forEach((fn) => {
//     fn();
// })




let promise1 = new Promise((resolve, reject) => {
    resolve(1);
})

console.log(promise1 instanceof Promise, '哈哈');


