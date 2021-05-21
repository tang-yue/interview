// // // 可枚举属性

// // let obj = { a: 1 } 

// // // 不可枚举属性
// // Object.defineProperty(obj, 'b', {
// //     enumerable: false,
// //     value: 2
// // })

// // // 添加原型链属性
// // Object.prototype.c = 3

// // 下面用三种方法进行测试

// // for(var key in obj) {
// //     console.log(key, obj[key])  //
// // }


// // console.log(Object.keys(obj))


// // console.log(Object.getOwnPropertyNames(obj))


// var obj1 = {}

// Object.defineProperties(obj1, {
//     property1: {
//         value: 'property1',
//         enumerable: true,
//         configurable: false,
//         writable: true
//     }
// })


// obj1.property1 = 'a'


// for(var key in obj1) {
//     console.log(key, obj1[key])
// }


// var obj = {}

// console.log(obj instanceof Object, 'result result')


// function instanceof1(L, R) {
//     const O = R.prototype;
//     L = L.__proto__;
//     while(true) {
//         if(L === null) {
//             return false;
//         }
//         if(L === O) {
//             return true
//         }
//         L = L.__proto__
//     }
// }


// let arr = ['aaaa', 'bbb', 'cc', 'rrr', 'dd', 'da']

// const res = arr.sort((a,b) => {
//     if(a.length > b.length) {
//         return 1;
//     }
//     if(a.length < b.length) {
//         return -1;
//     }
//     if(a.length === b.length) {
//         for(var s in a) {
//             if(a.charCodeAt(s) > b.charCodeAt(s)) {
//                 return 1;
//             } else {
//                 return -1;
//             }
//             return 0;
//         }        
//     }
// })

// console.log(res, 'res res')


// let strArr = [];
// let numArr = [];

// function getRes(str) {
//     for(var s of str) {
//         if(strArr.includes(s)) {
//             let i = strArr.indexOf(s);
//             numArr[i] ++;
//         } else {
//             strArr.push(s);
//             numArr.push(1);
//         }
//     }
//     let resObj = []

//     numArr.map((item, index) => {
//         resObj.push({str: strArr[index], num: item})
//     })

//     resObj.sort((a,b) => b.num - a.num)
    
//     return resObj[0]
// }

// console.log(getRes('aaaabbaa'))

// 数字千分位，并且是保留小数的

// 123,456.23

// 110000.34

// function transformNum(num) {
//     // 如果有小数，要保留小数
//     // 转成 string
//     let strNum = num.toString();
//     let index = strNum.indexOf('.');

//     // 末尾数是.34
//     let rightStr = strNum.slice(index);

//     // 前面的进行分割
//     let leftStr = strNum.slice(0, index);
//     let leftArr = leftStr.split('').reverse();

//     // 每隔三位加一个逗号，并且还要是倒过来的
//     let str = ''

//     for(let i = 0; i < leftArr.length; i++) {
//         if((i+1)%3 === 0 && i !== leftArr.length -1) {
//             str = str + leftArr[i] + ','
//         } else {
//             str = str + leftArr[i]
//         }
//     }

//     return str.split('').reverse().join('') + rightStr
// }

// console.log(transformNum(23456123456.23))

// function transformNum1(num) {
//     let parts = num.toString().split('.');
//     parts[0] = parts[0].replace(/\B(?=(\d{3})+$)/g, ',')
//     return parts.join('.')
// }

// console.log(transformNum1(23456123456.23))


// 最长不含重复字符的子字符串

// 'abcdefgeeegbeedgef'

// function getRes(str) {
//     let arr = [];
//     let lenObjArr = []

//     for(let s of str) {
//         if(arr.includes(s)) {
//             lenObjArr.push(arr.join(''))
//             arr = []
//         } else {
//             arr.push(s)
//         }
//     }
//     lenObjArr.push(arr.join(''))

//     lenObjArr.sort((a,b) => b.length - a.length)

//     return lenObjArr[0]
// }

// console.log(getRes('abcdefgeeegbeedgef'))



// var isPalindrome = function(s) {
//     const str =  s.replace(/[^0-9a-zA-Z]+/g, '').toLowerCase();
//     const len = str.length;
    
//     for(let i = 0;  i < parseInt(len/2); i++) {
//         if(str[i] !== str[len - i -1]) {
//             let arr = str.split('');
//             let arr2 = str.split('');

//             arr.splice(i, 1)
//             arr2.splice(len - i - 1, 1)

//             return arr.join('') === arr.reverse().join('') || arr2.join('') === arr2.reverse().join('')
//         }
//     }
//     return true;
// }

// console.log(isPalindrome('abbaa'))


// abbaa

// 1

// 5 - 1 - 1


    //    abcrba

    //    6/2 ===== 3

    //    c     6- 2 -1 

    //    3

// 1 2 3 4 
// len = 5
// 5 - 1 - 2 === 1
// for(let i = 0; i < parseInt(2); i++) {
//     s.length -1-i
// }
// console.log(5/2, '5/2 5/2')

// function func() {

// }
// const f = new func()

// console.log(f.__proto__.constructor === func, 'xxxx')

// console.log(f.__proto__ === func.prototype);

// console.log(func.__proto__ === Function.prototype)

// console.log(func.prototype.__proto__ === Object.prototype)

// console.log(Object.prototype.__proto__ === null)

class A {
    constructor() {
        this.a = 'aaa'
    }
}

class B extends A {
    constructor() {
        super()
        this.b = 'bbb'
    }
}

let obj = new B();

console.log(obj.a, obj.b, 'obj.a obj.b')







