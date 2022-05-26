const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
type TupleToObject<T extends readonly (keyof any)[]> = {
    [key in T[number]]: key;
  };
type result = TupleToObject<typeof tuple> 