// 联合类型使你可以赋予同一个变量不同的类型
type UnionType = string | number;

function showType1(arg: UnionType) {
    console.log(arg);
}

showType1('test');
// Output: test

showType1(7);
// Output: 7
showType1({a:1})