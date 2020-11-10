Array.prototype.quickSort = function () {
    const rec = (arr) => {
        if (arr.length === 1) { return arr; }
        const left = [];
        const right = [];
        const mid = arr[0];
        for(let i = 1; i < arr.length; i++) {
            if(arr[i] < mid) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }
        return [...rec(left), mid, ...rec(right)]
    }
    const res = rec(this);
    res.forEach((n, i) => { this[i] = n })
    console.log(this);
};

const arr = [ 2, 4, 5, 3, 1];

arr.quickSort();