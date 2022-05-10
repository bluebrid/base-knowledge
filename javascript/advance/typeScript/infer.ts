// https://zhuanlan.zhihu.com/p/427309936
type A = 'hello'; // 声明全局变量
type B = [A] extends infer T ? (
    T // => 在这个表达式的作用域内，T 都为 [A]
) : never  // 声明局部变量


// 我们都知道 extends 后面可以接一个 infer 用来提取变量，一般我们会把跟 JavaScript 的解构拿来做类比，事实上这个能力叫做模式匹配
// Head 是提取出的一个新的变量名称，Tail 也是
type Test0 = [0, 1, 2] extends [infer Head, ...infer Tail]
    ? { head: Head, tail: Tail }
    : never;

type Test1 = `abcdefg` extends `${infer Head}${infer Tail}`
    ? { head: Head, tail: Tail }
    : never;

type OnlyNumber<N extends number> = N;
type Tmp<A extends number> = { a: A };
type Test2 = { a: 10 } extends Tmp<infer A> // infer A 只能是 number 类型
    ? OnlyNumber<A> // 不报错
    : never;