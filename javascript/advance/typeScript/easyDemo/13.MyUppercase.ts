interface Uppers {
  a: "A";
  b: "B";
  c: "C";
  d: "D";
  e: "E";
  f: "F";
  g: "G";
  h: "H";
  i: "I";
  j: "J";
  k: "K";
  l: "L";
  m: "M";
  n: "N";
  o: "O";
  p: "P";
  q: "Q";
  r: "R";
  s: "S";
  t: "T";
  u: "U";
  v: "V";
  w: "W";
  x: "X";
  y: "Y";
  z: "Z";
}

type _Upper<
  T extends string,
  A extends string = ""
> = T extends `${infer F}${infer R}`
  ? _Upper<R, `${A}${F extends keyof Uppers ? Uppers[F] : F}`>
  : A;
type ABCD = _Upper<"abc">;
// type ABC = "ABC"

type Sentence = _Upper<"The quick brown fox jumps over the lazy dog.">;
// type Sentence = "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG."

type Плохо = _Upper<"я не знаю">;
// type Плохо = "я не знаю" // oops
