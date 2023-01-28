type MyPush<T, U> = T extends [...infer res]
  ? [...res, U]
  : [T, U];

type ResultDemo = MyPush<[1, 2], "3">; // [1, 2, '3']
type ResultDemo1 = MyPush<2, "3">; // [1, 2, '3']
