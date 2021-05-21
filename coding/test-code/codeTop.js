// var lengthOfLongestSubstring = function(s) {
//   let l = 0;
//   let count = 0;
//   let map = new Map();
//   for(let i = 0; i < s.length; i++) {
//       if(map.has(s[i]) && map.get(s[i]) >= l) {
//           l = map.get(s[i]) + 1
//       }
//        map.set(s[i], i)
//       count = Math.max(count, i - l + 1)
//       console.log(count, 'count count', i, l)
//   }
//   return count;
// };

// import { createContext } from "react";

// lengthOfLongestSubstring(" ");


// var merge = function(nums1, m, nums2, n) {
//   nums1.length = m;
//   nums2.length = n;
//   nums1 = nums1.concat(nums2);
//   console.log(nums1)
//   return nums1.sort();
// };

// merge([1,2,3,0,0,0], 3, [2,5,6], 3);



// var compareVersion = function(version1, version2) {
//   let vs1 = version1.split('.');
//   let vs2 = version2.split('.');
//   let len = vs1.length > vs2.length ? vs1.length : vs2.length;

//   for(let i = 0; i < len; i++) {
//     let vs1_v = vs1[i] || 0;
//     let vs2_v = vs2[i] || 0;

//     console.log(parseInt(vs1_v), parseInt(vs2_v), '-----');

//     if(parseInt(vs1_v) > parseInt(vs2_v)) {
//       return 1;
//     } else if(parseInt(vs1_v) < parseInt(vs2_v)) {
//       return -1;
//     }
//   }
//   return 0;
// };

// console.log(compareVersion("7.5.2.4", "7.5.3"));

// console.log(compareVersion("7.5.2.4", "7.5.3"));

// 写一下你的输出结果

// a b c d e f g k i

// 一个层级的要放在一个数组里面。

// var levelOrder = function(root) {
//   if(!root) return [];
//   // 手敲一遍
//   let q = [[root, 0]];
//   const res = [];
//   while(q.length) {
    
//   }
// }

// 徒手抄一遍 ，要不然呢

// var restoreIpAddresses = function (s) {
//   let res = [];
//   // 下述代码根本就看不懂啊
//   let dfs = (cur, start) => {  
//     if(cur.length === 4 && start >= s.length) { // 长度为4能够理解
//       res.push(cur.join('.'));
//       return;
//     }
//     if(cur.length === 4 && start != s.length) return; // 这一步难道不是多此一举吗？
//     for(let k = 1; k <=3; k++) {
//       // 如果取的范围超过了字符串长度，直接剪掉
//       if(start+k-1 >= s.length) return;
//       // 切割字符串

//     }
//   }
// }

// 往后的都好难，我都不想刷了

// var permute = function(nums) {
//   // 默写一遍吧，我好像间接性的能够明白一点了
//   const res = [];
//   const backtrack = (path) => {
//       if(path.length === nums.length) {
//           console.log('这里难道只执行了一次');
//           res.push(path);
//           return;
//       }
//       nums.forEach((n) => {
//           if(path.includes(n)) return;
//           path.push(n);
//           console.log(path, 'path path');
//           backtrack(path);
//       })
//   }
//   backtrack([])
//   return res;
// };

// console.log(permute([1,2,3]));

// 抄写一遍复制 ip

// 这个思路相对是比较清晰的，抄写一遍，明天复习

// var restoreIpAddresses = function (s) {
//   const result = []

//   function permute(arr, str) {
//     if(arr.length === 3) {
//       if(isValid(str)) result.push([...arr, str]);
//       return;
//     }

//     for(let i = 1; i < 4; i++) {
//       let subStr = str.slice(0, i);
//       if(!isValid(subStr)) continue;
//       permute([...arr, subStr], str.slice(i));
//     }
//   }

//   function isValid(str) {
//     if(+str > 255 || !str.length) return false;
//     if(str.length >= 2 && str[0] === '0') return false;
//     return true;
//   }

//   permute([], s);

//   return result.map(x => x.join('.'))
// }

// console.log(restoreIpAddresses("25525511135"))


// var uniquePaths = function(m, n) {

//       var count = 0;
      
//       var backtrack = (path) => {
           
//           if(path.length === m + n -2) {
//             let s = 0, p = 0;

//           path.forEach(n => {
//             if(n === 1) {
//               s ++
//             } else {
//               p ++;
//             }
//           })
//           if(p === m -1 && s === n -1) count ++;
//            return;
//           }
          
//           backtrack(path.concat(0))
//           backtrack(path.concat(1))
//       }

//       backtrack([]);
//       return count;
// }

// var uniquePaths = function(m, n) {
//   var count = 0; 
//   var backtrack = (path, i, j) => {
       
//       if(path.length === m + n -2) {
//          if(i === m -1 && j === n -1) { count++; return; }
//       }
//       backtrack(path.concat(0), i+1, j)
//       backtrack(path.concat(1), i, j+1)
      
//   }

//   backtrack([], 0, 0);
//   return count;
// }

// console.log(uniquePaths(3,2));


// [0,1].forEach((n) => {
//   console.log(n);
// })

// 我要抓狂了，不会写啊

// 我想不出来还有什么办法啦

// var uniquePaths = function(m, n) {
//   const res = [];
//   for(let i = 0; i < n; i++) {
//       res.push([...new Array(m).fill(1)]);
//   }
//   for(let i = 1; i < n; i++) {
//     for(let j = 1; j < m; j++) {
//       res[i][j] = res[i-1][j] + res[i][j-1]
//     }
//   }
  
