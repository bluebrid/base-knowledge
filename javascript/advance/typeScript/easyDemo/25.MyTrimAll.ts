
type MyTrimLeft<V extends string> = V extends `${' '}${infer S}` ? MyTrimLeft<S> : V;
type MyTrimRight<V extends string> = V extends `${infer S}${' '}` ? MyTrimRight<S> : V;
type MyTrimAll<V extends string> = MyTrimLeft<MyTrimRight<V>>; // 你的实现代码

// 测试用例
type noSpece = MyTrimAll<' semlinker ssdd    '>
//=> 'semlinker'
