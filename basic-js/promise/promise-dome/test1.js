const PENDING = 'pending';

const FULFILLED = 'fulfilled';

const REJECTED = 'rejected';


new Promise((resolve, reject) => {
    resolve()
    reject()
    // 
})

class Promise {
    constructor(fn) {
        this.state = PENDING;
        this.value = null;
        this.reason = null;
        // 成功态回调队列
        this.onFulfilledCallbacks = [];
        // 拒绝态回调队列
        this.onRejectedCallbacks = [];

        // 成功态回调
    }
}