type MySubtra<A extends number, B extends number> = [
  ...GetTuple<A>
]["length"] extends [...GetTuple<B>]["length"]
  ? 0
  : GetTuple<A> extends [...red];
const mySubtraDemo: MySubtra<4, 4> = 0;
