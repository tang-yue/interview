/*
 * @lc app=leetcode id=735 lang=javascript
 *
 * [735] Asteroid Collision
 */

// @lc code=start
/**
 * @param {number[]} asteroids
 * @return {number[]}
 */
var asteroidCollision = function(asteroids) {
    const stack = [];
    
    for (const asteroid of asteroids) {
        // 当栈顶行星向右移动(>0)且当前行星向左移动(<0)时才会发生碰撞
        // 正数：向右移动
        // 负数：向左移动
        let willSurvive = true;
        
        while (willSurvive && stack.length > 0 && stack[stack.length - 1] > 0 && asteroid < 0) {
            // 碰撞情况：
            const topAsteroid = stack[stack.length - 1];
            const topSize = Math.abs(topAsteroid);
            const currentSize = Math.abs(asteroid);
            
            // 栈顶行星质量小，被摧毁
            if (topSize < currentSize) {
                stack.pop();
            } 
            // 两颗行星质量相等，都被摧毁
            else if (topSize === currentSize) {
                stack.pop();
                willSurvive = false;
            } 
            // 当前行星质量小，被摧毁
            else {
                willSurvive = false;
            }
        }
        
        // 如果当前行星存活下来，则加入栈中
        if (willSurvive) {
            stack.push(asteroid);
        }
    }
    
    return stack;
};
// @lc code=end

// 我还没有看懂，需要复习下
// 5月16日 记录
// 上述的思路很清晰，其实我之前做的思路和这个类似，但是我push的元素判断逻辑，有些没有理清，
// 导致最后的结果错误

