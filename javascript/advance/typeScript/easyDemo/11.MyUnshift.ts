
type MyUnshift<T, U> = T extends [...infer rest] ? [U, ...rest]: [U, T]
type ResultDemoShift = MyUnshift<[1, 2], 0> // [0, 1, 2,]