type MyRequired<T> = {
    [K in keyof T]-?: T[K]
}
interface Props {
    a?: number;
    b?: string;
}

const obj: Props = { a: 5 };

const obj2: MyRequired<Props> = { a: 5 };