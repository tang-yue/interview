Array.prototype.binarySearch = function (item) {
    this.sort();

    let low = 0;
    let high = this.length - 1;
    while(low <= high) {
        const mid = Math.floor((low + high)/2);
        const element = this[mid];
        if(element < item) {   // 如果目标值大于中间值
            low = mid + 1;
        } else if (element > item) {  // 如果目标值小于中间值
            high = mid - 1;
        } else {
            return mid;
        }
    }
    return -1;
}

const res = [1,2,3,4,5].binarySearch(1);

console.log(res, 'res res')