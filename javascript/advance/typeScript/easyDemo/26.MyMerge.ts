type Foo = {
    a: number;
    b: string;
  };
  
  type Bar = {
    b: number;
  };
  
  type Merge<FirstType, SecondType> = {
    [K in keyof (FirstType & SecondType)]: K extends keyof SecondType
      ? SecondType[K]
      : K extends keyof FirstType
      ? FirstType[K]
      : never;
  };
  
  const ab: Merge<Foo, Bar> = { a: 1, b: 2 };

  type Merge1 <FirstType, SecondType> = Omit<FirstType, keyof SecondType> & SecondType;

const ab1: Merge<Foo, Bar> = { a: 1, b: 2 };