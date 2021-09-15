const tree = {
    val: 'a',
    children: [
        {
            val: 'b',
            children: [
                {
                    val: 'd',
                    children: []
                },
                {
                    val: 'e',
                    children: []
                }
            ]
        },
        {
            val: 'c',
            children: [
                {
                    val: 'f',
                    children: [
                        {
                            val: 'k',
                            children: []
<<<<<<< HEAD
=======
                        },
                        {
                            val: 'i',
                            children: []
>>>>>>> f8222af9800e3b61c15314bbc12c5cd854082af4
                        }
                    ]
                },
                {
                    val: 'g',
                    children: []
                }
            ]
        }
    ]
}

function dfs(root) {
    console.log(root.val)
    root.children.forEach((child) => dfs(child))
}

let res = dfs(tree);

// a b d e c f k i g