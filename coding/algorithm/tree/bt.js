const bt = {
    val: 'a',
    left: {
        val: 'b',
        left: {
            val: 'd',
            left: null,
            right: null,
        },
        right: {
            val: 'e',
            left: null,
            right: null,
        },
    },
    right: {
        val: 'c',
        left: {
            val: 'f',
            left: {
                val: 'k',
                left: null,
                right: null
            },
            right: {
                val: 'i',
                left: null,
                right: null
            },
        },
        right: {
            val: 'g',
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



