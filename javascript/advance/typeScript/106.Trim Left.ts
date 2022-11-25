type TrimLeft1<T extends string> = T extends `${' ' | '\n' | '\t'}${infer R}` ? TrimLeft<R> : T // 需要递归调用
type TrimLeft<S extends string> = S extends `${' ' | '\n' | '\t'}${infer R}` ? TrimLeft<R> : S;
type trimed = TrimLeft<`  Hello World  `> // 应推导出 'Hello World  '
type trimed1 = TrimLeft1<'  Hello World  '> // 应推导出 'Hello World  '