type Flatten<T> = T extends any[] ? T[number] : T;
 
// Extracts out the element type.
type Str1 = Flatten<number[]>;
     
 
// Leaves the type alone.
type Num = Flatten<number>;
     
type GetReturnType<Type> = Type extends (...args: never[]) => infer CCC
  ? CCC
  : never;
 
type Num2 = GetReturnType<() => number>;
     
 
type Str2 = GetReturnType<(x: string) => string>;
     
 
type Bools = GetReturnType<(a: boolean, b: boolean) => boolean[]>;
      