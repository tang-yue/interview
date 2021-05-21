// leetCode 刷起来

// 先从栈开始

// leetCode 20.有效的括号

var isValid = function(s) {
    if(s.length < 2) return false;
    let stack = [];
    let l = ['(', '[', '{'];
    let r = [')', ']', '}'];

    for(var v of s) {
        if(l.includes(v)) {
            stack.push(v);
        } else if(r.includes(v)) {
            if(v !== r[l.indexOf(stack[stack.length-1])]) {
                return false;
            } else {
                stack.pop();
            }
        }
    }
    return stack.length === 0 ;
};

console.log(isValid('()'));

// 经过修改过过过

// leetCode 144. 二叉树的前序遍历

// 前： 根左右
// 中： 左根右
// 后： 左右根

// 先访问根节点
// 然后递归遍历所有左节点
// 然后递归遍历所有右节点

var preorderTraversal = function(root) {
    let stack = [root];
    let res = [root.val];
    let n;
    while(stack) {
        n = stack.pop();   
        res.push(n.val);
        if(n.right) stack.push(n.right);
        if(n.left) stack.push(n.left);
    }
    return res;
}

// 队列
// 933. 最近的请求次数，先放过

// 链表部分

// leetCode 237. 删除链表中的节点

var deleteNode = function(node) {
    node.val = node.next.val;
    node.next = node.next.next;
}

// leetCode 206.  反转链表
// 需要看下视频进行理解， 默写一遍吧
// 重新默写一遍，默写默写一遍
var reverseList = function(head) {
    let p1 = head;
    let p2 = null;
    while(p1) {
        const temp = p1.next;
        p1.next = p2;
        p2 = p1;
        p1 = temp;
    }
    return p2;
}

// leetCode 2 两数相加
// 如何去考虑两数相加的和大于10，然后要进1
// 重新默写一遍吧

var addTwoNumbers = function(l1, l2) {
    const l3 = new ListNode(0);
    let p1 = l1;
    let p2 = l2;
    let p3 = l3;
    let curry = 0;
    while(p1 || p2) {
        let val1 = p1 ? p1.val : 0;
        let val2 = p2 ? p2.val : 0;
        let val = val1 + val2 + curry;
        curry = Math.floor(val/10);
        p3.next = new ListNode(val%10);
        if(p1) p1 = p1.next;
        if(p2) p2 = p2.next;
        p3 = p3.next;
    }
    if(curry) {
        p3.next = new ListNode(curry);
    }
    return l3;
}

// leetCode 83 删除排序链表中的重复元素

var deleteDuplicates = function(head) {
    // 给定的是一个排序列表
    let p1 = head;
    while(p1 && p1.next) {
        if(p1.val === p1.next.val) {
            p1.next = p1.next.next;
        } else {
            p1 = p1.next;
        }
    }
    return head;
}

// leetCode 141 环形链表

var hasCycle = function(head) {
    let p1 = head;
    let p2 = head;
    while(p1 && p2 && p2.next) {
        p1 = p1.next; // 走一步
        p2 = p2.next.next; // 走两步
        if(p1 === p2) {
            return true;
        }
    }
    return false;
}

// leetCode 349 两个数组的交集 简单

// 二叉树的先，中，后，层序遍历

// 先序遍历 根左右

function preOrder(root) {
    if(!root) return;
    let stack = [root];
    let n;
    if(stack) {
        n = stack.pop();
        console.log(n.val);
        if(n.right) stack.push(n.right);
        if(n.left) stack.push(n.left);
    }
}

// 中序遍历 左根右，就是比以前多了一个p

    //         1
    //     2     3
    //  4    5  6   7

function midOrder(root) {
    let stack = [];
    let p = root;
    while(stack.length || p) {
        while(p) {
            stack.push(p);
            p = p.left;
        }
        const n = stack.pop();
        console.log(n.val);
        p = n.right;
    }
}

// 后序遍历 左右根   ===> 前序遍历是根左右

 //           1
    //     2     3
    //  4    5  6   7

// 其实挺简单的

function postOrder(root) {
    if(!root) return;
    let stack = [root];
    let outStack = [];
    while(stack.length) {
        n = stack.pop();
        outStack.push(n);
        if(n.left) stack.push(n.left);
        if(n.right) stack.push(n.right);
    }
    while(outStack.length) {
        const p = outStack.pop();
        console.log(p.val);
    }
}

// leetCode 144 层序遍历  用第一种方法吧
// 先广度优先遍历，然后记录节点值

function levelOrder(root) {
    if(!root) return [];
    let q = [root, 0];  // 后面一个值表示层级
    let res = [];
    while(q.length) {
        const [n, level] = q.shift();
        if(!res[leve]) {
            res.push([n.val])
        } else {
            res[level].push(n.val);
        }
        if(n.left) q.push(n.left, level + 1);
        if(n.right) q.push(n.right, level + 1);
    }
    return res;
}

// leetCode 104 二叉树的最大深度
// 用深度优先遍历

var maxDepth = function(root) {
    if(!root) return 0;
    let max = 0;
    const dfs = (n, l) => {
        if(!n.left && !n.right) {  // 这两个都存在
            max = Math.max(max, l);
        }
        if(n.left) dfs(n.left, l + 1);
        if(n.right) dfs(n.right, l + 1);
    }
    dfs(root, 1);
    return max;
}

// leetCode 111 二叉树的最小深度
// 采用广度优先遍历

var minDepth = function(root) {
    if(!root) return 0;
    let q = [[root, 0]];
    while(q.length) {
        let [n, l] = q.shift();
        if(!n.left || !n.right) {
            return l;
        }
        if(n.left) q.push([n.left, l + 1])
        if(n.right) q.push(n.right, l + 1)
    }
}

// leetCode 21 合并两个有序链表

// 374 猜数字大小

// leetCode 226 翻转二叉树
// 默写一遍吧

function invertTree(root) {
    if(!root) { return null }
    return {
        val: root.val,
        left: invertTree(root.right),
        right: invertTree(root.left)
    }
}

// leetCode 100 相同的树
// 默写一遍吧

var isSameTree = function(p, q) {
    if(!p && !q) return true;
    if(p && q && p.val === q.val &&
        isSameTree(p.left, q.left) &&
        isSameTree(p.right, p.right)) {
            return true;
        }
    return false;
}

// leetCode 101 对称二叉树
// 和相同的树比较类似

var getRes = function(root) {
    if(!root) return false;
    const isMirror = (l, r) => {
        if(!l && !r && l.val === r.val
        && isMirror(l.left, r.left)
        && isMirror(l.right, r.right)) {
            return true;
        }
        return false;
    }
    isMirror(root.left, root.right);
}

// 70.爬楼梯  
// 递归超时了，请改用另一种方法动态规划方法

var climbStairs = function(n) {
    let result = [];
    result[1] = 1;
    result[2] = 2;
    for(let i = 3; i <= n; i++) {
        result[i]  = result[i-1] + result[i-2]
    }
    return result[n];
}

// 198. 打家劫舍

var rob = function(nums) {
    if(nums.length === 0) return 0;
    let res = [0, nums[0]];
    for(i = 2; i <= nums.length; i++) {
        res[i] = Math.max(res[i-2] + nums[i-1], res[i-1])
    }
    return res[nums.length];
};

// 有点不太理解

