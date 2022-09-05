
// 答案： TS 是没有计算能力的，也不支持大小判断
type GreaterThan<T extends number, U extends number, R extends any[] = []> = 
  T extends R['length']
    ? false
    : U extends R['length']
      ? true
      : GreaterThan<T, U, [...R, 1]>
type newArr<T extends number, A extends any[] = []> = 
      A['length'] extends T
        ? A
        : newArr<T, [...A, '']>
type GreaterThan1<T extends number, U extends number> = GreaterArr<newArr<T>, newArr<U>>
type a4 = GreaterThan<2, 1> ;//should be true
type a1 = GreaterThan<1, 1> ;//should be false
type a2 = GreaterThan<10, 100> ;//should be false
type a3 = GreaterThan<111, 11> ;//should be true