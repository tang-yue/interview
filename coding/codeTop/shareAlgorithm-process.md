在写笔记过程中，脑袋里思考想法等

注意复杂度里

细细分析下二分查找。先放着继续听。只是先抄录下。

听完这个下面开始倒着听。

归并排序算法复杂度分析：

实现：

```js
function merge(leftArr, rightArr){  
    var result = [];
    console.log('merge:' + leftArr + ';' + rightArr);
    while (leftArr.length > 0 && rightArr.length > 0){  
      if (leftArr[0] < rightArr[0])  
        result.push(leftArr.shift()); //把最小的最先取出，放到结果集中   
      else   
        result.push(rightArr.shift());  
    }   
    return result.concat(leftArr).concat(rightArr);  //剩下的就是合并，这样就排好序了  
}  

function mergeSort(array){  
    if (array.length == 1) return array;  
    var middle = Math.floor(array.length / 2);       //求出中点  
    var left = array.slice(0, middle);               //分割数组  
    var right = array.slice(middle);
    console.log('left:' + left, 'right:' + right); 
    return merge(mergeSort(left), mergeSort(right)); //递归合并与排序  
}  

var arr = mergeSort([32,12,56,78,76,45,36]);
console.log(arr);   // [12, 32, 36, 45, 56, 76, 78]
```

分析：

```js
// 第一步

// return merge(mergeSort([32,12,56]), mergeSort([78,76,45,36]))

// 肯定是会执行前一个 mergeSort 的 

// 第二步
// return merge(merge(mergeSort(32), mergeSort([12,56])), mergeSort([78,76,45,36]));

// 下面第三步

// return merge(merge(32, merge(mergeSort(12), mergeSort(56))), mergeSort(78,76,45,36));

// 第四步

// return merge(merge(32, merge(12, 56)), mergeSort(78,76,45,36));

// 第五步执行了merge内部并排序 [12,56] 内容进行返回

// return merge(merge(32, [12,56]), mergeSort(78,76,45,36))

// 第七步 执行了merge内部并排序 [32,12,56] 内容进行返回

// return merge([12,32,56], mergeSort(78,76,45,36))

// 第八步右边的同理

// 执行了 logn 次 merge，而 mege 里 循环有多少个数就循环多少次的 ===> 时间复杂度为 O(n*logn)
```

可能还要看下我的第一本算法书并记录笔记。

