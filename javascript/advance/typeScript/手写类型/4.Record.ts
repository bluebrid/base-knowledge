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