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
// T 和 U的交集
type MyExtract<T, U> = T extends U ? T : never
type ExtractType = MyExtract<keyof FirstType, keyof SecondType>;