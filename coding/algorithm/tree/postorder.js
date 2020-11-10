const bt = require('./bt');

// const postorder = (root) => {
//     if(!root) { return; }
//     postorder(root.left);
//     postorder(root.right);
//     console.log(root.val)
// }

// postorder(bt);

// 4 5 2 6 7 3 1

// 非递归版

const postorder = (root) => {
    if(!root) { return; }
    const outputStack = [];
    const stack = [root];
    while(stack.length) {
        const n = stack.pop();
        outputStack.push(n);
        if(n.left) stack.push(n.left);
        if(n.right) stack.push(n.right);
    }

    while(outputStack.length) {
        const n = outputStack.pop();
        console.log(n.val)
    }
}

postorder(bt);

// 思路是先序遍历是根左右，而 后序遍历倒过来是根右左。
// 因此只有利用先序遍历，然后再进行倒序输出就可以了