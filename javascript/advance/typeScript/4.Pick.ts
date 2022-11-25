type MyPick1<T, P extends keyof T> = {
  [K in P]: T[K]
}
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview11 = MyPick1<Todo, "title" | "completed">;

const t1: TodoPreview11 = {
  title: "Clean room",
  completed: false,
};

t1;