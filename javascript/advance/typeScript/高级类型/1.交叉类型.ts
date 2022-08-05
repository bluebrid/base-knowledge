// 交叉类型是一种将多种类型组合为一种类型的方法。
// 这意味着你可以将给定的类型 A 与类型 B 或更多类型合并，并获得具有所有属性的单个类型。
// 将多个类型合并成一个类型， 并且类型属性是一个并集
type LeftType = {
    id: number;
    left: string;
};

type RightType = {
    id: number;
    right: string;
};

type IntersectionType = LeftType & RightType;

function showType(args: IntersectionType) {
    console.log(args);
}

showType({ id: 1, left: 'test', right: 'test' });