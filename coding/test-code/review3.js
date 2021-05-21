let arrayTag = '[object Array]';

let setTag = '[object Set]';

let mapTag = '[object Map]';

let objectTag = ['object Object'];

let objTag = [arrayTag, setTag, mapTag, objectTag];

let symbolTag = '[object Symbol]';

function getType(target) {
    return Object.prototype.toString.call(target)
}

function init(target) {
    const Ctor = target.constructor;
    return new Ctor()
}

function clone(target, map = new WeakMap()) {

    // 克隆原始类型

    if(typeof target !== 'object') {
        return target;
    }

    // 初始化

    const type = getType(target);

    let cloneTarget;

    // if(objTag.includes(type)) {
        cloneTarget = init(target);
    // }


    // 防止循环引用出错

    if(map.get(target)) {
        return map.get(target)
    }

    map.set(target, cloneTarget)

    // 克隆 map

    if(type === mapTag) {
        target.forEach((value, key) => {
            cloneTarget.set(key, clone(value, map))
        })
        return cloneTarget
    }

     // 克隆 set

    if(type === setTag) {
        target.forEach((value) => {
            cloneTarget.add(clone(value, map))
        })
        return cloneTarget
    }

    // 克隆 symbol

    if(type === symbolTag) {
        return Object(String.prototype.valueOf.call(target))
    }
   
    // 克隆对象和数组
    
    // cloneTarget = type === arrayTag ? [] : {};

    for(var key in target) {
        cloneTarget[key] = clone(target[key], map)
    }

    return cloneTarget
}

let map = new Map();
map.set(4, 5)

let set = new Set();
set.add({'a':1})

let symbol = Symbol(1);


let obj = {
    p: 1,
    map: map,
    set: set,
    symbol: symbol,
    object: {a: 1},
    arr: [1,2,3,4]
}

obj.obj = obj;

// console.log(clone(obj, new WeakMap()));

console.log(clone(obj, new WeakMap()));