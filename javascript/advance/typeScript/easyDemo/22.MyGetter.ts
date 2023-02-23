// https://juejin.cn/post/7089943758543781896
interface Person {
    name: string;
    age: number;
}

type MyGutter<T> = {
    [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P]
}
type PersonGutter = MyGutter<Person>
