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

作者：捌玖ki
链接：https://juejin.cn/post/7087421324963872782/
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。