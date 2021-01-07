1. 合并两个有序数组

解法如下：

```js
const merge = (nums1, m, nums2, n) => {
    let index1 = m - 1;
    let index2 = n - 1;
    let tail = m + n - 1;

    while (index1 >= 0 && index2 >= 0) {
        if (nums1[index1] > nums2[index2]) {
            nums1[tail] = nums1[index1];
            index1--;
        } else {
            nums1[tail] = nums2[index2];
            index2--;
        }
        tail--;
    }
    while (tail >= 0 && index1 >= 0) {
        nums1[tail] = nums1[index1];
        index1--;
        tail--;
    }
    while (tail >= 0 && index2 >= 0) {
        nums1[tail] = nums2[index2];
        index2--;
        tail--;
    }
};
```

2. 数组中相加和为0的三元组

```js
function threeSum( num ) {
    // write code here
    let res = [];
  // 先排序
  num.sort((a, b) => a - b);
  let len = num.length;
  // console.log(JSON.stringify(num), len);
  // 先确定一个数
  for (let i = 0; i < len - 2; i++) {
    // 第二个数，方向往后面移动
    let head = i + 1;
    // 第三个数，方向往前面移动
    let tail = len - 1;
    // 相遇判定，退出条件
    while (head < tail) {
      let sum = num[i] + num[head] + num[tail];
      // 如果结果太大，尾部收缩
      if (sum > 0) tail--;
      // 如果结果太小，头部推进
      else if (sum < 0) head++;
      // 相等则写入结果并去重
      else {
        res.push([num[i], num[head], num[tail]]);
        // 头部去重（如果后面一个数跟当前的数字相等，则代表有重复的结果生成，跳过）
        while (head + 1 < tail && num[head + 1] === num[head]) head++;
        // 尾部去重（如果前面一个数跟当前的数字相等，则代表有重复的结果生成，跳过）
        while (tail - 1 > head && num[tail - 1] === num[head]) tail--;
        // 继续往后推进
        head++;
        // 继续往前推进
        tail--;
      }
    }
    // 为什么是 < len - 2 是因为最少要三个数组合
    while (i < len - 2 && num[i + 1] === num[i]) i++;
  }
  return res;
}
``` 

3. 二分查找  有重复的情况

```js
function upper_bound_( n ,  v ,  a ) {
    // write code here
    let l = 0;
    let r = n -1;
    while(l < r) {
       let mid = Math.floor((l+r)/2);
       let ele = a[mid];
       if(v <= ele) {
          if(mid === 0 || a[mid -1] < v) return mid + 1;
          else r = mid;
       } else {
          l = mid + 1;
       }
    }
    return n + 1;
}
```

4. 实现二叉树先序，中序和后序遍历

```js
function threeOrders(root) {
     if (!root) {
        return root;
    }
    //三个数组分别对应，前序、中序、后序结果
    let arr1 = [],
        arr2 = [],
        arr3 = [];
    //递归进行遍历
    const recur1 = root => {
        if (root) {
            arr1[arr1.length] = root.val;
            recur1(root.left);
            arr2[arr2.length] = root.val;
            recur1(root.right);
            arr3[arr3.length] = root.val;
        }
    }
    //调用递归
    recur1(root);
    //利用剩余表达式复制数组中值，返回结果
    return [
        [...arr1],
        [...arr2],
        [...arr3]
    ];
}
```

5. leetCode 15 三数之和

```js
var threeSum = (nums) => {
  nums.sort((a, b) => a - b); // 排序

  const res = [];

  for (let i = 0; i < nums.length - 2; i++) { // 外层遍历
    let n1 = nums[i];
    if (n1 > 0) break; // 如果已经爆0，不用做了，break
    if (i - 1 >= 0 && n1 == nums[i - 1]) continue; // 遍历到重复的数，跳过    

    let left = i + 1;            // 左指针
    let right = nums.length - 1; // 右指针

    while (left < right) {
      let n2 = nums[left], n3 = nums[right];

      if (n1 + n2 + n3 === 0) {  // 三数和=0，加入解集res
        res.push([n1, n2, n3]);
        while (left < right && nums[left] == n2) left++; // 直到指向不一样的数
        while (left < right && nums[right] == n3) right--; // 直到指向不一样的数
      } else if (n1 + n2 + n3 < 0) { // 三数和小于0，则左指针右移
        left++;
      } else {      // 三数和大于0，则右指针左移
        right--;
      }
    }
  }
  return res;
};
```