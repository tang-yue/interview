// 复习数据结构和算法


var findContentChildren = function(g, s) {
    // var sortFunc = function(a,b) {
    //     return a - b;
    // }
    g = g.sort();
    s = s.sort();
    console.log(g, s, 'g s');

    let i = 0;
    s.forEach((v) => {
        if(v >= g[i]) {
            i = i + 1;
        }
    })
    return i;
};

console.log(findContentChildren([10,9,8,7], [5,6,7,8]));



//  分饼干  没过 问题在于 排序

//  打家劫舍  没过

// 对称二叉树 没过

// 翻转二叉树 

// 猜数字大小

// 路径总和

// 最小深度

// 最大深度

// 后序遍历

// 前序遍历

// 两数相加   写的很糟糕，比较麻烦了啦

// 删除重复元素有坑

// 无重复字符的最长子串

// 中序遍历

[[1],[2,3]].map((item, index) => {
    if(index/2 === 1) {
        item = item.reverse();
        console.log(item, item.reverse(), 'hhahah')
    }
   return item;
});


// function func(arr) {
//     arr.map((item, index) => {
//         if(index2 === 1)
//     })
// }


// func();