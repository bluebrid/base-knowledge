interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
type MyPickDemo1<T, K extends keyof T> = {
    K: T[K]
}
type MyPickDemo<T, K extends keyof T = keyof T> = { // 泛型里给默认值的方式如下
    K: T[K]
}
type TodoPreviewDemo = MyPickDemo<Todo, 'title'|'description'|'completed'>;

const tododemo: TodoPreview = {
  title: "Clean room",
  completed: false,
};
