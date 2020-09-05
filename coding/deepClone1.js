const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';

// symbol
const symbolTag = '[object Symbol]'

const deepTag = [mapTag, setTag, arrayTag, objectTag]

function isObject(target) {
    const type = typeof target
    return type !== null &&(type === 'object' || type === 'function')
}

function getType(target) {
    return Object.prototype.toString.call(target)
}

function getInit(target) {
    const Ctor = target.constructor;
    return new Ctor()
}

function clone(target, map = new WeakMap()) {

    // 克隆原始类型
    if(!isObject(target)) {
        return target;
    }

    // 初始化
    const type = getType(target);
    let cloneTarget;

    if(deepTag.includes(type)) {
        cloneTarget = getInit(target, type)
    }

    // 防止循环引用
    if(map.get(target)) {
        return map.get(target);
    }

    map.set(target, cloneTarget);

    // 克隆Set
    
    if(type === setTag) {
        target.forEach(value => {
            cloneTarget.add(clone(value, map))
        });
        return cloneTarget;
    }

    // 克隆map
    if(type === mapTag) {
        target.forEach((value, key) => {
            cloneTarget.set(key, clone(value, map))
        })
        return cloneTarget;
    }

    // 克隆 Symbol
    if(type === symbolTag) {
        return Object(Symbol.prototype.valueOf.call(target));
    }

    // 克隆对象和数组

    for(const key in target) {
        cloneTarget[key] = clone(target[key], map)
    }

    return cloneTarget;
}

// 下面是测试

const map = new Map();
map.set('1', '1111')
map.set('2', '2222')
const set = new Set([1,2,{'3':'4'}])

const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8],
    empty: null,
    map,
    set,
    symbol: Symbol(42)
};
console.log(clone(target))


