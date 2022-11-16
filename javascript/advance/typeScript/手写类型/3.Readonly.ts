type MyReadonly1 <T> = {
    readonly [K in keyof T]: T[K]
}
interface Todo111 {
    title: string;
}

const todo22: MyReadonly1<Todo111> = {
    title: "Delete inactive users",
};

todo22.title = "Hello";