type MyPick<T, P extends keyof T> = {
    [K in P]: T[K]
}
interface Todo {
    title: string;
    description: string;
    completed: boolean;
}

type TodoPreview = MyPick<Todo, "title" | "completed">;

const t: TodoPreview = {
    title: "Clean room",
    completed: false,
};

t;