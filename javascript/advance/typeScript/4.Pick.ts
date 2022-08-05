const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
type TupleToObject<T extends readonly string[]> = {
  [K in T[number]]: K
}

type result = TupleToObject<typeof tuple> 
