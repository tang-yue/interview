function binarySearch(arr, target) { 
  let l = 0; r = arr.length - 1;
  while(l <= r) {
    let mid = parseInt((l + r)/ 2); 
    if(arr[mid] === target) return mid;
    if(arr[mid] > target) { 
      r = mid -1;
    } else {
      l = mid + 1;
    }
  }
  return -1;
}

var search = function(nums, target) {
  let low = 0; 
  let high = nums.length - 1;
  while(low <= high) {
      const mid = Math.floor((low + high)/2);
      const element = nums[mid];
      if(element < target) {
          low = mid + 1;   // 这里才是二分查找的关键点吧
      } else if(element > target) {
          high = mid - 1;  // 同理
      } else {
          return mid;
      }
  }
  return -1;
}

// 上述这个二分查找是有问题的，放在leetCode 上试试吧

// console.log(search([2,4,5,6,8,10], 5));

console.log(binarySearch([2,4,5,6,8,10], 5));

// TODO: 
