function myNew() {
    // 取出构造函数
    const construct = [].shift.call(arguments);

    const obj = Object.create(construct.prototype);
    
    const res = construct.apply(obj, arguments);

    return typeof res === 'object' ? res || obj : obj;
}

function Test(num) {
    this.value = num;
    this.otherValue = 80;
}

console.log(myNew(Test, 30))


function quickSort(arr) {
    if(arr.length < 2) return arr;
    let midI = Math.floor(arr.length/2);
    let mid = arr.splice(midI ,1);
    let left = [];
    let right = [];

    for(let i = 0; i < arr.length; i++) {
        if(arr[i] > mid) {
            right.push(arr[i])
        } else {
            left.push(arr[i])
        }
    }
    return quickSort(left).concat(mid, quickSort(right))
}


console.log(quickSort([6,4,3,3,5]))


function bubbleSort(arr) {
    for(let i = 0; i < arr.length; i++) {
        for(let j = i; j < arr.length; j++) {
            if(arr[j] <= arr[i]) {
                let temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
            }
        }
    }
    return arr;
}

console.log(bubbleSort([6,4]))



function flatten(arr, n) {
    return n > 0 
        ? arr.reduce((res, item) => {
            Array.isArray(item) ? res = res.concat(flatten(item, n-1)) : res.push(item)
            return res;
        }, [])
    : arr.slice()
}

console.log(flatten([3,4,[1,[2]]], 2))

function trim(arr) {
    return arr.filter((val, i) => arr.indexOf(val) === i)
}


console.log(trim([1,1,2,2,3,3]))


function myInstanceof(l, r) {
    let ol = l.__proto__;
    let or = r.prototype;
    while(ol !== null) {
        if(ol === or) {
            return true;
        }
        ol = ol.__proto__;
    }
    return false;
}

console.log(myInstanceof([], Number));


function flush(arr) {
    for(let i = 0; i < arr.length; i++) {
        let random = Math.floor(Math.random() * arr.length)
        let temp = arr[random];
        arr[random] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

console.log(flush([3,5,4]))


function curry(fn, arr = []) {
    return (...args) => {
        if([...args, ...arr].length === fn.length) {
            return fn(...args, ...arr)
        } else {
            return curry(fn, [...args, ...arr]);
        }
    }
}


function add(a,b) {
    return a + b;
}
const currid = curry(add);

const add1 = currid(3);

console.log(add1(2));


function transformNumber(number) {
    let parts = number.toString().split('.');

    parts[0] = parts[0].replace(/\B(?=(\d{3})+$)/g,',');

    return parts.join('.')
}

function transformNumber2(number) {
    let parts = number.toString().split('.');

    parts[0] = Number(parts[0]).toLocaleString();

    return parts.join('.')
}


console.log(transformNumber2(12345.78))

// 函数版的最后再写



function getRes(arr) {
    return arr.sort((a, b) => {
        if(a.length === b.length) {
            for(var i in a) {
                if(a.charCodeAt(i) > b.charCodeAt(i)) {
                    return 1;
                } else if(a.charCodeAt(i) < b.charCodeAt(i)) {
                    return -1;
                } 
                // else {
                //     continue;
                // }
            }
        } else if(a.length > b.length) {
            return 1;
        } else {
            return -1;
        }
    })
}


console.log(getRes(['aaa', 'aaa','aaa', 'ccc', 'rr', 'ada']))




function getRes2(str) {
    let arr = [];
    let strArr = [];
    for(var i in str) {
        let index = strArr.indexOf(str[i]);
        if(index === -1) {
            strArr.push(str[i]);
            arr.push(1);
        } else {
            arr[index]++
        }
    }
    let max = arr[0];
    let maxI = 0;
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] > max) {
            max = arr[i];
            maxI = i;
        }
    }
    return { str: strArr[maxI], num: arr[maxI]}
}


console.log(getRes2('aaabbbbee'))

function getRes4(str) {
    str = str.replace(/[^0-9a-zA-Z]/g, '');
    if(str.split('').reverse().join('') === str) return true;
    let len = str.length;
    for(let i = 0; i < parseInt(len/2); i++) {
        if(str[i] !== str[len - i -1]) {
            let arr = str.split('');
            let arr2 = str.split('');
        
            arr.splice(i, 1);
            arr2.splice(len - i -1, 1);

            return arr.join('') === arr.reverse().join('') || arr2.join('') === arr2.reverse().join('')
        }
    }
}

console.log(getRes4('abca'))

function search(nums, target) {
    let low = 0;
    let high = nums.length - 1;
    while(low <= high) {
        let mid = Math.floor((low + high)/2);
        let ele = nums[mid];
        if(ele < target) {
            low = mid +1;
        } else if(ele > target) {
            high = mid -1;
        } else {
            console.log('执行这里了？', ele, target)
            return mid;
        }
    }
    return -1;
}

search([-1,0,3,5,9,12], 13);


function getRes8(nums) {
    let res = []
    const backTrack = (num) => {
        if(num.length === nums.length) {
            res.push(num);
        }
        nums.forEach((val) => {
            if(num.includes(val)) return;
            backTrack(num.concat(val));
        })
    }

    backTrack([])
    return res;
}

console.log(getRes8([1,2,3]));

// 继续写背包问题

// 给你一个可装重量为 W 的背包和 N 个物品。每个
// 物品有重量和价值两个属性 第i个物品的重量为 wt[i]， val[i]

// 现让你用这个背包装物品，最多能装的价值是多少。

// 这个真的有点麻烦呀

// 默写一遍吧

function package(weights, values, W) {
    let n = weights.length;
    let f = new Array(n);
    for(let i = 0; i < n.length; i++) {
        f[i] = []
    }

    for(let i = 0; i < n; i++) {
        for(let j = 0; j <= W; j++) {
            if(i === 0) {
                f[i][j] = j < weights[i] ? 0 : values[i]
            } else {
                if(j < weights[i]) {
                    f[i][j] = f[i-1][j]
                } else {
                    f[i][j] = Math.max(f[i-1][j], f[i-1][j-weights[i]] + values[i])
                }
            }
        }
    }
    return f[n-1][W]
}