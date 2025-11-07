/*
 * @lc app=leetcode id=841 lang=javascript
 *
 * [841] Keys and Rooms
 */

// @lc code=start
/**
 * @param {number[][]} rooms
 * @return {boolean}
 */
var canVisitAllRooms = function(rooms) {
    const visited = new Set();
    function dfs(room) {
      if (visited.has(room)) return;
      visited.add(room);
      for (const key of rooms[room]) {
        dfs(key)
      }
    }
    dfs(0);
    return visited.size === rooms.length;
};
// @lc code=end

