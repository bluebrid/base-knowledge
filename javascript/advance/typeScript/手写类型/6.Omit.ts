type MyOmit <T , P extends keyof T> = {
    [K in Exclude<keyof T, P>]: T[K]
}
interface Todo12 {
    title: string;
    description: string;
    completed: boolean;
    createdAt: number;
  }
   
  type TodoPreview1 = MyOmit<Todo12, "description">;
   
  const todo11: TodoPreview1 = {
    title: "Clean room",
    completed: false,
    createdAt: 1615544252770,
    description: 'ddd'
  };
   
  todo;