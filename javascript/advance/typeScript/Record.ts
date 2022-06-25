interface CatInfo {
    age: number;
    breed: string;
}

type CatName = "miffy" | "boris" | "mordred";
// Record: Construct a type with a set of properties K of type T , Record<K, T> , T表示对应的属性， K是属性对应的子集类型
type MyRecord < K extends string | number | symbol, T> = {
    [P in K ]: T
}
const cats: MyRecord<CatName, CatInfo> = {
    miffy: { age: 10, breed: "Persian" },
    boris: { age: 5, breed: "Maine Coon" },
    mordred: { age: 16, breed: "British Shorthair" },
};

cats.boris;