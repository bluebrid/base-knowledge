type Len<T extends any[]> = T["length"]
type Tail<T extends any[]> = T extends [infer F, ...infer L] ? L : [];
type MyDrop <
T extends any[],
Num extends number,
U extends any[] = []
> = T extends [] ? [] : 
Len<U> extends Num ? T : 
// MyDrop<Tail<T>, Num, [...U, any]>
(T extends [infer Header , ...infer Tail] ? MyDrop<Tail, Num, [...U, any] >: []);
type MyDropDemo = MyDrop<[1,2,3,4,5], 2>;// [3,4,5]
type MyDropDemo1 = MyDrop<[], 2>;// [3,4,5]
type MyDropDemo2 = MyDrop<[1,2], 2>;// [3,4,5]
type MyDropDemo3 = MyDrop<[1], 2>;// [3,4,5]