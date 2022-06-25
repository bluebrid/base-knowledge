type MyReadonly <T> = {
    readonly [K in keyof T]: T[K]
}
interface Todo1 {
    title: string;
}

const todo: MyReadonly<Todo1> = {
    title: "Delete inactive users",
};

todo.title = "Hello";