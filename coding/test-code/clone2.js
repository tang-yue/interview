// 太过明显是靠记忆，而不是理解
// 错误一：类型是要先小写，然后再大写
// 错误二：初始化完了，是要赋值的，
// 错误三：注意 map，和 set 的赋值
// 错误四：每种类型都是要返回的
// 错误五：注意细节


let arrayType = '[object, array]';

let objectType = '[object, object]';

let symbolType = '[object, symbol]';

let mapType = '[object, map]';

let setType = '[object, set]';

function getType(obj) {
    return Object.prototype.toString.call(obj).toLowerCase();
}

function init(obj) {
    const Cotor = obj.constructor;
    return new Cotor;
}

function deepCopy(obj, map = new WeakMap()) {
    let target;
    if(typeof obj !== 'object') {
        return obj;
    }

    let type = getType(obj);
    
    target = init(obj);

    // 防止循环递归
    
    if(map.get(obj)) {
        return map.get(obj);
    }
    map.set(obj, target);

    if(type === mapType) {
        obj.forEeach((key, value) => {
            target[key] = deepCopy(value, map)
        })
        return target;
    }

    if(type === setType) {
        obj.forEeach((key) => {
            target[key] = deepCopy(obj[key], map)
        })
        return target;
    }

    // 数组 对象
    for(var key in obj) {
        target[key] = deepCopy(obj[key], map);
    }

    return target;
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

console.log(deepCopy(obj, new WeakMap()));


