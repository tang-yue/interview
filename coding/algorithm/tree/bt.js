const bt = {
    val: 1,
    left: {
        val: 2,
        left: {
            val: 4,
            left: null,
            right: null,
        },
        right: {
            val: 5,
            left: null,
            right: null,
        },
    },
    right: {
        val: 3,
        left: {
            val: 6,
            left: null,
            right: null,
        },
        right: {
            val: 7,
            left: null,
            right: null
        }
    }
}

module.exports = bt;

    //         1
    //     2     3
    //  4    5  6   7

   // 中序遍历结果 4 2 5 1 6 3 7
   // 前序遍历结果 1 2 4 5 3 6 7
   // 后序遍历结果 4 5 2 6 7 3 1