//   return res[n-1][m-1]
// }

// uniquePaths(3,2);

// var findLength = function(A, B) {
//   let res = [];
//   let new_B = [].concat(B)
//   A.forEach((n) => {
//     let  i = new_B.indexOf(n);
//     if(i > -1) {
//       res.push(n);
//     }
//     new_B.splice(i, 1);
//   })
//   return res;
// };

// console.log(findLength([0,0,0,0,0], [0,0,0,0,0]))

// var findLength = function(A, B) {
//   const dp = [...Array(A.length+1)].map(() => Array(B.length+1).fill(0));
//   let maxLen = 0;
  
//   for(let i = 1; i <= A.length; i++) {
//       for(let j = 1; j <= B.length; j++) {
//           if(A[i-1] === B[j-1]) {
//               dp[i][j] = dp[i-1][j-1] + 1;
//               maxLen = Math.max(maxLen, dp[i][j]);
//           }
//       }
//   }
//   return maxLen;
// };

// console.log(findLength([1,0,0,0,0], [0,0,0,0,1]))

// 要求连续的话，这个要求就有点高了

// 写成  js 版  然后运行一下，看下执行顺序

// var findLength = function (A, B) {
//   return A.length < B.length ? findMax(A, B) : findMax(B, A)
// }

// var findMax = function (A, B) {
//   let max = 0;
//   let an = A.length, bn = B.length;
//   for(let k = 1; k <= an; k++) {
//     max = Math.max(max, maxLen(A, 0, B, bn - k, k));
//   }
//   for(let j = bn - an; j >= 0; j--) {
//     max = Math.max(max, maxLen(A, 0, B, j, an));
//   }
//   for(let i = 1; i < an; i++) {
//     max = Math.max(max, maxLen(A, i, B, 0, an - i));
//   }
//   return max;
// }

// var maxLen = function (a, i, b, j, len) {
//   let count = 0, max = 0;
//   for(let k = 0; k < len; k++) {
//     if(a[i+k] === b[i+k]) {
//       count++
//     } else if (count > 0) {
//       max = Math.max(max, count);
//       count = 0;
//     }
//   }
//   return count > 0 ? Math.max(max, count) : max;
// }

// 为什么 java 版改成 js 版，改都能改错了呢


// var findLength = (A, B) => {
//   const m = A.length;
//   const n = B.length;
//   let dp = [];
//   for(let i = 0; i <= m; i++) {
//     dp.push(new Array(n+1).fill(0))
//   }
//   let res = 0;

//   for(let i = 1; i <= n; i++) {
//     for(let j = 1; j <= m; j++) {
//       if(A[i-1] === B[j-1]) {
//         dp[i][j] = dp[i-1][j-1] + 1;
//         res = Math.max(res, dp[i][j])
//       }
//     }
//   }
//   return res;
// }


// console.log(findLength([1,0,0,0,0], [0,0,0,0,1]));


// var getIntersectionNode = function(headA, headB) {
//   // 同时遍历A和 同时遍历 B，如果A里面的某个值和B里面的某个值相等，那么返回该节点
// }


// var getIntersectionNode = function(headA, headB) {
//   const l3 = new ListNode(0);
//   let p1 = headA;
//   let p2 = headB;
//   let p3 = l3;
//   while(p1) {
//       const v1 = p1.val;
//       while(p2) {
//           const v2 = p2.val;
//           if(v1 === v2) {
//               l3.next = new ListNode(v1);
//           }
//           if(p2) p2 = p2.next;
//       }
//       if(p1) p1 = p1.next;
//   }
//   return p3.next;
// }

// 上述没有传参，我怎么知道

// 圆圈中最后剩下的数字

// 将c++版改成 js 版

// function f(n, m) {
//   if(n === 1) { return 0 }
//   let x = f(n-1, m);
//   return (m + x) % n;
// }

// function lastRemaining(n, m) {
//   return f(n, m);
// }


// var climbStairs = function(n) {
//   let dp = [1,1];

//  for(let i = 2; i <= n; i++) {
     
//      dp[i] = dp[n-1] + dp[n-2]
//  }
//  console.log(dp, 'dp')
//  return dp[n]
// };

// climbStairs(3)

// 根据java代码 // 书写下 js 代码

function threeSum(nums) {
  let n = nums.length;
    Array.sort(nums);
  let ans = []
  for(let first = 0; first < n; first++) {
    if(first > 0 && nums[first] === nums[first -1]) {
      continue;
    }
    // 第三个数对应的指针初始化指向数组的最右端
    let third = n - 1;
    let target = -nums[first];
    // 枚举 b
    for(let second = first + 1; second < n; second++) {
      // 需要和上一次枚举的数不相同
      if(second > first + 1 && nums[second] == nums[second -1]) {
        continue;
      }
      // 需要保证 b 的指针在 c 的指针的左侧
      while(second < third && nums[second] + nums[third] > target) {
        --third;
      }
      // 如果指针重合，随着 b 后续的增加
      // 就不会有满足 a + b + c = 0 并且 b < c 的 c 了，可以退出循环
      if(second == third) {
        break;
      }
      if(nums[second] + nums[third] === target) {
        ans.push([nums[first], nums[second], nums[third]]);
      }
    }
  }
  return ans;
}

