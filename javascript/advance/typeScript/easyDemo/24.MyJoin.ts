type MyFirst<Arr extends string[]> = Arr extends [infer Header, ...infer Tail]
  ? Header
  : "";
type MyTail<Arr extends string[]> = Arr extends [infer Header, ...infer Tail]
  ? [...Tail]
  : [];
type JoinStrArray<
  Arr extends string[],
  Separator extends string,
  Result extends string = ""
> = Arr["length"] extends 0
  ? Result
  : Arr["length"] extends 1
  ? `${Result}${MyFirst<Arr>}`
  : JoinStrArray<
      MyTail<Arr>,
      Separator,
      `${Result}${MyFirst<Arr>}${Separator}`
    >;
// 你的实现代码

// 测试用例
type Names = ["Sem", "Lolo", "Kaquko"];
type NamesComma = JoinStrArray<Names, ",">; // "Sem,Lolo,Kaquko"
type NamesSpace = JoinStrArray<Names, " ">; // "Sem Lolo Kaquko"
type NamesStars = JoinStrArray<Names, "⭐️">; // "Sem⭐️Lolo⭐️Kaquko"
