interface FirstType {
    id: number;
    firstName: string;
    lastName: string;
}

interface SecondType {
    id: number;
    address: string;
    city: string;
}
// T 中间排除U存在的
type MyExclude1<T, U> = T extends U ? never : T
type ExcludeType = MyExclude1<keyof FirstType, keyof SecondType>;