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
                        },
                        {
                            val: 'i',
                            children: []
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

const bfs = (root) => {
    const q = [root];
    while (q.length > 0) {
<<<<<<< HEAD
        console.log(q, 'qqqq')
=======
        // console.log(q, 'qqqq')
>>>>>>> f8222af9800e3b61c15314bbc12c5cd854082af4
        const n = q.shift();
        console.log(n.val);  
        n.children.forEach((child) => {
            q.push(child);
        })
    }
}

bfs(tree);