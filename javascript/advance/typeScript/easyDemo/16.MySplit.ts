type MySplit<T extends string, U extends string> = 
T extends `${infer Header}${U}${infer Tail}` 
? ([Header, ...MySplit<Tail, U>])
: [T]

type SpliteDemo = MySplit<'a.b.c.d.', 'b.'>