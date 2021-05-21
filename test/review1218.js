// 整理面试题

// 实现一个sleep函数

async function sleep(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, time)
    })
}

// 数组的交集和并集

// 手写jsonp 

// 使用promis限制并发

// 找出数组中最大的连续子数组和

// 怎么实现一个dialog 组件 ？

// 讲lazyloader的实现原理

// 用 docker 做了什么

// 用 webpack 做了什么

// setImmdiate 和 process.nextTick

// 设计一个单点登录系统，类似阿里系的那样

// css3 的 transtion 和 animation

// vue 如何抽取公共模块

// 如何实现一个可设置过期时间的 localStorage

// 如何实现一个联想搜索组件

// es5和es6继承的区别

// webpack 如何配置多入口文件

// let bar = {
//     a: 'a'
// }

// let bar2;
// let bar3;

// bar3 = bar2 = bar;

// bar2.a = 'aaaaaa';

// console.log(bar.a)

// leetCode 64;  最小路径和


// 40 道 this 面试题 最后的8

// 题目一 分析

var name = 'window';
var person1 = {
    name: 'person1',
    foo1: function () {
        console.log(this.name)
    },
    foo2: () => console.log(this.name),
    foo3: function () {
        return function () {
            console.log(this.name)
        }
    },
    foo4: function () {
        return () => {
            console.log(this.name)
        }
    }
}

var person2 = { name: 'person2' };


function getDis(A) {
    // let min = nums[0];
    // let max = 0;
    // for(let i = 1; i < nums.length; i++) {
    //     min = min < nums[i] ? min : nums[i];
    //     max = Math.max(max, nums[i] - min);
    // }
    // return max;

    let dp = [];
    dp[0] = 0; //不持股
    dp[1] = -A[0]; //持股
    for(let i = 1; i < A.length; i++){
        dp[0] = Math.max(dp[0], dp[1]+A[i]);
        dp[1] = Math.max(dp[1], -A[i]);
    }
    return dp[0];
}


console.log(getDis([10,5,4]));

// 没有规划的话，就会很容易导致浪费时间

//

// 手写 jsonp

let jsonp = function (url, data = {}, callback) {
    // 转化数据为url字符串形式
    let dataStr = url.indexOf('?') === -1 ? '?' : '&';
    for(let key in data) {
        dataStr += `${key}=${data[key]}&`
    }

    let cb_name = 'jsonpCallback'
    dataStr += 'callback=' + cb_name

    // 创建script标签并添加src属性值
    
    let scriptBody = document.createElement('script');

    scriptBody.src = url + dataStr;

    window[cb_name] = function(data) {
        callback(data);
        document.body.removeChild(scriptBody)
    }
    // append 到页面， 添加到页面就立刻发起请求
    document.body.appendChild(scriptBody)
}




