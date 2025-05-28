/*
 * @lc app=leetcode id=649 lang=javascript
 *
 * [649] Dota2 Senate
 * 
 * 题目描述：
 * 在 Dota2 的世界里，有两个政党：Radiant(天辉)和 Dire(夜魇)
 * 现在参议院由字符串 senate 表示，每个字符代表一个参议员：
 * - 'R' 表示 Radiant 阵营的参议员
 * - 'D' 表示 Dire 阵营的参议员
 * 
 * 投票规则：
 * 1. 参议院按照字符串顺序进行投票
 * 2. 每个参议员可以行使两项权利：
 *    - 禁止下一位对方阵营的参议员的权利
 *    - 宣布胜利（如果是该阵营最后一位参议员）
 * 
 * 举例说明：
 * 输入："RD"
 * 过程：
 * 1. R 在前，先行使权利，禁止了 D 的权利
 * 2. D 已被禁止，无法行使权利
 * 3. R 阵营获胜
 * 输出："Radiant"
 * 
 * 输入："RDD"
 * 过程：
 * 1. 第一个 R 禁止第一个 D
 * 2. 第二个 D 禁止 R
 * 3. 现在只剩一个 D，所以 Dire 获胜
 * 输出："Dire"
 * 
 * 关键点：
 * 1. 参议员按顺序行使权利
 * 2. 被禁止的参议员失去所有权利
 * 3. 最后剩下的阵营获胜
 * 
 * 解题思路：
 * 1. 使用两个队列分别存储 R 和 D 的索引位置
 *    - R队列存储所有 Radiant 参议员的索引
 *    - D队列存储所有 Dire 参议员的索引
 * 
 * 2. 模拟投票过程：
 *    - 比较两个队列队首元素（索引）的大小
 *    - 索引小的参议员有权禁止索引大的参议员
 *    - 被禁止的参议员索引直接出队
 *    - 行使权利的参议员索引 + n（n为字符串长度）后重新入队
 * 
 * 3. 直到某个队列为空，另一个队列的阵营获胜
 * 
 * 举例："RDDR" (索引: 0123)
 * 初始状态：
 * R队列：[0,3]  (R在位置0和3)
 * D队列：[1,2]  (D在位置1和2)
 * 
 * 模拟过程：
 * 第一轮：
 * 1. 0 < 1，R[0]禁止D[1]，R[0]变为R[4]重新入队
 * R队列：[3,4]
 * D队列：[2]
 * 
 * 第二轮：
 * 2. 3 > 2，D[2]禁止R[3]，D[2]变为D[6]重新入队
 * R队列：[4]
 * D队列：[6]
 * 
 * 第三轮：
 * 3. 4 < 6，R[4]禁止D[6]
 * R队列：[8]
 * D队列：[]
 * 
 * 结果：R获胜（因为D队列为空）
 */

// @lc code=start
/**
 * @param {string} senate
 * @return {string}
 */
var predictPartyVictory = function(senate) {
    // 获取R和D的索引
    const rIndices = [];  // 存储R的索引
    const dIndices = [];  // 存储D的索引
    
    // 遍历字符串，收集索引
    for(let i = 0; i < senate.length; i++) {
        if(senate[i] === 'R') {
            rIndices.push(i);
        } else {
            dIndices.push(i);
        }
    }
    while (rIndices.length > 0 && dIndices.length > 0) {
      if (rIndices[0] > dIndices[0]) {
        rIndices.shift();
        dIndices.push(dIndices[0] + senate.length)
        dIndices.shift();
      } else if (rIndices[0] < dIndices[0]) {
        dIndices.shift();
        rIndices.push(rIndices[0] + senate.length)
        rIndices.shift();
      }
    }

    if (rIndices.length) return 'Radiant'
    return 'Dire'
};
// @lc code=end

// 5月28日，根据解题思路写出了代码

