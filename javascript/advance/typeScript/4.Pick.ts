<<<<<<< HEAD
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
type TupleToObject<T extends readonly string[]> = {
  [K in T[number]]: K
}

type result = TupleToObject<typeof tuple> 
=======
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
type TupleToObject<T extends readonly string[]> = {
  [K in T[number]]: K
}

type result = TupleToObject<typeof tuple> 
>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
