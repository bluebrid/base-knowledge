// 此工具可帮助你构造具有给定类型T的一组属性K的类型。
// 将一个类型的属性映射到另一个类型的属性时，Record非常方便
type MyRecord1<T extends string | number | symbol, P> = {
    [K in T]: P
}
interface CatInfo {
    age: number;
    breed: string;
}

type CatName1 = "miffy" | "boris" | "mordred";

const cats1: MyRecord1<CatName1, CatInfo> = {
    miffy: { age: 10, breed: "Persian" },
    boris: { age: 5, breed: "Maine Coon" },
    mordred: { age: 16, breed: "British Shorthair" },
};

cats1.boris;

interface EmployeeType {
    id: number;
    fullname: string;
    role: string;
}

let employees: Record<number, EmployeeType> = {
    0: { id: 1, fullname: 'John Doe', role: 'Designer' },
    1: { id: 2, fullname: 'Ibrahima Fall', role: 'Developer' },
    2: { id: 3, fullname: 'Sara Duckson', role: 'Developer' },
};