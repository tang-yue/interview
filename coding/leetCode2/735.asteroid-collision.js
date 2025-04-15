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
    for (const item of asteroids) {
        
        if (stack[stack.length-1] && (stack[stack.length-1] > 0 && item < 0)) {
            // 开始碰撞
            while (stack[stack.length -1] > 0 && Math.abs(stack[stack.length -1]) < Math.abs(item)) {
                if (stack.length > 0)  {
                    stack.pop();
                } else {
                    stack = [item]
                }
            }
           
            
            if (stack[stack.length-1] && stack[stack.length-1] > 0 && Math.abs(stack[stack.length-1]) === Math.abs(item)) {
                stack.pop();
            } else {
                stack.push(item);
            }
        } else {
            stack.push(item);
        }
    }
    return stack
};
// @lc code=end

// 还是用栈的思维

