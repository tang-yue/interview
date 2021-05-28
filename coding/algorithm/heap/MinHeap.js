
class MinHeap {
    constructor() {
        this.heap = [];
    }
    res() {
        return this.heap;
    }
    swap(i1, i2) {
        const temp = this.heap[i1];
        this.heap[i1] = this.heap[i2];
        this.heap[i2] = temp;
    }
    getParentIndex(i) {
        // return Math.floor((i - 1) / 2);  // 获取该节点的父节点的位置
        return (i -1) >> 1
    }
    getLeftIndex(i) {
        return i * 2 + 1;
    }
    getRightIndex(i) {
        return i * 2 + 2;
    }
    shiftUp(index) {
        if (index === 0) { return; }
        const parentIndex = this.getParentIndex(index);
        if (this.heap[parentIndex] > this.heap[index]) {
            this.swap(parentIndex, index);
            this.shiftUp(parentIndex);   // 因为要一直上移，所以这里递归调用
        }
    }
    shiftDown(index) {
        const leftIndex = this.getLeftIndex(index);
        const rightIndex = this.getRightIndex(index);
        if(this.heap[leftIndex] < this.heap[index]) {
            this.swap(leftIndex, index);
            this.shiftDown(leftIndex)
        }
        if(this.heap[rightIndex] < this.heap[index]) {
            this.swap(rightIndex, index);
            this.shiftDown(rightIndex)
        }
    }
    insert(value) {
        this.heap.push(value);
        this.shiftUp(this.heap.length - 1)
    }
    pop() {
        this.heap[0] = this.heap.pop();
        this.shiftDown(0);
    }
    peek() {
        return this.heap[0];
    }
    size() {
        return this.heap.length;
    }
}

const h = new MinHeap();

h.insert(3);
h.insert(2);
h.insert(1);
h.pop();
console.log(h.peek());
console.log(h.size());

console.log(h.res())

/* 
实现最小堆类
实现步骤
1. 在类里，声明一个数组，用来装元素。
2、主要方法：插入、删除堆顶、获取堆顶、获取堆大小。
第一步   插入
1、将值插入堆的底部，即数组的尾部。
2、然后上移：将这个值和它的父节点进行交换，直到父节点小于等于这个插入的值。
3、大小为k的堆中插入元素的时间复杂度O(logk) {主要是上移操作，上移的次数主要是堆的高度，即二叉树的高度，和树节点的数量关系是logn}
第二步 删除堆顶
1、用数组尾部元素替换堆顶 （直接删除堆顶会破坏堆结构）
2、然后下移：将新堆顶和它的子节点进行交换，直到子节点大于等于这个新堆顶
3、log(k)
*/