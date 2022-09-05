
type IsNever<T> = [T] extends [never] ? true : false
type IsUnion<U> = IsNever<U> extends true ? "" : U
type BEM<B extends string, E extends string[], M extends string[]> = `${B}${IsUnion<`__${E[number]}`>}${IsUnion<`--${M[number]}`>}`
//[TODOS]
/**TODOS */
type ClassNames1 = BEM<'btn', ['price'], []>; // 'btn__price'
type ClassNames2 = BEM<'btn', ['price'], ['warning', 'success']> // 'btn__price--warning' | 'btn__price--success'
type ClassNames3 = BEM<'btn', [], ['small', 'medium', 'large']> // 'btn--small' | 'btn--medium' | 'btn--large'