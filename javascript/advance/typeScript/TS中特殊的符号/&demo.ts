// 在 TypeScript 中交叉类型是将多个类型合并为一个类型。通过 & 运算符可以将现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。
type PartialPointX = { x: number; };
type Point = PartialPointX & { y: number; };

let point: Point = {
    x: 1,
    y: 1
}

// 5.1 同名基础类型属性的合并

// 成员 c 的类型会变成 never
interface X {
    c: string;
    d: string;
}

interface Y {
    c: number;
    e: string
}

type XY = X & Y;
type YX = Y & X;

let p: XY = { c: 6 as never, d: "d", e: "e" };;
let q: YX = { c: 6 as never, d: "d", e: "e" };;

// 5.2 同名非基础类型属性的合并
interface D { d: boolean; }
interface E { e: string; }
interface F { f: number; }

interface A { x: D; }
interface B { x: E; }
interface C { x: F; }

type ABC = A & B & C;

let abc: ABC = {
  x: {
    d: true,
    e: 'semlinker',
    f: 666
  }
};

console.log('abc:', abc);