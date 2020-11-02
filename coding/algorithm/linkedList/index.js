const a = { val: 'a' };

const b = { val: 'b' };

const c = { val: 'c' };

const d = { val: 'd' };

a.next = b;
b.next= c;
c.next = d;

// 遍历链表
let p = a;
while(p) {
    console.log(p.val);
    p = p.next;
}

// 插入
const e = { val: 'e' };
c.next = e;
e.next = d;

// 删除
c.next = d;  // c的next指针重新指向d，就删除了e


// 学习 Set

let mySet = new Set();

mySet.add(1);
mySet.add(5);

mySet.add('some text');

let o = { a: 1, b: 2};

mySet.add(o);
mySet.add({ a: 1, b: 2 });   // 两个对象看起来一样，但是在内存中存储的地址是不一样的


const has = mySet.has(5) //  true;

mySet.delete(5);

mySet.size; // 4;

// 迭代

for(let item of mySet) console.log(item);

for(let item of mySet.keys()) console.log(item);

for(let item of mySet.values()) console.log(item);

for(let [key, value] of mySet.entries()) console.log(key, value);

const myArr = Array.from(mySet);

const mySet2 = new Set([1,2,3,4]);

const intersection = new Set([...mySet].filter(x => mySet2.has(x)));
const difference = new Set([...mySet].filter(x => !mySet2.has(x)));


