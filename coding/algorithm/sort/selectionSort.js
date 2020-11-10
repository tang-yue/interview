Array.prototype.selectionSort = function () {
    for(let i = 0; i < this.length -1; i++) {
        let indexMin = i;
        for(let j = i; j < this.length; j++) {
            if(this[j] < this[indexMin]) {
                indexMin = j;
            }
        }
        if(indexMin !== i) {
            const temp = this[i];
            this[i] = this[indexMin];
            this[indexMin] = temp;
        }
    }
    console.log(this, 'this')
}

const arr = [5,4,3,2,1];
arr.selectionSort();