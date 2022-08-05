// 泛型类型是复用给定类型的一部分的一种方式。它有助于捕获作为参数传递的类型 T。
// 优点: 创建可重用的函数，一个函数可以支持多种类型的数据。这样开发者就可以根据自己的数据类型来使用函数

function showType2<T>(args: T): T {
    console.log(args);
    return args
}

showType2('test');
// Output: "test"

showType2(1);
// Output: 1


interface PickType {
    id: number;
    firstName: string;
    lastName: string;
}

function showType3(args: Pick<PickType, 'firstName' | 'lastName'>) {
    console.log(args);
}

showType3({ firstName: 'John', lastName: 'Doe' });