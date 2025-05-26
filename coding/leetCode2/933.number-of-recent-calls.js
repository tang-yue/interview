/*
 * @lc app=leetcode id=933 lang=javascript
 *
 * [933] Number of Recent Calls
 * 
 * 题目解释：
 * 1. RecentCounter 类用于统计最近 3000 毫秒内的请求数
 * 2. ping(t) 方法在时间 t 添加一个新请求，返回最近 3000 ms 内的请求总数
 * 3. t 是严格递增的，即每次调用 ping 的时间都比之前大
 * 
 * 示例：
 * 输入：
 * ["RecentCounter", "ping", "ping", "ping", "ping"]
 * [[], [1], [100], [3001], [3002]]
 * 输出：
 * [null, 1, 2, 3, 3]
 */

// @lc code=start

/**
 * 初始化计数器
 * 使用队列（数组）来存储请求时间
 */
var RecentCounter = function() {
    // 用数组模拟队列，存储请求时间
    this.requests = [];
};

/** 
 * @param {number} t - 当前请求的时间戳
 * @return {number} - 返回最近 3000ms 内的请求数量
 * 
 * 解题思路：
 * 1. 将新请求时间 t 加入队列
 * 2. 移除所有超过 3000ms 窗口的请求（t - 3000 之前的请求）
 * 3. 返回当前队列长度，即为符合条件的请求数
 */
RecentCounter.prototype.ping = function(t) {
    // 添加当前请求到队列
    this.requests.push(t);
    
    // 移除超过 3000ms 时间窗口的请求
    // 因为 t 是严格递增的，所以可以从队首开始移除
    while (this.requests[0] < t - 3000) {
        this.requests.shift();
    }
    
    // 返回当前队列长度，即为 3000ms 内的请求数
    return this.requests.length;
};

/** 
 * Your RecentCounter object will be instantiated and called as such:
 * var obj = new RecentCounter()
 * var param_1 = obj.ping(t)
 */
// @lc code=end

// 测试用例
const recentCounter = new RecentCounter();
console.log(recentCounter.ping(1));     // 返回 1，只有 1 个请求在时间窗口内
console.log(recentCounter.ping(100));   // 返回 2，有 2 个请求在时间窗口内 [1, 100]
console.log(recentCounter.ping(3001));  // 返回 3，有 3 个请求在时间窗口内 [1, 100, 3001]
console.log(recentCounter.ping(3002));  // 返回 3，有 3 个请求在时间窗口内 [100, 3001, 3002]，1 已经被移除

