type Len<T extends any[]> = T["length"]
type MyDrop <
T extends any[],
Num extends number,
U extends any[] = []
> = Len<U> extends Num ? T :
(T extends [infer Header , ...infer Tail] ? MyDrop<[...Tail], Num, U >: []);
type MyDropDemo = MyDrop<[1,2,3,4,5], 2>;// [3,4,5]