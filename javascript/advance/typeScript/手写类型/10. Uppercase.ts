
type MyUppercase<S extends string> = intrinsic
const aaa = "aaa";
type uType = Uppercase< typeof aaa>
const aU: uType = "1AAA";
