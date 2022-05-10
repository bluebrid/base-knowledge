type Func1<A extends number, B extends string = 'hello'> = [A, B]
//     ↑ ↑           ↑    ↑           ↑        ↑        ↑
// 函数名 参数名    参数类型  参数名       参数类型  默认值      函数体

type Test = Func1<10, 'world'> // => [10, 'world']

function Func1(A: number, B: string = 'hello') { return [A, B] }
const Test = Func1(10, 'world') // => [10, 'world']