//https://www.typescriptlang.org/docs/handbook/utility-types.html#excludeuniontype-excludedmembers
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
type ExcludeObjType = MyExclude1<FirstType, SecondType>
const objA: ExcludeObjType = {
    id: 1,
    firstName:"ivan",
    lastName:"fan"
}
const obja: ExcludeType= 'firstName'
type T1 = MyExclude1<"a"| "c"| "d" , "a" | "b">;
