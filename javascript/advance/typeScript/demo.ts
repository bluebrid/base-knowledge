type Foo = {
    a?: string;
    b?: number;
    c: boolean;
}
const a: Required<Foo> = {a: 'qwe'} // Error

const b: Required<Foo> = {a: '23', b: 1, c: false}; // Ok

type Required<T> = {
    [K in keyof T]-?: T[K];
}
