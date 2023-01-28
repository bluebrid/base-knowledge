type MyIf<T extends boolean, P , U> = T extends true ? P: U;
type ADemo = MyIf<true, 'a', 'b'>  // expected to be 'a'
type BDemo = MyIf<false, 'a', 'b'> // expected to be 'b'