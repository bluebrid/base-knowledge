
type MyIsZero<T extends number | string> = T extends 0 ? true : T extends '0' ? true : false;
type zero = MyIsZero<'0'>
type zero1 = MyIsZero<0>
type zero2 = MyIsZero<-0>

// type MyIsGetZero< T extends number | string> = 