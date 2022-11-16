
type MyPartial<T> = {
    [K in keyof T]?: T[K] | undefined
}
interface Todo {
    title: string;
    description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: MyPartial<Todo>) {
    return { ...todo, ...fieldsToUpdate };
}

const todo1 = {
    title: "organize desk",
    description: "clear clutter",
} as Todo;

const todo2 = updateTodo(todo1, {
    description: "throw out trash",
});