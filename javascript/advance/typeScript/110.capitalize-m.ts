
type MyCapitalize<S extends string> = S extends `${infer U}${infer K}` ? `${Capitalize<U>}${K}` : S

type capitalized = MyCapitalize<'hello world'> // expected to be 'Hello world'