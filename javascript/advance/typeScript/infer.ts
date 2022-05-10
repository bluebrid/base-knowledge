// https://zhuanlan.zhihu.com/p/427309936
type A = 'hello'; // 声明全局变量
type B = [A] extends infer T ? (
    T // => 在这个表达式的作用域内，T 都为 [A]
) : never  // 声明局部变量