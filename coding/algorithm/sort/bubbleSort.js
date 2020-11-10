Array.prototype.bubbleSort = function () {
    for (let i = 0; i < this.length -1; i++) {
        for (let j = 0; j < this.length -1 - i; j ++) {
            if(this[j] > this[j+1]) {
                const temp = this[j];
                this[j] = this[j+1];
                this[j+1] = temp;
            }
        }
    }
    console.log(this);  // 升序排序
}

const arr = [5,4,3,2,1];
arr.bubbleSort();