function Foo() {
    getName = function () { console.log(1); };
    return this;
}
Foo.getName = function () { console.log(2); };
Foo.prototype.getName = function () { console.log(3); };
var getName = function () { console.log(4); };
function getName() { console.log(5); }

// 等价于：
/*
var getName = undefined;
function getName() { console.log(5) }
function Foo() {
    getName = function () { console.log(1); };
    return this;
}
Foo.getName = function () { console.log(2); };
Foo.prototype.getName = function () { console.log(3); };
getName = function () { console.log(4); };
*/
//请写出以下输出结果：
Foo.getName(); // 2
getName();// 4
Foo().getName();//1 Foo() 返回的this 指向的是window, window.getName() => 1
getName();//1
new Foo.getName();// 2
new Foo().getName();// 3
new new Foo().getName();// 3