// 12月28日 再次复习数据结构

// 栈开始

function transfer(x) {
    let p = 1;
    let y = 0;
    let yushu;
    while(1) {
        yushu = x % 2;
        x = x/2;
        y+=yushu*p;
        p*=10;
        if(x < 2) {
            y = y + x * p;
            break;
        }
    }
    return y;
}

console.log(transfer(8));

