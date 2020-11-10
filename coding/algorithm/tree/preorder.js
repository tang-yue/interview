const bt = require('./bt');


// const preorder = (root) => {
//     if(!root) { return; }
//     console.log(root.val);
//     preorder(root.left);
//     preorder(root.right);
// }



// 1 2 4 5 3 6 7


// 非递归版

const preorder = (root) => {
    if(!root) { return; }
    const stack = [ root ];
    while(stack.length) {
        const n = stack.pop();    // 后进先出
        console.log(n.val);
        if(n.right) stack.push(n.right);
        if(n.left) stack.push(n.left);
    }
}


preorder(bt)