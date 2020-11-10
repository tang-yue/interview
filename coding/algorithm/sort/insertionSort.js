Array.prototype.insertionSort = function () {
    for(let i = 1; i < this.length; i++) {
        const temp = this[i];
        let j = i;
        while(j > 0) {
            if(this[j-1] > temp) {
                this[j] = this[j-1];  // j-1 位置上的值往后移
            } else {
                break;
            }
            j -= 1;
        }
        this[j] = temp;  // 拿到的j就是我们要插入的位置
    }
    console.log(this, 'this this')
}

const arr = [5,2,4,3,1];
arr.insertionSort();