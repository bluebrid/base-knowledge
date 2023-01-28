type MyEqual<X,Y> = (<T>() => T extends X ? 1: 2) extends
(<T>() => T extends Y ? 1: 2) ? true: false;
type MyIncludes<T extends any[], Q> = T extends [infer header , ...infer tail] 
? (header extends Q ? true : MyIncludes<tail, Q>)
: false
type MyIncludes1<T extends any[], Q> = T extends [infer header , ...infer tail] 
? (MyEqual<header, Q> extends true ? true : MyIncludes<tail, Q>)
: false

type isPillarMen = MyIncludes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`
type isPillarMen1 = MyIncludes<[boolean], true> // expected to be `false`
type isPillarMen2 = MyIncludes1<[boolean], false> // expected to be `false`