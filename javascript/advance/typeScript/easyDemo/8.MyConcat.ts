type MyConcat<P extends any[], Q extends any[]> = [...P, ...Q];
type MyConcat2< P, Q> = [
    ...P extends any[] ? P : [P],
    ...Q extends any[] ? Q : [Q]
]
type Result = MyConcat<[1], [2]>; // expected to be [1, 2]
type Result2 = MyConcat2< 'a', ['b', 'c']>
