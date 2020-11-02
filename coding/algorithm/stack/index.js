// const stack = [];
// stack.push(1);
// stack.push(2);

// const item1 = stack.pop();
// const item2 = stack.pop();

const func1 = () => {
    func2();
}

const func2 = () => {
    func3();
}

const func3 = () => {};

func1();