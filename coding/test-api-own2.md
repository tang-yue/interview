```js
    Object.prototype.myCall = (context, ...args) {
        if(typeof this !== 'function') {
            throw TypeError('error')
        }

        const obj = context || window;
    
        fn = symbol('xxx');

        obj[fn] = this

        let res = obj[fn](...args)
        
        delete obj[fn]

        return res;
    }
```

```js
Object.prototype.myApply = function (context, params = []) {
    if(typeof this !== 'function') {
        // 和 call 是类似的
    }
}
```
bind 实现

```js
Object.prototype.myBind = function(context, ...arg) {
    if(typeof this !== 'function') {
        throw TypeError('error')
    }

    let obj = context || window

    return (...arg2) => {
        this.call(obj, ...arg, ...arg2)
    }
}
```