type Func<T> =
    T extends string ? (
        T extends 'foo' ? 'is string foo'
        : T extends 'bar' ? 'is string bar'
        : 'unexpected string value'
    )
    : T extends number ? (
        T extends 0 ? 'is number 0'
        : T extends 1 ? 'is number 1'
        : 'unexpected number value'
    )
    : 'unexpected value type';
type foo = Func<'foo'>
type a = Func<1>

// http://www.qb5200.com/article/406129.html
// https://www.typescriptlang.org/docs/handbook/2/conditional-types.html