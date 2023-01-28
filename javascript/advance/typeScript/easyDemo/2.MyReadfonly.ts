interface TodoDemo {
  title: string;
  description: string;
}
type MyReadonlyDemo<T> =  {
    readonly [P in keyof T] : T[P]
}
const todoDemo: MyReadonlyDemo<TodoDemo> = {
  title: "Hey",
  description: "foobar",
};

todo.title = "Hello"; // Error: cannot reassign a readonly property
todo.description = "barFoo"; // Error: cannot reassign a readonly property
