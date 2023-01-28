type MyGetChars<T extends string | number | bigint | boolean> = T extends string ? 
(T extends `${infer First}${infer Tail}` ? First | MyGetChars<Tail> : T)
: (MyGetChars<`${T}`>)
type ResultDmo = MyGetChars<'abc'> // 'a' | 'b' | 'c'