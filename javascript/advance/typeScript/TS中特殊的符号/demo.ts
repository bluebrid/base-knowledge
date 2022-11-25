// 当左侧操作数为 null 或 undefined 时，其返回右侧的操作数，否则返回左侧的操作数。
const foo = null ?? 'default string';
console.log(foo); // 输出："default string"

const baz = 0 ?? 42;
console.log(baz); // 输出：0

// 当空值合并运算符的左表达式不为 null 或 undefined 时，不会对右表达式进行求值。
function A() { console.log('A was called'); return undefined;}
function B() { console.log('B was called'); return false;}
function C() { console.log('C was called'); return "foo";}

console.log(A() ?? C());
console.log(B() ?? C());

const d = 1_11_22
console.log(d)