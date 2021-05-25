// function binarySearch(arr, target) { 
//   let l = 0; r = arr.length - 1;
//   while(l <= r) {
//     let mid = parseInt((l + r)/ 2); 
//     if(arr[mid] === target) return mid;
//     if(arr[mid] > target) { 
//       r = mid -1;
//     } else {
//       l = mid + 1;
//     }
//   }
//   return -1;
// }

// var search = function(nums, target) {
//   let low = 0; 
//   let high = nums.length - 1;
//   while(low <= high) {
//       const mid = Math.floor((low + high)/2);
//       const element = nums[mid];
//       if(element < target) {
//           low = mid + 1;   // 这里才是二分查找的关键点吧
//       } else if(element > target) {
//           high = mid - 1;  // 同理
//       } else {
//           return mid;
//       }
//   }
//   return -1;
// }

// 上述这个二分查找是有问题的，放在leetCode 上试试吧

// console.log(search([2,4,5,6,8,10], 5));

// console.log(binarySearch([2,4,5,6,8,10], 5));

// TODO: 

// function intToString(num) {
//   let s = '';
//   while(num) {
//     s += num%10;
//     num = parseInt(num/10, 10);
//   }
//   return s;
// }

// console.log(intToString(123));

// function pow(x, n) {
//   if(n === 0) { return 1}
//   let t = pow(x, n/2); // 感觉这里根本就是有问题的
//   // console.log(t, 't tttttt')
//   if(n % 2) {
//     return x * t * t
//   } else {
//     return t * t;
//   }
// }

// console.log(pow(2, 2));

// 上述的pow 函数真是奇怪

// 先过掉

// function f(n) {
//   if(n === 0) return 1;
//   return f(n-1) + f(n-1);
// }

// console.log(f(6), '666666');

// f(0)  1
// f(1)  2
// f(2)  4
// f(3)  8

// 

// f(4)

// f(1) f(2)
// 2      4  

// 为什么归并排序是 n * logn 呢？

// 首先应该找到是如何实现的吧。

// 参考文章： https://bbs.huaweicloud.com/blogs/163588#:~:text=%E4%BA%86%E8%A7%A3%E5%BD%92%E5%B9%B6%E6%8E%92%E5%BA%8F%E7%9A%84%E5%BA%94%E8%AF%A5,%E5%BA%8F%E5%88%97%E4%B8%8D%E5%90%8C%E8%80%8C%E4%BA%A7%E7%94%9F%E6%B3%A2%E5%8A%A8%E3%80%82

// 提取有效信息。

// 进度太慢怎么办

// 1/2   1/4  1/8  1/16    // logn

// 1/2 

// 用手写的状态写一下

// [1,4,6,7,9]

// return merge(merge)

// 打断点看下是如何执行的

function merge(leftArr, rightArr){  
  var result = [];
  // console.log('merge:' + leftArr + ';' + rightArr);
  while (leftArr.length > 0 && rightArr.length > 0){ // left he 
    if (leftArr[0] < rightArr[0])  
      result.push(leftArr.shift()); //把最小的最先取出，放到结果集中   
    else   
      result.push(rightArr.shift());  
  }   
  return result.concat(leftArr).concat(rightArr);  //剩下的就是合并，这样就排好序了  
}  

function mergeSort(array) {  
  if (array.length == 1) return array;  
  var middle = Math.floor(array.length / 2);       //求出中点  
  var left = array.slice(0, middle);               //分割数组  
  var right = array.slice(middle);
  console.log('left:' + left, 'right:' + right);
  return merge(mergeSort(left), mergeSort(right)); //递归合并与排序  
}  

// var arr = mergeSort([32,12,56,78,76,45,36]);
// console.log(arr);   // [12, 32, 36, 45, 56, 76, 78]

// 看了半天归并排序没有理解如何执行的。疯了

// 徒手写执行过程

// 直接执行merge

// console.log(merge([1], [32,12,56,78,76,45,36]));

// moveZeroes

// var moveZeroes = function(nums) {
//   let len = nums.length;
//   // 原nums
//   // let origin_nums = [].concat(nums);
//   let count = 0;

//   for(var i = 0; i < len; i++) {
//     // console.log(i, nums[i]);
//     // console.log(i, 'ii')
//     // i - count;
//     if(nums[i - count] === 0) {
      
//       // console.log(i, 'i', count, nums)
//       nums.splice(i-count, 1);
//       nums.push(0);
//       count++;
//       // i = i - 1;
//       // console.log(nums, 'nums')
//       // nums.splice(i,1);
//     }
//   }
//   return nums;
// }
// 我想不出答案了

// var moveZeroes = function(nums) {
//   let k = 0;
//   for(let i = 0; i < nums.length; i++) {
//     if(nums[i]) {
//       nums[k++] = nums[i]
//     }
//   }
//   for(let i = k; i < nums.length; i++) {
//     nums[i] = 0;
//   }
//   return nums;
// }

// console.log(moveZeroes([0,1,0,0,1]));

// 心静，要静下心。
// 脑袋里面是有杂念啊，

// 167 Two Sum II

// var twoSum = function(numbers, target) {
//   let l = 0, r = numbers.length - 1;
//   while(l < r) {
//     if(numbers[l] + numbers[r] === target) {
//       return [l +1, r + 1]
//     } else if(numbers[l] + numbers[r] > target) {
//       r--
//     } else {
//       l++;
//     }
//   }
// }

// 无重复字符的最长子串

var lengthOfLongestSubstring = function(s) {
  let map = new Map();
  let max = 0, l = 0; // 左边是从0 开始的
  for(let i = 0; i < s.length; i++) {
    if(map.has(s[i]) && map.get(s[i]) >= l) {   // 此时表示已经存在了// 那么我要走什么样的逻辑呢
      l = map.get(s[i]) + 1;
    }
    max = Math.max(max, i - l +1);
    map.set(s[i], i)
  }
  return max;
}

console.log(lengthOfLongestSubstring('pwwkew'));

// 第四章还没听完，，，哭泣中



