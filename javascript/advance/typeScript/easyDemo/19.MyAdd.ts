type GetTuple<A extends number, R extends any[] = []> = R["length"] extends A
  ? R
  : GetTuple<A, [...R, 1]>;
type MyAdd<A extends number, B extends number> = [
  ...GetTuple<A>,
  ...GetTuple<B>
]["length"];

const addDemo: MyAdd<4,5> = 9;