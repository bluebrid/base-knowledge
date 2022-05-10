type If<C extends Boolean, T extends String, F extends String> = C extends true ? T : F 
type A = If<true, 'a', 'b'>  // expected to be 'a'
type B = If<false, 'a', 'b'> // expected to be 'b'